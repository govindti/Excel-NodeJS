# Excel Node.js Project

This project provides a simple **Node.js** application built with **Express.js** and **Multer** for uploading and parsing Excel files. The application processes an Excel file uploaded via a POST request, extracts its content, converts it into a **JSON** format, and then returns the JSON response to the user. After the file is processed, it is automatically deleted from the server to free up disk space.

The project uses the **`xlsx`** library to handle Excel file parsing and supports both **`.xls`** and **`.xlsx`** file formats.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)


## Features
- **File Upload**: Allows users to upload Excel files (either `.xls` or `.xlsx`).
- **Excel Parsing**: Converts Excel data into a JSON format.
- **Dynamic JSON**: Maps Excel columns to JSON keys and adds a unique `id` field to each row of data.
- **File Deletion**: Deletes the uploaded file after processing to save server space.
- **Simple API**: Exposes a simple API endpoint to upload the Excel file and receive the parsed data.

## Tech Stack
- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for building the REST API.
- **Multer**: Middleware for handling file uploads.
- **xlsx**: Library to parse Excel files into JavaScript objects.
- **fs**: Node.js file system module to handle file deletion.
- **Path**: Node.js module for handling file and directory paths.

## Installation

### Prerequisites
Before setting up this project, ensure that you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Steps to Set Up

1. **Clone the repository**:
   Open a terminal/command prompt and run the following command to clone this repository:

   ```bash
   git clone https://github.com/govindti/excelnodejs.git
2. **Navigate to the project directory**:
    ```bash
    cd excelnodejs

3. **Install dependencies: Run the following command to install the required dependencies:**:
   Open a terminal/command prompt and run the following command to clone this repository:

   ```bash
   npm install
4. **Set up file storage directory: Ensure that the uploads/ directory exists in the project folder. This is where the uploaded files will be temporarily stored.**:
    ```bash
    mkdir uploads
4. **Run the server: Start the server by running the following command**:
    ```bash
    node app.js 
The server will now be running at http://localhost:5000.


# Thank You for Reading this