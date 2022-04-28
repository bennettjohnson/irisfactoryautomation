import React from "react";
import ReactDOM from "react-dom";
import { Data } from "./Data";
import { FailureRate } from "./FailureRate";

/* 
Name: Index
Author: Bennett Johnson
Version: 1.0.0
Description: This is what runs the React code.

Arguments: None
Returns: None
**/
const chart = document.getElementById("chart");
const failureRate = document.getElementById("failureRate");
ReactDOM.render(<Data />, chart);
ReactDOM.render(<FailureRate/>, failureRate);