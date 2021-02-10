// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 200
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%Y");

// Load data from forcepoints.csv
d3.csv("../../CSV/Marriott_Data/marriott_ann_rev_dataframe_rni.csv").then(function(MarriottData) {

  // Print the forceData
  console.log(MarriottData);

  MarriottData.forEach(function(data) {
    data.MarriottAnnualRevenue = parseTime(data.MarriottAnnualRevenue);
    data.MarriottAnnualRevenueDollars = +data.MarriottAnnualRevenueDollars;
  });

  // Configure a time scale
  // d3.extent returns the an array containing the min and max values for the property specified
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(MarriottData, data => data.MarriottAnnualRevenue))
    .range([0, chartWidth]);

//   // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(MarriottData, data => data.MarriottAnnualRevenueDollars)])
    .range([chartHeight, 0]);


//   // Create two new functions passing the scales in as arguments
//   // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);


//   // Configure a line function which will plot the x and y coordinates using our scales
  var drawLine = d3.line()
    .x(data => xTimeScale(data.MarriottAnnualRevenue))
    .y(data => yLinearScale(data.MarriottAnnualRevenueDollars));

//   // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
//     // The drawLine function returns the instructions for creating the line for forceData
    .attr("d", drawLine(MarriottData))
    .classed("line", true);

//   // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

//   // Append an SVG group element to the chartGroup, create the bottom axis inside of it
//   // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Annual Revenue (in $)");

  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top})`)
    .attr("class", "axisText")
    .text("Years");

  //   chartGroup.append("path")
  // .attr("d", line(MarriottData))
  // .attr("fill", "none")
  // .attr("stroke", "green");

// append circles to data points
  var circlesGroup = chartGroup.selectAll("circle")
    .data(MarriottData)
    .enter()
    .append("circle")
    .attr("d", "10")
    .attr("fill", "red");

// Event listeners with transitions
  circlesGroup.on("mouseover", function() {
    d3.select(this)
      .transition()
      .duration(1000)
      .attr("r", 20)
      .attr("fill", "lightblue");
})
//   .on("mouseout", function() {
//     d3.select(this)
//       .transition()
//       .duration(1000)
//       .attr("r", 10)
//       .attr("fill", "red");
//   });

}).catch(function(error) {
  console.log(error);
});
