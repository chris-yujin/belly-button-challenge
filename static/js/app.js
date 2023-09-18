const endpoint = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(endpoint).then(function(data) {
    console.log(data);
});


const dataPromise = d3.json(endpoint);
console.log(dataPromise);

function displayMetadata(personEntry) { 
    d3.json(endpoint).then(data => {
        let metadata = data.metadata;
        console.log(metadata);
        console.log(metadata[0]);
        let result = metadata.filter(meta => meta.id.toString() === personEntry)[0];
        
        console.log(result);
        
        let demoInfo = d3.select("#sample-metadata");

        demoInfo.html("");

        Object.entries(result).forEach((key)=>{
            demoInfo.append("h5").text(key[0] + ": " + key[1] + "\n");
    });
});
};

function barGraph(personEntry) {
    d3.json(endpoint).then( (data) => {
        console.log(data);
        let samples =  data.samples; 
        let sample = samples.filter(value => value.id == personEntry)
        let sampleValue = sample[0].sample_values.slice(0,10).reverse();
        console.log(sample);
        console.log(sample[0]);
        console.log(sampleValue);
        
        let otuIDs = sample[0].otu_ids.map(id => `OTU ${id}`).slice(0,10).reverse();
        let labels = sample[0].otu_labels.slice(0,10).reverse();

        let trace = {
            x:sampleValue,
            y:otuIDs,
            type:"bar",
            orientation: "h",
            text: labels
        };
        
        let dataTrace = [trace];

        let layout = {
            title: "Top 10 OTU Found in Individual",
            x_axis: "Sample Values"
        };

        Plotly.newPlot("bar",dataTrace, layout);
    });
};

function bubbleChart(personEntry) {
    d3.json(endpoint).then((data)=> {
        let samples =  data.samples; 
        let sample = samples.filter(value => value.id == personEntry)
        let sampleValue = sample[0].sample_values;
        let otuIDs = sample[0].otu_ids;
        let labels = sample[0].otu_labels;
    
  
        let trace ={
            x: otuIDs,
            y: sampleValue,
            text: labels,
            mode: 'markers',
            marker: { 
                size: sampleValue,
                color: otuIDs,
                colorscale: "Earth"
            }
        };
        let dataTrace2 = [trace];
        let layout = {
            x_axis: "OTU IDs",
            title: "Bacteria per Sample",
            hovermode: "closest"
        };
        Plotly.newPlot("bubble", dataTrace2, layout)
    })    
};

function optionChanged(personEntry) {
    barGraph(personEntry);
    bubbleChart(personEntry);
    displayMetadata(personEntry);
};

function init() {
    dropdownMenu = d3.select("#selDataset");
    d3.json(endpoint).then((data) => {
        let personID = data.names;
        for (let i =0; i<personID.length; i++) {
            dropdownMenu.append("option").text(personID[i]).property("value", personID[i]);
        };
        barGraph(personID[0]);
        bubbleChart(personID[0]);
        displayMetadata(personID[0]);
    });
};

init();


//optional gauge 
