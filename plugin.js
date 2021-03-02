var db;
var req = indexedDB.open("moodlesidebarplugin_db", 2);

req.onerror = function(evt) {
	console.log("An error occured");
};

req.onsuccess = function(evt) {
	console.log("Successs! Could open DB");
	db = evt.target.result;
	var lbl_prefix = "label_3_";
	var lbl_start = 11;
	var url_prefix = "https://moodle.iitd.ac.in/course/view.php?id="
	
	var lbl_index = lbl_start;
	
	var courseObjStore = db.transaction("courses", "readwrite").objectStore("courses");
	
	courseObjStore.openCursor(null, "prev").onsuccess = function(evt) {
		var cursor = event.target.result;
		if (cursor) {
			console.log("Got a course");
			var lbl = document.getElementById(lbl_prefix+lbl_index);
			if (!lbl) return;
			lbl.setAttribute("title", cursor.value.name);
			lbl.innerHTML = cursor.value.code;
			lbl.setAttribute("href", url_prefix+cursor.value.id);
			lbl_index++;
			cursor.continue();
		}
	};

	if (window.location.href.startsWith("https://moodle.iitd.ac.in/user/profile.php") &&
		window.location.href.includes("showallcourses=1")) {
		// refresh database with courses
		var list = document.evaluate("//dl/dt[text()='Course profiles']/../dd/ul/*/*", document, null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
		courseObjStore.clear();
		// yes this is duplicate code, and I will refactor it.. later....
		for (var i=0; i<list.snapshotLength; i++) {
			var node = list.snapshotItem(i);
			var url = new URL(node.getAttribute("href"));
			var course = {};
			course["id"] = url.searchParams.get("course");
			var courseInfo = node.innerText.split(/ (.+)/);
			course["code"] = courseInfo[0];
			course["name"] = courseInfo[1];
			courseObjStore.add(course);
			console.log("Adding course " + course);
		}
	}
};

req.onupgradeneeded = function(evt) {
	console.log("Updating database");
	db = evt.target.result;
	var objStore = db.createObjectStore("courses", { keyPath: "id" });

	objStore.transaction.oncomplete = function(evt) {
		console.log("Created object store");
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://moodle.iitd.ac.in/user/profile.php?showallcourses=1");
		xhr.onload = function() {
			console.log("Profile Page loaded");
			console.log(xhr.responseText);
			var parser = new DOMParser();
			var doc = parser.parseFromString(xhr.responseText, "text/html");
			var list = doc.evaluate("//dl/dt[text()='Course profiles']/../dd/ul/*/*", doc, null,
						XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			var courseObjStore = db.transaction("courses", "readwrite").objectStore("courses");
			for (var i=0; i<list.snapshotLength; i++) {
				var node = list.snapshotItem(i);
				var url = new URL(node.getAttribute("href"));
				var course = {};
				course["id"] = url.searchParams.get("course");
				var courseInfo = node.innerText.split(/ (.+)/);
				course["code"] = courseInfo[0];
				course["name"] = courseInfo[1];
				courseObjStore.add(course);
				console.log("Adding course " + course);
			}
			window.location.reload();
		};
		xhr.send(null);
	};
};
