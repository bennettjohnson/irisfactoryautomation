import React, { PureComponent, useState } from "react";
import { Chart } from "react-google-charts";

let endpoints = require('./endpoints.json');

/* 
Name: Data
Author: Bennett Johnson
Version: 1.0.0
Description: A react class that displays a google chart.

Arguments: None
Returns:
  React Component (Maybe) Its unclear with how React works. Needs clarification.
**/
export class Data extends PureComponent {
    constructor(props) {
        super(props)
        this.data = this.getData();
        
        this.options = {
            chart: {
              title: "Lid Anaytics",
              tooltip: false
            }
        };
    }
    /* 
    getData retrieves data from the backend API. This should be abstracted to its own interface for easier reuse, but I'll save that for a later date.
    Utilizes XMLHttpRequest to recieve requests from REST, then parses it into JSON and then finally into a format usable by Google charts. Very convoluted.
    Should be reformatted to be more efficient, however the easiest way to do that would be to change the Google charts API to accept JSON.

    Args: None
    Returns: 
        (Array[n]): The array of data to be displayed with Google Charts.
    **/
    getData() {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", endpoints.chart, false);
        xhttp.send();
        

        var j = JSON.parse(xhttp.responseText);
        var done = [];
        // Matrice calculations
        j.forEach(function(object){
            done.push([object.time,object.offset_lid, object.lid_height, object.barcode, object.wrong_lid, object.gross_defect, object.sealing_surface]); // This should be a map function, but that level of optimization isnt necessary for an example
        });
        var labels = Object.keys(j[0]);
        labels = labels.map((e) => {
            return (e.charAt(0).toUpperCase() + e.slice(1)).replaceAll('_', ' ');
        });
        done.unshift(labels);

        return done
    }

    /* 
    Built in render function of React. This is what displays the information.
  
    Returns:
        React Component? Pure HTML? It's unclear.
    **/
    render() {
        return (
            <Chart
                chartType="Line"
                width="100%"
                height="400px"
                data={this.data}
                options={this.options}
                legendToggle={true} // This has undefined behavior and is effectively broken. I would need to patch this to do exactly what you want. The best I can do is force the series' to be white when they are toggled, so they arent as glaring. I recommend using a different charting library going forward.
            />
          );
    };
}