// var data            =   [
//   [ 400, 200 ],
//   [ 210,140 ],
//   [ 722,300 ],
//   [ 70,160 ],
//   [ 250,50 ],
//   [ 110,280 ],
//   [ 699,225 ],
//   [ 90, 220 ]
// ];

var data = [
  { data: '07/01/2017', num: 20 },
  { data: '07/02/2017', num: 30 },
  { data: '07/03/2017', num: 90 },
  { data: '07/04/2017', num: 120 },
  { data: '07/05/2017', num: 78 },
  { data: '07/06/2017', num: 9 },
  { data: '07/07/2017', num: 58 },
  { data: '07/08/2017', num: 10 },
  { data: '07/09/2017', num: 100 },
  { data: '07/10/2017', num: 37 },
  { data: '07/11/2017', num: 89 },
]
var chart_width     =   800;
var chart_height    =   400;
var padding = 50

var time_parse = d3.timeParse( '%m/%d/%Y' )
var time_format = d3.timeFormat( '%b %e' )

data.forEach(function(e, i){{
  data[i].date = time_parse(e.data);
}})

var svg = d3.select('#chart')
          .append('svg')
          .attr('width', chart_width)
          .attr('height', chart_height);


var x_scale = d3.scaleTime()
              .domain([
                d3.min(data, function(d){
                  return d.date;
                }), 
                d3.max(data,function(d){
                  return d.date;
                })
              ])
              .range([padding, chart_width - padding * 2]);

var y_scale = d3.scaleLinear()
              .domain([0, d3.max(data,function(d){
                return d.num;
              })])
              .range([chart_height - padding, padding]);

var r_scale = d3.scaleLinear()
              .domain([0, d3.max(data,function(d){
                return d[1];
              })])
              .range([5, 30]);

var a_scale = d3.scaleSqrt()
              .domain([0, d3.max(data,function(d){
                return d.num;
              })])
              .range([0, 25]);

svg.selectAll('circle')
 .data(data)
 .enter()
 .append('circle')
 .attr('cx', function(d){
   return x_scale(d.date);
 })
 .attr('cy', function(d){
   return y_scale(d.num);
 })
 .attr('r', function(d){
   return a_scale(d.num);
 })
 .attr('fill', '#D1AB0E')

svg.selectAll('text')
 .data(data)
 .enter()
 .append('text')
 .text(function(d){
   return time_format(d.date);
 })
 .attr('x', function(d){
   return x_scale(d.date);
 })
 .attr('y', function(d){
   return y_scale(d.num);
 })
 .attr('text-anchor', 'middle')