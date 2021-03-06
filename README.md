# Iris Factory Automation
This is two applications, the frontend, and the backend. Named Chart and Server respectively. The frontend is built with React, react-google-charts and Bootstrap. The backend is built with Express and MySQL. I've built these applications to run with parcel and nodemon. The backend requires a database to be connected to it. You can give access to the backend through a ".env" file placed in the root of the server directory. There is an "example.env" file located in the root to go off of. 

The database consists of two tables, a "lid" table and a "failure" table. They are formatted as such:

## lid
| id | time | offset_lid | lid_height | barcode | wrong_lid | gross_defect | sealing_surface |
|----|------|------------|------------|---------|-----------|--------------|-----------------|
|1|00:00:00|0.05|0.04|0.06|0.01|0.2|0.3|

## lid

|id|filter|lid|
|--|------|---|
|1|0.05|0.1

## Running the application
To run the application, navigate to the root of each application, the run the following command:
> npm install --save-dev

To run the frontend, while in the root of the frontend, run the following command:
> npm run start

To run the backend, while in the root of the backend, run the following command:
> npm run dev

## The Google charts patch
I could not include the patch to fix google charts within this repository, however I would be happy to explain how I did it. The Google Charts React wrapper provides undefined behavior when trying to hook the legend functionality and would need to be patched to use it in a production environment. I recommend using a different charting library that doesnt make use of AJAX.

## Images
### No Data
![No data](/img/NoData.png)
### Some Data
![Some data](/img/SomeData.png)
### All Data
![All data](/img/AllData.png)