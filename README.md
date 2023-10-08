# Fullstack_project

This is a project work for a Fullstack course of my studies. It's a MEAN stack application 

## Prerequisites
- Angular CLI: ```$ npm i -g @angular(cli)```.
- node.js and npm, download from this [link] (https://nodejs.org/en/download).
- MongoDB, download from this [link] (https://www.mongodb.com/try/download/community).
    - Also the mongoDB shell is pretty usefull

I used Node v16.14.0 and Angular 16.2.5

## To install dependencies
Run ````$ npm install``` in the MEANunderBoard folder

## How to run the app

Run ````$ npm start``` to run the Node.js server. (Backend) This should connect to port [link](http://localhost:3000/)
(nodemon is used to update any changes on the server if modified)

### Angular CLI
```$ ng serve``` to run the angular server. You need to be in the angular-src/src/app folder. (Front-end) This should connect to port [link](http://localhost:4200/)

Bootstrap is used for layout.

The mongodb can be cleared in the mongo shell via command ```db.users.drop()``` and the users can be displayed ```db.users.find().pretty()```