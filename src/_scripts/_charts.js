var d3 = require('d3');

function createChart(el, fieldname) {
	var margin = {top: 20, right:20, bottom:20, left:40};
	var container = d3.select(el);
	var containerWidth = container.node().offsetWidth;
	var containerHeight = containerWidth * 0.66;
	var chartWidth = containerWidth - margin.right - margin.left;
	var chartHeight = containerHeight - margin.top - margin.bottom;

	var svg = container.append('svg')
	            .attr('width', containerWidth)
	            .attr('height', containerHeight)
	            .append('g')
	            .attr('transform', `translate(${margin.left}, ${margin.top})`);

	var xDomain = annualTotals.map(d => d.year);

	var yDomain = [
	0,
	d3.max(annualTotals.map(d => d[fieldname]))
	];

	var xScale = d3.scaleBand()
	          .domain(xDomain)
	          .range([0, chartWidth])
	          .padding(0.1);

	var yScale = d3.scaleLinear()
	          .domain(yDomain)
	          .range([chartHeight, 0]);

	var xAxis = d3.axisBottom(xScale)
					.tickValues([2000,2005,2010,2015,2017]);

	var yAxis = d3.axisLeft(yScale)
	          	.tickSize(-chartWidth)
	          	.ticks(4);

	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", `translate(0,${chartHeight})`)
	    .call(xAxis);

	svg.append("g")
	    .attr("class", "y axis")
	    .call(yAxis);


	var tooltip = svg.append('text')
    		.attr('class', 'chart-tooltip');

	svg.selectAll('.bar')
	    .data(annualTotals)
	    .enter()
	    .append('rect')
	    .attr('class', 'bar')
	    .attr('x', d => xScale(d.year))
	    .attr('y', d => yScale(d[fieldname]))
	    .attr('width', xScale.bandwidth())
	    .attr('height', d => chartHeight - yScale(d[fieldname]))
	    .on('mouseenter', function(d) {
	         // centers the text above each bar
	        var x = xScale(d.year) + xScale.bandwidth() / 2;
	        // the - 5 bumps up the text a bit so it's not directly over the bar
	        var y = yScale(d[fieldname]) - 5;

	        d3.select(this).classed('highlight', true);
	        tooltip.text(d[fieldname])
	            .attr('transform', `translate(${x}, ${y})`)
	            .raise();
	    })
	    .on('mouseleave', function(d) {
                d3.select(this).classed('highlight', false);
        		tooltip.text('');
	    });

}

createChart('#county-homicides','homicides_total');
createChart('#harvard-park-homicides','homicides_harvard_park');




