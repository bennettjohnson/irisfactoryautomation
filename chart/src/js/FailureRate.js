import { PureComponent } from "react";
let endpoints = require('./endpoints.json');

/* 
Name: Failure Rate
Author: Bennett Johnson
Version: 1.0.0
Description: A react class that displays the failure rates from the backend API.

Arguments: None
Returns:
  React Component (Maybe) Its unclear with how React works.
**/
export class FailureRate extends PureComponent {
  constructor(props) {
    super(props);
    this.data = this.getData();
    this.filter = this.data[0];
    this.lid = this.data[1];
  }

  /* 
  getData retrieves data from the backend API. This should be abstracted to its own interface for easier reuse, but I'll save that for a later date.
  Utilizes XMLHttpRequest to recieve requests from REST, then it parses it into JSON and then into an array. Surprisingly, the easiest way to do it.

  Args: None
  Returns: 
    (Array[2]): The percentages of filter and lid.
  **/
  getData() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endpoints.failure, false); // should be declared in a configuration json
    xhttp.send();
    var json = JSON.parse(xhttp.responseText); // for readability
    return [json[0]["filter"], json[0]["lid"]];
  }

  /* 
  calc is a simple function that doesn't actually calculate anything. Takes input and spits out corresponding color value. Defaults to no color.
  
  Args:
    value (float): Value in percent.
  Returns:
    (String): Color.
  **/
  calc(value) {
    switch(true){
      case (value >= 0.1):
        return "red";
      case (value >= 0.05):
        return "yellow";
      case (value <= 0.02):
        return "none"
      default: return "none";
    };
  }

  /* 
  Built in render function of React. This is what displays the information.
  
  Returns:
    React Component? Pure HTML? It's unclear.
  **/
  render(){
    return (
      <div class="rate">
        <h3>Reject Rates</h3>
        <div id="indicate" class={this.calc(this.filter)}><h1>{this.filter *100}%</h1></div>
        <div id="indicate" class={this.calc(this.lid)}><h1>{this.lid *100}%</h1></div>
      </div>
    );
  }
}