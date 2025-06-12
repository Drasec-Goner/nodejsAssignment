# Backend - People Management API

This is the backend for the People Management application. It is built with Node.js and Express, and provides a RESTful API for managing people records.

## Features
- List all people
- Add a new person
- Edit an existing person
- Delete a person

## Project Structure
```
backend/
  app.js                # Main Express app
  package.json          # Project dependencies and scripts
  models/
    Person.js           # Mongoose model for Person
  routes/
    personRoutes.js     # API routes for people
```

## Prerequisites
- Node.js (v14 or higher recommended)
- npm (Node package manager)
- MongoDB (local or cloud instance)

## Setup Instructions

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure MongoDB:**
   - By default, the app connects to MongoDB at `mongodb://localhost:27017/peopleDB`.
   - To use a different URI, update the connection string in `app.js`.

3. **Start the server:**
   ```sh
   node app.js
   ```
   The server will run on `http://localhost:3000` by default.

## API Endpoints

- `GET    /api/people`         - Get all people
- `POST   /api/people`         - Add a new person
- `GET    /api/people/:id`     - Get a person by ID
- `PUT    /api/people/:id`     - Update a person by ID
- `DELETE /api/people/:id`     - Delete a person by ID

## License
This project is for educational purposes.
