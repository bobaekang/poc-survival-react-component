# Proof of concept for Survival Analysis React component

A simple proof-of-concept React app to visualize survival analysis result for INRG data, implementing the API as documented [here](https://github.com/chicagopcdc/Documents/blob/master/GEN3/survival-analysis-tool/requirements.md#react-component). This repo's goal is to prototype features that will be integrated into the [chicagopcdc/data-portal](https://github.com/chicagopcdc/data-portal) repo.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Design

This proof-of-concept should:

1. Allow user to sepecify the data source:
   - Local mock data (a copied subset of POC Microservice results in JSON)
   - [Proof-of-concept Microservice](https://github.com/bobaekang/poc-survival-microservice)
     - Allowd only if Microservice is available at the specified path
     - Microservice path is provided as an environment variable, `REACT_APP_POC_MICROSERVICE_URL`
2. Allow users to provide input for:
   - `factorVariable` (string)
   - `stratificationVariable` (string): disabled if no `factorVariable` is provided
   - `startTime` (integer): not available for local mock data
   - `endTime` (integer): not available for local mock data
   - `survivalType` (string): not available for local mock data; converted to boolean `efsFlag` based on its value
   - The current POC also includes user input for `timeInterval` to control the x-axes for generated plots.
3. On pressing "Apply" button:
   - If using local mock data, load data based on `factorVariable` and `stratificationVariable` values
   - If using POC Microservice, make an HTTP `POST` request with user input as request body, and load the fetched response data
4. Update the p-value, survival plot, and number-at-risk table using the loaded data.

## Project setup

1. Download and install the latest Node.js
2. Run `npm install` to install dependencies
3. Run `npm start` to spin up the development server
   - Alternatively, run `npm run build` to build the production app and serve it
4. Service is now running on localhost port 3000

### With POC Microservice

To test this application with [the proof-of-concept Microservice](https://github.com/bobaekang/poc-survival-microservice), make sure that the POC Microservice application is running and its URL is provided as an environment variable, `REACT_APP_POC_MICROSERVICE_URL` before spinning up the application.

## Key dependencies

- `create-react-app` for scaffolding the application
- `recharts` for plots (survival curves plot and number-at-risk table)
