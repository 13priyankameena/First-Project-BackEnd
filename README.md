
# This is Back-End for Login Front-End

# Back-End Folder Structure include

1--app.js file
2--.env file
3--db
    3.a--ConnectDB.js
4--routes
    4.a--routeChart.js
5--models
    5.a--chartSchema.js
6--controller

# Package installed

he following packages were installed for the backend:

## express → For creating the server and handling API ( routes, middlewares etc.)

## cors → To enable cross-origin requests between frontend and backend.

## dotenv → To manage environment variables securely.

## body-parser → To parse incoming request bodies (JSON, form data, etc.).

## mongoose  → To connect and interact with MongoDB and for defining Schema and Model

## nodemon (dev dependency) → For auto-restarting the server during development.

# 1-------in package.json file (Backend)

 "scripts": { "start": "nodemon app.js" }

	auto-start when code is changed
2-----------"type": "module"

by this we can use ES-module(import/export)

##      -----app.js file-----

	1-----Role of dotenv.config();----

	It means:

           Load the .env file

            Put all variables inside process.env object

	2---ConnectDB.js call here for connecting to MongoDB

##        ----routeChart.js----

	1----Imports Express, which is a framework for building web servers in Node.js
	2----    GET /chartDB/chartdatas → Calls getAllrecords to fetch all chart data.

		POST /chartDB/chartdatas/create → Calls createNewRecord to add new chart data.

##         -----Controller/Chartcontroller

	1---import {chartModel} from "../models/chartSchema.js";


# CRUD Operation	             HTTP Method	                 Example URL
		Create     	         POST	                          /chartDB/students/create
		Read	             GET	                          /chartDB/students
		Update	             PUT / PATCH	                  /chartDB/students/:id
		Delete	             DELETE	                          /chartDB/students/:id

		Frontend (React) → User clicks “Add Student” → Sends POST request to /chartDB/students/create

                Backend (Express + MongoDB) → Receives request, adds student in DB, sends JSON response

                Frontend (React) → Shows success message or updates table





