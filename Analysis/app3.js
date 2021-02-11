// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the donuts.csv file
// =================================
d3.csv("../Data/final_2020_emp.csv").then(function(empData) {
  // Step 4: Parse the data

  // Format the data
  empData.forEach(function(data) {
    data.month = +data.month;
    data.AA = +data.AA_emp_20;
    data.DA = +data.DA_emp_20;
    data.JB = +data.JB_emp_20;
    data.SW = +data.SW_emp_20;
    data.UA = +data.UA_emp_20
    console.log(data)
  });

    

  // Step 5: Create the scales for the chart
  // =================================
  var xLinearscale = d3.scaleLinear()
    .domain([d3.extent(empData, d => d.month)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(empData, d => d.UA_emp_20)])
    .range([height, 0]);

  // Step 6: Set up the y-axis domain
  // ==============================================
  // @NEW! determine the max y value
  // find the max of the morning data
//   var morningMax = d3.max(donutData, d => d.morning);

//   // find the max of the evening data
//   var eveningMax = d3.max(donutData, d => d.evening);

//   var yMax;
//   if (morningMax > eveningMax) {
//     yMax = morningMax;
//   }
//   else {
//     yMax = eveningMax;
//   }

//   // var yMax = morningMax > eveningMax ? morningMax : eveningMax;

//   // Use the yMax value to set the yLinearScale domain
//   yLinearScale.domain([0, yMax]);


  // Step 7: Create the axes
  // =================================
  var bottomAxis = d3.axisBottom(xLinearscale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);

  // Step 9: Set up two line generators and append two SVG paths
  // ==============================================

  // Line generator for morning data
  var line1 = d3.line()
    .x(d => xLinearscale(d.month))
    .y(d => yLinearScale(d.UA_emp_20));

  // Line generator for evening data
  var line2 = d3.line()
    .x(d => xLinearscale(d.month))
    .y(d => yLinearScale(d.AA_emp_20));

 // Line generator for evening data
//   var line3 = d3.line()
//     .x(d => xLinearscale(d.month))
//     .y(d => yLinearScale(d.SW_emp_20));
//   // Line generator for evening data
//   var line4 = d3.line()
//     .x(d => xLinearscale(d.month))
//     .y(d => yLinearScale(d.JB_emp_20));
//      // Line generator for evening data
//   var line5 = d3.line()
//     .x(d => xLinearscale(d.month))
//     .y(d => yLinearScale(d.DA_emp_20));
//   // Append a path for line1
  chartGroup
    .append("path")
    .attr("d", line1(empData))
    .classed("line green", true);

  // Append a path for line2
  chartGroup
    .data([empData])
    .append("path")
    .attr("d", line2)
    .classed("line red", true);

//   chartGroup
//     .append("path")
//     .attr("d", line3(empData))
//     .classed("line blue", true);

//   chartGroup
//     .append("path")
//     .attr("d", line4(empData))
//     .classed("line orange", true);

//   chartGroup
//     .append("path")
//     .attr("d", line5(empData))
//     .classed("line purple", true);

}).catch(function(error) {
  console.log(error);
});
