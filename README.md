# Auto Shop Management System

This project is an Auto Shop Management System that allows users to manage car data efficiently. It includes a client interface to display car information, add new cars, and update existing ones. The system utilizes a Node.js backend server connected to a MongoDB database for data storage.

## Prerequisites
- Node.js installed on your system
- MongoDB database setup

## Getting Started
1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Start the backend server using `node server.js`.
4. Open `index.html` in a web browser to access the client interface.

## Components
- **Backend Server**: Provides HTTP request handling and connects to the MongoDB database.
- **Client Interface**: Displays car data in a table and provides forms for adding new cars and updating existing ones.

## Client Interface
The client interface includes:
- **Cars Collection Table**: Displays car data, including brand, model, year, service date, and service description.
- **Add New Car Form**: Allows users to input brand and model information to add a new car.
- **Modify Existing Car Form**: Enables users to update the brand and model of an existing car by specifying its ID.

## Usage
1. **Viewing Car Data**: Upon accessing the application, the cars collection table will display existing car data.
2. **Adding a New Car**:
   - Fill in the brand and model fields in the "Add a new car" form.
   - Click the "Submit" button to add the new car.
3. **Modifying an Existing Car**:
   - Enter the ID of the car you want to modify in the "Modify an existing car" form.
   - Update the brand and/or model fields.
   - Click the "Update" button to save the changes.
4. **Deleting a Car**:
   - To delete a car, you can perform a DELETE request to the `/api/cars/:id` endpoint.
