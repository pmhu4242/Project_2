var svgWidth = 960;
var svgHeight = 600;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select("#stockchart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.csv("data/Final_Close_Dataset.csv").then(function (stockdata) {
    console.log(stockdata);


    // create a function to parse date and time
    var parseTime = d3.timeParse("%Y-%m-%d");
    // date = new Date("%b/%d/%Y");

    // format the data
    stockdata.forEach(function (data) {
        // data.Year = +data.Year;
        // data.Month = +data.Month;
        data.Date = parseTime(data.Date);
        data.UAL_Close = +data.UAL_Close;
        data.DAL_Close = +data.DAL_Close;
        data.AAL_Close = +data.AAL_Close;
        data.JBLU_Close = +data.JBLU_Close;
        data.LUV_Close = +data.LUV_Close;
        data.SAVE_Close = +data.SAVE_Close;
        // let temp = parseTime(data.Date);
        // console.log(temp);
    });

    // Create scaling functions
    var xTimeScale = d3.scaleTime()
        .domain(d3.extent(stockdata, d => d.Date))
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .range([height, 0]);

    // var yLinearScale2 = d3.scaleLinear()
    //     .domain([0, d3.max(stockdata, d => d.smurf_sightings)])
    //     .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xTimeScale)
        .tickFormat(d3.timeFormat("%b-%Y"));
    var leftAxis = d3.axisLeft(yLinearScale);
    // var rightAxis = d3.axisRight(yLinearScale);

    // Add x-axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // Add y2-axis to the right side of the display
    chartGroup.append("g")
        // Define the color of the axis text
        .classed("blue", true)
        // .attr("transform", `translate(${width}, 0)`)
        .call(leftAxis);

    // Line generators for UAL
    var UALline = d3.line()
        .x(d => xTimeScale(d.Date))
        .y(d => yLinearScale(d.UAL_Close));


    // Line generator for DAL
    var DALline = d3.line()
        .x(d => xTimeScale(d.Month, d.Year))
        .y(d => yLinearScale(d.DAL_Close));

    // // Line generator for evening data
    // var line2 = d3.line()
    //     .x(d => xTimeScale(d.date))
    //     .y(d => yLinearScale(d.evening));

    // Append a path for line1
    chartGroup
        .append("path")
        .data(stockdata)
        .attr("d", UALline)
        .classed("line green", true);

    // Append a path for line2
    // chartGroup
    //     .data([stockdata])
    //     .append("path")
    //     .attr("d", DALline(stockdata))
    //     .classed("line orange", true);

}).catch(function (error) {
    console.log(error);
});