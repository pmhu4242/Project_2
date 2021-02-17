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
//   });

  // Initializes the page with a default plot
    function init() {
        var dataset1 = [trace];
  
        var CHART = d3.selectAll("#plot").node();
  
        Plotly.newPlot(CHART, dataset1);
        console.log(dataset1)
  };
// });
  // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("body").on("change", updatePlotly);
  
//   This function is called when a dropdown menu item is selected
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.node().value;
  
        var CHART = d3.selectAll("#plot").node();
  
    // Initialize x and y arrays
        var x = [];
        var y = [];
  
        switch(trace) {
        case "dataset1":
            x = [1, 2, 3, 4, 5];
            y = [1, 2, 4, 8, 16];
            break;
  
        case "dataset2":
            x = [10, 20, 30, 40, 50];
            y = [1, 10, 100, 1000, 10000];
            break;
  
        case "dataset3":
            x = [100, 200, 300, 400, 500];
            y = [10, 100, 50, 10, 0];
            break;
    
        default:
            x = [1, 2, 3, 4, 5];
            y = [1, 2, 3, 4, 5];
            break;
        }
    
    
        // Note the extra brackets around 'x' and 'y'
        Plotly.restyle(CHART, "x", [x]);
        Plotly.restyle(CHART, "y", [y]);
    }
});
  init();
