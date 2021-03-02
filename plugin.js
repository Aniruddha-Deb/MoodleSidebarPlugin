courses = [ 
	{
		"name": "INTRO. TO ELECTRICAL ENGG.",
		"code": "2002-ELP101",
		"id": 11713
	},
	{
		"name": "ELECTROMAGNETIC WAVES & QUANTUM MECHANICS",
		"code": "2002-PYL101TC",
		"id": 11689
	},
	{
		"name": "LINEAR ALGEBRA & DIFFERENTIAL EQUATIONS",
		"code": "2002-MTL101T25",
		"id": 11644
	},
	{
		"name": "LINEAR ALGEBRA & DIFFERENTIAL EQUATIONS",
		"code": "2002-MTL101B",
		"id": 11626
	},
	{
		"name": "INTRO. TO COMPUTER SCIENCE",
		"code": "2002-COL100L5",
		"id": 11590
	},
	{
		"name": "ELECTROMAGNETIC WAVES & QUANTUM MECHANICS",
		"code": "2002-PYL101",
		"id": 11358
	},
	{
		"name": "INTRO. TO ELECTRICAL ENGG.",
		"code": "2002-ELL101",
		"id": 11053
	},
	{
		"name": "INTRO. TO COMPUTER SCIENCE",
		"code": "2002-COL100",
		"id": 10887
	}
]

var lbl_prefix = "label_3_";
var lbl_start = 11;
var url_prefix = "https://moodle.iitd.ac.in/course/view.php?id="

var lbl_index = lbl_start;
for (const course in courses) {
	var lbl = document.getElementById(lbl_prefix+lbl_index);
	lbl.setAttribute("title", courses[course].name);
	lbl.innerHTML = courses[course].code;
	lbl.setAttribute("href", url_prefix+courses[course].id);
	lbl_index++;
}
