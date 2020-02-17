var width = 450;
var height = 450;
var padding = 40;

var radius = width / 2 - padding;

var svg = d3.select("#chart")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");

var data = [
	{
		key: 0,
		slice: 1,
		value: 2,
	},
	{
		key: 1,
		slice: 1,
		value: 10,
	},{
		key: 2,
		slice: 1,
		value: 7,
	},{
		key: 3,
		slice: 1,
		value: 9,
	},{
		key: 4,
		slice: 1,
		value: 2,
	},{
		key: 5,
		slice: 1,
		value: 8,
	}
]

var pie = d3.pie()
		.value(function(d){	
			return d.slice;
		})

var r_scale = d3.scaleLinear()
		.domain([
			0, d3.max(data, function(d){
				return d.value;
			})
		])
		.range([0, radius]);

var arc = d3.arc()       
		.innerRadius(0)      //this will create <path> elements for us using arc data
		.outerRadius(function(d, i){
			// console.log(d.data.value);
			
			return r_scale(d.data.value);
		});

var arcs = svg.selectAll(".slice")
		.data(pie(data))
		.enter()
		.append("g")
		.attr("class", "slice")
		.append("path")
		.attr("fill", "#98abc5")
		.attr("d", arc);