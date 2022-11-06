// set the dimensions and margins of the graph
var width = 450,
height = 450,
margin = 40,
holePct = 68;

// doughnut hole: 68%, margin 

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var splits = 20;
var data = Array(20).fill(100 / splits);

// set the color
var color = "#98abc5";

// Compute the position of each group on the pie:
var pie = d3.pie();

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
        .innerRadius(radius * holePct / 100)         // This is the size of the donut hole
        .outerRadius(radius)
        .padAngle(0.03)
    )
    .attr('fill', color)
    .style("opacity", 0.7);