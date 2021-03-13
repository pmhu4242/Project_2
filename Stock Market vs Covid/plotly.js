// read the csv file
Plotly.d3.csv('data/Final_Collective_Dataset.csv', function (rows) {

    // create a function to unpack the data in each row
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    // create trace for United Airlines
    var trace = {
        x: unpack(rows, 'Date'),
        close: unpack(rows, 'UAL_Close'),
        high: unpack(rows, 'UAL_High'),
        low: unpack(rows, 'UAL_Low'),
        open: unpack(rows, 'UAL_Open'),

        // customise colors
        increasing: { line: { color: 'blue' } },
        decreasing: { line: { color: 'lightblue' } },

        // specify type of chart and axes
        name: 'United',
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    // create trace for Delta Airlines
    var trace1 = {
        x: unpack(rows, 'Date'),
        close: unpack(rows, 'DAL_Close'),
        high: unpack(rows, 'DAL_High'),
        low: unpack(rows, 'DAL_Low'),
        open: unpack(rows, 'DAL_Open'),

        // customise colors
        increasing: { line: { color: 'red' } },
        decreasing: { line: { color: 'pink' } },

        // specify type of chart and axes
        name:'Delta',
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    // create trace for American Airlines
    var trace2 = {
        x: unpack(rows, 'Date'),
        close: unpack(rows, 'AAL_Close'),
        high: unpack(rows, 'AAL_High'),
        low: unpack(rows, 'AAL_Low'),
        open: unpack(rows, 'AAL_Open'),

        // customise colors
        increasing: { line: { color: 'green' } },
        decreasing: { line: { color: 'lightgreen' } },

        // specify type of chart and axes
        name: 'American',
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    // create trace for Jetblue Airlines
    var trace3 = {
        x: unpack(rows, 'Date'),
        close: unpack(rows, 'JBLU_Close'),
        high: unpack(rows, 'JBLU_High'),
        low: unpack(rows, 'JBLU_Low'),
        open: unpack(rows, 'JBLU_Open'),

        // customise colors
        increasing: { line: { color: 'orange' } },
        decreasing: { line: { color: 'lightorange' } },

        // specify type of chart and axes
        name: 'Jetblue',
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    // create trace for Southwest Airlines
    var trace4 = {
        x: unpack(rows, 'Date'),
        close: unpack(rows, 'LUV_Close'),
        high: unpack(rows, 'LUV_High'),
        low: unpack(rows, 'LUV_Low'),
        open: unpack(rows, 'LUV_Open'),

        // customise colors
        increasing: { line: { color: 'purple' } },
        decreasing: { line: { color: 'lightpurple' } },

        // specify type of chart and axes
        name:'Southwest',
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    // create trace for Spirit Airlines
    var trace5 = {
        x: unpack(rows, 'Date'),
        close: unpack(rows, 'SAVE_Close'),
        high: unpack(rows, 'SAVE_High'),
        low: unpack(rows, 'SAVE_Low'),
        open: unpack(rows, 'SAVE_Open'),

        // customise colors
        increasing: { line: { color: 'black' } },
        decreasing: { line: { color: 'grey' } },

        // specify type of chart and axes
        name: 'Spirit',
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    var data = [trace, trace1, trace2, trace3, trace4, trace5];

    // create layout for the chart
    var layout = {
        dragmode: 'zoom',
        showlegend: true,
        xaxis: {
            autorange: true,
            title: 'Date',
            rangeselector: {
                x: 0,
                y: 1.2,
                xanchor: 'left',
                font: { size: 8 },
                buttons: [{
                    step: 'month',
                    stepmode: 'backward',
                    count: 1,
                    label: '1 month'
                }, {
                    step: 'month',
                    stepmode: 'backward',
                    count: 6,
                    label: '6 months'
                }, {
                    step: 'all',
                    label: 'All dates'
                }]
            }
        },
        yaxis: {
            autorange: true,
            title: 'US Dollars'
        }
    };

    // plot the chart
    Plotly.newPlot('stockchart', data, layout);

});