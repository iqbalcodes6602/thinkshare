
# Collaborative Note-Taking App

## Description

This Collaborative Note-Taking App allows multiple users to create, edit, and share notes in real-time. The app is built using the MERN stack (MongoDB, Express.js, React, Node.js) and utilizes WebSockets for real-time communication. Users can log in, create draggable notes, edit their contents, and collaborate with others on the same note simultaneously. The app also includes features like note organization, tagging, text formatting, and media embedding.


# Getting Started
To get started with this project, you'll need to have the following installed:

* Node.js (v12 or higher)
* MongoDB
Once you have these dependencies installed, follow these steps to set up the project:

1. Clone this repository: git clone https://github.com/iqbalcodes6602/thinkshare.git
2. Install backend dependencies: 
```bash
cd server
```
``` bash
 npm install
```
3. Install frontend dependencies: 
``` bash
cd ../client
``` 
``` bash
npm install
```
4. Start the backend server: 
``` bash
cd ../server 
```
``` bash
nodemon server.js
```
5. Start the frontend server:
``` bash
cd ../client 
```
``` bash
npm start
```
  
  The backend server will start running on http://localhost:5000 and the frontend server will start running on http://localhost:3000. You can access the web application by visiting http://localhost:3000 in your web browser.

# Folder Structure
The project's folder structure is as follows:

* server: contains the backend code written in Express and Mongoose
    * models: contains Mongoose models for the database
    * package.json: contains dependencies and scripts for the backend
    * package-lock.json: contains dependencies and scripts with version for the backend
* client: contains the frontend code written in React and Material UI
    * public: contains static files used by the frontend
    * src: contains the source code for the frontend
    * src/components: contains reusable React components
    * src/styles: contains styling for components
    * package.json: contains dependencies and scripts for the frontend
    * package-lock.json: contains dependencies and scripts with version for the frontend

# Technologies Used
This project uses the following technologies:

* ReactJS: a JavaScript library used to build the frontend user interface
* Material UI: a React component library used to style the frontend user interface
* SocketIO: a Node.js websocket application framework used to build the socket
* MongoDB: a NoSQL database used to store data for the web application
* Mongoose: an object data modeling (ODM) library for MongoDB used to interact with the database

# Contributing
If you would like to contribute to this project, please follow these steps:

  &nbsp;&nbsp;&nbsp;&nbsp;1. Fork this repository.
  
  &nbsp;&nbsp;&nbsp;&nbsp;2. Create a new branch for your changes: git checkout -b your-branch-name
  
  &nbsp;&nbsp;&nbsp;&nbsp;3. Make your changes and commit them: git commit -am "Add your commit message here"
  
  &nbsp;&nbsp;&nbsp;&nbsp;4. Push your changes to your forked repository: git push origin your-branch-name
  
  &nbsp;&nbsp;&nbsp;&nbsp;5. Open a pull request on this repository.
  
 ## Acknowledgments

- Thanks to [Anas Iqbal](https://github.com/iqbalcodes6602) for inspiration and support during the development of this app.