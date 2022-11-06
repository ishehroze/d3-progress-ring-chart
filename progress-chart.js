// set the dimensions and margins of the graph
var width = 450,
height = width,
margin = width * 0.1,
baseFontSize = width / 6.25,
holePct = 72,

scorePct = 69.5,
gradelabel = "Marginal",
color = "#00B050";

// doughnut hole: 68%, margin 

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("font-size", baseFontSize + "px")
    .attr("class", "progress-chart")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var splits = 20;
var data = Array(20).fill(100 / splits);

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
        .padAngle(0.035)
    )
    .attr('fill', color)

svg.append('text')
    .attr("class", "scorepct")
    .attr("text-anchor", "middle")
    .text(scorePct + "%");

svg.append('text')
    .attr("class", "gradelabel")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + 0 + "," + baseFontSize + ")")
    .text(gradelabel);    