// // function for initialization
// function init() {

//     // read in the csv file
//     d3.csv("data/Final_Collective_Dataset.csv").then((airlines) => {

//         console.log(airlines)
//         console.log(airlines)


//           // filter metadata by id
//           var date = meta.filter(airlines => airlines.Date == Date)[0];
//           console.log(date)

//     });

// };


// // call init function 
// init ();


Plotly.d3.csv('data/Final_Collective_Dataset.csv', function (err, rows) {

    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    var trace = {
        x: unpack(rows, 'Date'),
        close: unpack(rows, 'UAL_Close'),
        high: unpack(rows, 'UAL_High'),
        low: unpack(rows, 'UAL_Low'),
        open: unpack(rows, 'UAL_Open'),

        // cutomise colors
        increasing: { line: { color: 'blue' } },
        decreasing: { line: { color: 'lightblue' } },

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    var trace1 = {
        x: unpack(rows, 'Date'),
        close: unpack(rows, 'DAL_Close'),
        high: unpack(rows, 'DAL_High'),
        low: unpack(rows, 'DAL_Low'),
        open: unpack(rows, 'DAL_Open'),

        // cutomise colors
        increasing: { line: { color: 'navy' } },
        decreasing: { line: { color: 'red' } },

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    var trace2 = {
        x: unpack(rows, 'Date'),
        close: unpack(rows, 'AAL_Close'),
        high: unpack(rows, 'AAL_High'),
        low: unpack(rows, 'AAL_Low'),
        open: unpack(rows, 'AAL_Open'),

        // cutomise colors
        increasing: { line: { color: 'teal' } },
        decreasing: { line: { color: 'pink' } },

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    var trace3 = {
        x: unpack(rows, 'Date'),
        close: unpack(rows, 'JBLU_Close'),
        high: unpack(rows, 'JBLU_High'),
        low: unpack(rows, 'JBLU_Low'),
        open: unpack(rows, 'JBLU_Open'),

        // cutomise colors
        increasing: { line: { color: 'green' } },
        decreasing: { line: { color: 'orange' } },

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    var data = [trace, trace1, trace2, trace3];

    var layout = {
        dragmode: 'zoom',
        showlegend: false,
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
        }
    };

    Plotly.newPlot('stockchart', data, layout);
});