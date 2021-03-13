Plotly.d3.csv('../Hotels/CSV/finalNetIncome.csv', function (rows) {
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
});