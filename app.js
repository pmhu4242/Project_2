var svgWidth = 1500;
var svgHeight = 800;

var margin = {
  top: 90,
  right: 20,
  bottom: 80,
  left: 250
};
console.log("started")
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params for x
var chosenXAxis = "Covid_positive";
// Initial Params for y
var chosenYAxis = "Total_Covid_Test";

// function used for updating x-scale upon click on axis label
function xScale(USA, chosenXAxis) {
  // create scales functions for the chart
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(USA, d => d[chosenXAxis])*.8,
      d3.max(USA, d => d[chosenXAxis])*1.2 
    ])
    .range([0, width]);
  // console.log(xLinearScale);
  return xLinearScale;
}

// function used for updating y-scale upon click on axis label
function yScale(USA, chosenYAxis) {
  // create scales function for the chart
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(USA, d => d[chosenYAxis]) *0.8 ,
      d3.max(USA, d => d[chosenYAxis]) *1.2
    ])
    .range([height, 0]);
  return yLinearScale;
}


// function used for updating xAxis upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
}

// function used for updating yAxis upon click on axis label
function renderyAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);
  return yAxis;
}

// function used for updating circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => newYScale(d[chosenYAxis]));
  return circlesGroup;
}

// Function used for updating Text Group with a transition to new text
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  textGroup.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]))
    .attr("y", d => newYScale(d[chosenYAxis]))
    // .attr("axis-text", true);
  return textGroup;
}



// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup) {
var xlabel;
  if (chosenXAxis === "Covid_positive") {
    var xlabel = "Positive Covid #:";
  }
  
  else {
    var xlabel = "Positive Antibody #";
  }

  if (chosenYAxis === "Total_Antibody_Test") {
    var ylabel = "Total tested Antibody:";
  }
  else if (chosenYAxis === "Total_Covid_Test") {
    var ylabel = "Total tested Covid:";
  }
  else {
    var ylabel = "Recovered:";
  }


//ToolTip
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([90, -90])
    .html(function(d) {
      return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}<br>${ylabel} ${d[chosenYAxis]}`);
    });

//Circles Tooltip
  circlesGroup.call(toolTip);
// Create Event Listeners -Display/Hide the Circles 
  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data) {
      toolTip.hide(data);
    });

// Text Tooltip
  textGroup.call(toolTip);
// Create Event Listeners -Display/Hide the Text Tooltip
  textGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout Event
    .on("mouseout", function(data) {
      toolTip.hide(data);
    });
  return circlesGroup;
}
console.log("ghn");
// Retrieve data from the CSV file and execute everything below
d3.csv("USA_cleaned.csv").then(function(USA, err) {
  // if (err) throw err;
 
  // parse data
  USA.forEach(function(data) {
    data.Covid_recovered = +data.Covid_recovered;
    data.Total_Covid_Test = +data.Total_Covid_Test;
    data.Total_Antibody_Test = +data.Total_Antibody_Test;
    data.Covid_positive = +data.Covid_positive;
    data.Positive_Antibody = +data.Positive_Antibody;
    
  });
  
  // xLinearScale function above csv import
  var xLinearScale = xScale(USA, chosenXAxis);
  // yLinearScale function above csv import
  var yLinearScale = yScale(USA, chosenYAxis);
 

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis to chartGroup
  var xAxis = chartGroup.append("g")
    // .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis to chartGroup
  var yAxis = chartGroup.append("g")
    // .classed("y-axis", true)
    // .attr("transform", `translate(0, ${height})`)
    .call(leftAxis);
  

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(USA)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 12)
    .attr("fill", "blue")
    .attr("opacity", ".65");

  // Append Text to Circles
  var textGroup = chartGroup.selectAll("text")
    .data(USA)
    .enter()
    .append("text")
    .attr("transform", `translate(0,4.5)`)
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .text(d => (d.state))
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
    .attr("fill", "white");
    // .classed("axis-text",true)

 

  // Create group for xlabels  
  var xlabelsGroup = chartGroup.append("g")
  .attr("transform", `translate(${width/2 }, ${height })`);

  var Covid_positivelabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "Covid_positive") // value to grab for event listener
    .classed("active", true)
    .text("Positive COVID test");

  var Positive_Antibodylabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 70)
    .attr("value", "Positive_Antibody") // value to grab for event listener
    .classed("inactive", true)
    .text("Positive ANTIBODY tested ");

  
  // Create group for ylabels
  var ylabelsGroup = chartGroup.append("g")
  .attr("transform","rotate(-90)");

  var Covid_testlabel = ylabelsGroup.append("text")
    .attr("y", 0-margin.left +150)
    .attr("x", 0-(height/2))
    .attr("value", "Total_Covid_Test") // value to grab for event listener
    .classed("active", true)
    .text("Total number Covid tested");

  var Antibodylabel = ylabelsGroup.append("text")
    .attr("x", 0-(height/2))
    .attr("y", 0-margin.left +120)
    .attr("value", "Total_Antibody_Test") // value to grab for event listener
    .classed("inactive", true)
    .text("Total # people tested Antibody");

  var recoveredlabel = ylabelsGroup.append("text")
    .attr("x", 0-(height/2))
    .attr("y", 0-margin.left +90)
    .attr("value", "Covid_recovered") // value to grab for event listener
    .classed("inactive", true)
    .text("# Recovered from Covid Test");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);
  var textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)

  // x axis labels event listener
  xlabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;
        // updates x scale for new data
        xLinearScale = xScale(USA, chosenXAxis);
        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);
        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);
        // Updates Text with New Values
        textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)
        
        // changes classes to change bold text
        if (chosenXAxis === "Covid_positive") {
          Covid_positivelabel
            .classed("active", true)
            .classed("inactive", false);
          Positive_Antibodylabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          Covid_positivelabel
            .classed("active", false)
            .classed("inactive", true);
          Positive_Antibodylabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });

  // y axis labels event listener
  ylabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var valueY = d3.select(this).attr("value");
      if (valueY !== chosenYAxis) {

        // replaces chosenXAxis with value
        chosenYAxis = valueY;
        // updates y scale for new data
        yLinearScale = yScale(USA, chosenYAxis);
        // updates y axis with transition
        yAxis = renderyAxes(yLinearScale, yAxis);
        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);
         // Updates Text with New Values
        textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)

        // changes classes to change bold text
        if (chosenYAxis === "Total_Antibody_Test") {
          Antibodylabel
            .classed("active", true)
            .classed("inactive", false);
          recoveredlabel
            .classed("active", false)
            .classed("inactive", true);
          Covid_testlabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenYAxis === "Covid_recovered") {
          recoveredlabel
            .classed("active", true)
            .classed("inactive", false);
          Covid_testlabel
            .classed("active", false)
            .classed("inactive", true);
          Antibodylabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          Antibodylabel
            .classed("active", false)
            .classed("inactive", true);
          recoveredlabel
            .classed("active", false)
            .classed("inactive", true);
          Covid_testlabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
}).catch(function(error) {
  console.log(error);
});