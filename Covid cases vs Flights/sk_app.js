Promise.all([
    d3.csv('./data/covid_19_data.csv'), d3.csv('./data/Flightsdata.csv')

]).then(function (data) {
    tempCovidData = data[0]
    tempCovidData = tempCovidData.filter(function (cd) {
        return cd['Country/Region'] === 'US'
    })
    let covidData = []
    tempCovidData.forEach(function (cd) {
        let currentData = covidData.find(function (cdinner) { return cdinner.date === cd.ObservationDate })
        if (currentData) {
            currentData.count += Number(cd.Confirmed)
        }
        else {
            covidData.push({ date: cd.ObservationDate, count: Number(cd.Confirmed) })
        }
    })
    let flightsData = data[1]
    let combinedData = []
    flightsData.forEach(function (fD) {
        if (fD.DATE.split('/')[2] !== '2020') { return }

        let newData = { date: fD.DATE, flights: Number(fD['2020']) }
        let currentCovidData = covidData.find(function (cd) { return Number(cd.date.split('/')[0]) === Number(fD.DATE.split('/')[0]) && Number(cd.date.split('/')[1]) === Number(fD.DATE.split('/')[1]) })
        newData.covidCount = currentCovidData.count
        combinedData.push(newData)
    })
    // console.log(covidData, flightsData, combinedData)
    // console.log(covidData[0])
    // console.log(combinedData)
    // const svg = d3.select('svg').attr('width', 500).attr('height', 500);
    // const x = d3.scaleLinear().domain(d3.extent(flightsData, function (d) { return d['2020'] })).range([400, 0])
    // const y = d3.scaleLinear().domain(d3.extent(covidData, function (d) { return d.count })).range([400, 0])
    // const graph = svg.append('g').attr('transform', 'translate(100,50)')
    // graph.append('g').call(d3.axisBottom(x)).attr('transform', 'translate(0,400)')
    // graph.append('g').call(d3.axisLeft(y))

    
       xValue1 = combinedData.map(obj=>obj.date).reverse();
       yValue1 = combinedData.map(obj=>obj.flights).reverse();
       xValue2 = combinedData.map(obj=>obj.date).reverse();
       yValue2 = combinedData.map(obj=>obj.covidCount).reverse();

       counter = xValue1.length;

       showBars();

       function showBars() {

              if(counter){
       
                  setTimeout(function () {
                       let index = yValue2.length - counter;
                       var xVal1 = xValue1.slice(0,index);
                       var yVal1 = yValue1.slice(0,index);
                       var xVal2 = xValue2.slice(0,index);
                       var yVal2 = yValue2.slice(0,index);
       
                       
                       var trace1 = {
                           x:xVal1,
                           y: yVal1,
                           name: 'Flights',
                           type: 'bar'
                       };
                       
                       var trace2 = {
                           x: xVal2,
                           y: yVal2,
                           name: 'CovidCount',
                           type: 'bar'
                       };
                   
                       var data = [trace1, trace2];
                       var layout = { barmode: 'stack' };
                      
                       Plotly.newPlot('chart', data, layout);
                       
                       counter--;

                       showBars();
                  }, 200)
              }
       }


});
