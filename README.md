# Quote App

A simple app to save, view, and delete quotes. Built with Node.js, Express, and MongoDB.

## Features

- View a random quote on the home page
- Add new quotes with an author
- Browse and delete all saved quotes

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your MongoDB connection string:

   ```bash
   MONGO_URL=your_mongodb_connection_string
   ```

3. Start the server:

   ```bash
   node server.js
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech stack

- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Frontend:** HTML, CSS, JavaScript
