const endpoint = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//fetch json data and print in console 
d3.json(endpoint).then(function(data) {
    console.log(data);
});

//store the json data in variables

d3.json(endpoint).then(data =>{
    personNames = data.names;
    metadata = data.metadata;
    samples =  data.samples; 
});

function barGraph(personEntry) {
    d3.json(endpoint).then(data => {
        let sampleValue = samples[personEntry].sample_values.slice(0,10).reverse();
        let otuIDs = samples[personEntry].otu_ids.map(id => `OTU ${id}`).slice(0,10).reverse();
        let labels = samples[personEntry].otu_labels.slice(0,10).reverse();

        let trace = {
            x:sampleValue,
            y:otuIDs,
            type:"bar",
            orientation: "h"
        };
        
        let dataTrace = [trace];

        let layout = {
            title: "Top 10 OTU Found in Individual"
        };

        Plotly.newPlot("bar",dataTrace, layout);
    });
};

barGraph(0);