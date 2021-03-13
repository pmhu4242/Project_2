Plotly.d3.csv('../../Hotels/CSV/finalNetIncome.csv', function (rows) {
    console.log(rows)
  
    // // create a function to unpack the data in each row
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }
  
    // create trace for United Airlines
    var trace = {
        x: unpack(rows, 'date'),
        y: unpack(rows, 'BestWestern'),
  
        // specify type of chart and axes
        name: 'Final Net Income',
        type: 'line',
        xaxis: 'x',
        yaxis: 'y'
    };
    console.log(trace);

    var trace1 = {
        x: unpack(rows, 'date'),
        y: unpack(rows, 'Hilton'),
  
        // specify type of chart and axes
        name: 'Final Net Income',
        type: 'line',
        xaxis: 'x',
        yaxis: 'y'
    };
    console.log(trace1);

    var trace2 = {
        x: unpack(rows, 'date'),
        y: unpack(rows, 'Hyatt'),
  
        // specify type of chart and axes
        name: 'Final Net Income',
        type: 'line',
        xaxis: 'x',
        yaxis: 'y'
    };
    console.log(trace2);

    var trace3 = {
        x: unpack(rows, 'date'),
        y: unpack(rows, 'Marriott'),
  
        // specify type of chart and axes
        name: 'Final Net Income',
        type: 'line',
        xaxis: 'x',
        yaxis: 'y'
    };
    console.log(trace3);

    var trace4 = {
        x: unpack(rows, 'date'),
        y: unpack(rows, 'Wyndham'),
  
        // specify type of chart and axes
        name: 'Final Net Income',
        type: 'line',
        xaxis: 'x',
        yaxis: 'y'
    };
    console.log(trace4);
  });

  var data = [trace, trace1, trace2, trace3, trace4];

//   // Initializes the page with a default plot
    function init() {
        var dataset1 = [trace];
  
        var CHART = d3.selectAll("#plot").node();
  
        Plotly.newPlot(CHART, dataset1);
        console.log(dataset1)
    };
// });
  // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updatePlotly);
  
// //   This function is called when a dropdown menu item is selected
    function updatePlotly() {
//         // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.node().value;
  
        var CHART = d3.selectAll("#plot").node();

    };
  
        switch(trace) {
        case "dataset1":
            x = rows.map.BestWestern;
            y = rows.map.date;
            break;

        };
  init();

