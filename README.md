# Repo Contents

## Property Server

Serves the connection to a local MySQL database on port 4000 for the app.
Contains:
 - Details of properties (hotels, safari lodges, etc)
 - Data on service providers and bednight reporting (how many nights a guest stayed at a property)
 - Ability for reporting on sales by consultant, client, property, portfolio, etc

First, start the property server using `npm start` in the `property-server` directory

## ItinX React

Runs the react app using `npm start` in the `itinx-react` directory.

Allows CRUD functionality for the database, comparing properties, reporting on sales etc.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Py
Sample starter python files related to building an itinerary document from inputs
