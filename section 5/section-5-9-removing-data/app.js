// var data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];
var data = [
	{ key: 0, num: 6 },
	{ key: 1, num: 20 },
	{ key: 2, num: 21 },
	{ key: 3, num: 14 },
	{ key: 4, num: 2 },
	{ key: 5, num: 30 },
	{ key: 6, num: 7 },
	{ key: 7, num: 16 },
	{ key: 8, num: 25 },
	{ key: 9, num: 5 },
	{ key: 10, num: 11 },
	{ key: 11, num: 28 },
	{ key: 12, num: 10 },
	{ key: 13, num: 28 },
	{ key: 14, num: 9 }
]

// Create SVG Element
var chart_width = 800;
var chart_height = 400;
var bar_padding = 5;

var key = function(d) {
	return d.key;
};


var svg = d3.select('#chart')
	.append('svg')
	.attr('width', chart_width)
	.attr('height', chart_height);

// Create Scales
var x_scale = d3.scaleBand()
								.domain(d3.range(data.length))
								.rangeRound([0, chart_width])
								.paddingInner(0.05);

var y_scale = d3.scaleLinear()
								.domain([
									0, d3.max(data, function(d){
										return d.num;
									})
								])
								.range([0 ,chart_height]);

	// Bind Data and create bars
svg.selectAll('rect')
		.data(data, key)
		.enter()
		.append('rect')
		.attr('x', function (d, i) {
			return x_scale(i);
		})
		.attr('y', function (d) {
			return chart_height - y_scale(d.num);
		})
		.attr('width', x_scale.bandwidth())
		.attr('height', function (d) {
			return y_scale(d.num);
		})
		.attr('fill', '#7ED26D');

// Create Labels
svg.selectAll('text')
	.data(data, key)
	.enter()
	.append('text')
	.text(function (d) {
		return d.num;
	})
	.attr('x', function (d, i) {
		return x_scale(i) + x_scale.bandwidth() / 2;
	})
	.attr('y', function (d) {
		return chart_height - y_scale(d.num) + 15;
	})
	.attr('font-size', 14)
	.attr('fill', '#fff')
	.attr('text-anchor', 'middle');


// Event
d3.select('.update')
	.on('click', function(){
		// data.reverse();
		data[0].num = 50;

		y_scale.domain([0, d3.max(data, function(d){
			return d.num;
		})]);

		svg.selectAll('rect')
				.data(data, key)
				.transition()
				.delay(function(d, i){
					return i / data.length * 1000;
				})
				.duration( 1000 )
				.ease(d3.easeElasticOut)
				.attr('y', function (d) {
					return chart_height - y_scale(d.num);
				})
				.attr('height', function (d) {
					return y_scale(d.num);
				});
		
		svg.selectAll('text')
				.data(data, key)
				.transition()
				.delay(function(d, i){
					return i / data.length * 1000;
				})
				.duration( 1000 )
				.ease(d3.easeElasticOut)
				.text(function (d) {
					return d.num;
				})
				.attr('y', function (d) {
					return chart_height - y_scale(d.num) + 15;
				})

	})

d3.select('.add')
	.on('click', function(){
	// add new data
		var new_num = Math.floor(Math.random() * d3.max(data, function(d){
			return d.num;
		}));

		data.push({
			key: data[data.length-1].key+1, num:new_num
		});
		x_scale.domain(d3.range(data.length));
		y_scale.domain([0, d3.max(data, function(d){
			return d.num;
		})]);

	// select bars
		var bars = svg.selectAll('rect').data(data, key);

	// Add new bars
		bars.enter()
			.append('rect')
			.attr('x', function(d, i){
				return x_scale(i);
			})
			.attr('y', chart_height)
			.attr('width', x_scale.bandwidth())
			.attr('height', 0)
			.attr('fill', '#7ED26D')
			.merge(bars)
			.transition()
			.duration(1000)
			.attr('x', function (d, i) {
				return x_scale(i);
			})
			.attr('y', function (d) {
				return chart_height - y_scale(d.num);
			})
			.attr('width', x_scale.bandwidth())
			.attr('height', function (d) {
				return y_scale(d.num);
			});
		
		var labels = svg.selectAll('text').data(data, key);
		labels.enter()
				.append("text")
				.text(function(d){
					return d.num;
				})
				.attr('x', function (d, i) {
					return x_scale(i) + x_scale.bandwidth() / 2;
				})
				.attr('y', function (d) {
					return chart_height;
				})
				.attr('font-size', 14)
				.attr('fill', '#fff')
				.attr('text-anchor', 'middle')
				.merge(labels)
				.transition()
				.duration(1000)
				.attr('x', function (d, i) {
					return x_scale(i) + x_scale.bandwidth() / 2;
				})
				.attr('y', function (d) {
					return chart_height - y_scale(d.num) + 15;
				});
			
	});
d3.select('.remove')
	.on('click', function(){
		// remove first data
		data.shift();

		// update scales
		x_scale.domain(d3.range(data.length));
		y_scale.domain([0, d3.max(data, function(d){
			return d.num;
		})]);
		// select all bars
		var bars = d3.selectAll('rect').data(data, key);
		bars.transition()
				.duration(500)
				.attr("x", function(d, i){
					return x_scale(i);
				})
				.attr('y', function (d) {
					return chart_height - y_scale(d.num);
				})
				.attr('width', x_scale.bandwidth())
				.attr('height', function (d) {
					return y_scale(d.num);
				});

		// remove bar
		bars.exit()
				.transition()
				.attr('x', -x_scale.bandwidth())
				.remove();
				


		var labels = d3.selectAll('text').data(data, key);

		labels.transition()
					.duration(500)
					.attr('text-anchor', 'middle')
					.attr('x', function (d, i) {
						return x_scale(i) + x_scale.bandwidth() / 2
					})
					.attr('y', function (d) {
						return chart_height - y_scale(d.num) + 15;
					});

		// remove label
		labels.exit()
				.transition()
				.attr('x', -x_scale.bandwidth())
				.remove();
	})