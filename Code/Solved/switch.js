// Load data from hours-of-tv-watched.cs
// });

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("marriott_ann_rev_dataframe_r.csv").then(function(marriottAnnRev) {

  console.log(marriottAnnRev);
});

  // Print the tvData
  // console.log(tvData);

  // Cast the hours value to a number for each piece of tvData
  // tsaData.forEach(function(data) {
  //   data.hours = +data.hours;
  // });

  // var barSpacing = 10; // desired space between each bar
  // var scaleY = 10; // 10x scale on rect height

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
//   var barWidth = (chartWidth - (barSpacing * (tsaData.length - 1))) / tData.length;

//   // @TODO
//   // Create code to build the bar chart using the tvData.
//   chartGroup.selectAll(".bar")
//     .data(tvData)
//     .enter()
//     .append("rect")
//     .classed("bar", true)
//     .attr("width", d => barWidth)
//     .attr("height", d => d.hours * scaleY)
//     .attr("x", (d, i) => i * (barWidth + barSpacing))
//     .attr("y", d => chartHeight - d.hours * scaleY);
// }).catch(function(error) {
//   console.log(error);
// });

  

  // log a list of names
  // var date = tsaData.map(data => data.Date);
  // console.log("Date:", Date);

//   // Cast each hours value in tvData as a number using the unary + operator
//   tvData.forEach(function(data) {
//     data.hours = +data.hours;
//     console.log("Name:", data.name);
//     console.log("Hours:", data.hours);
//   });
// }).catch(function(error) {
//   console.log(error);
// });
