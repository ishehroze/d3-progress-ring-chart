const drawProgressChart = function (svgSelector, width, scorePct, gradelabel, color) {
    height = width,
    margin = width * 0.1,
    baseFontSize = width / 6.2,
    holePct = 72,
    padAngle = 0.027;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select(svgSelector)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("font-size", baseFontSize + "px")
        .attr("class", "progress-chart")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var splits = 21;
    var splitData = Array(splits).fill(100 / splits);

    // Compute the position of each group on the pie:
    var splitPie = d3.pie();

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg.selectAll('.splits')
        .data(splitPie(splitData))
        .enter()
        .append('path')
        .attr("class", "splits")
        .attr('d', d3.arc()
            .innerRadius(radius * holePct / 100)         // This is the size of the donut hole
            .outerRadius(radius)
            .padAngle(padAngle)
        )
        .attr('fill', color);

    var progressMaskData = [
        {
            "value": scorePct,
            "opacity": 0
        },
        {
            "value": 100 - scorePct,
            "opacity": 0.8
        }
    ];

    var maskPie = d3.pie().value(d => d.value).sort(null);

    svg.selectAll('.progress')
        .data(maskPie(progressMaskData))
        .enter()
        .append('path')
        .attr('class', 'progress')
        .attr('data-value', d => d.data.value)
        .attr('d', d3.arc()
            .innerRadius(radius * holePct / 100)         // This is the size of the donut hole
            .outerRadius(radius)
        )
        .attr('fill', "#FFF")
        .attr("opacity", d => d.data.opacity);

    svg.append('text')
        .attr("class", "scorepct")
        .attr("text-anchor", "middle")
        .text(scorePct + "%");

    svg.append('text')
        .attr("class", "gradelabel")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + 0 + "," + baseFontSize + ")")
        .text(gradelabel);
}
