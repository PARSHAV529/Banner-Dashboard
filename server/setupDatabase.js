const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'neh59' // Replace with your actual MySQL root password
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL.');
  
  // Create database
  connection.query('CREATE DATABASE IF NOT EXISTS banner_db', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists.');

    // Use the newly created database
    connection.query('USE banner_db', (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        return;
      }
      console.log('Database selected.');

      // Create table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS banner (
          id INT AUTO_INCREMENT PRIMARY KEY,
          isVisible BOOLEAN,
          description TEXT,
          countdown INT,
          link VARCHAR(255)
        )
      `;
      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          return;
        }
        console.log('Table created or already exists.');

        // Insert data
        const insertDataQuery = `
          INSERT INTO banner (isVisible, description, countdown, link)
          VALUES (?, ?, ?, ?)
        `;
        const values = [true, 'Welcome to our website!', 3600, 'https://example.com'];

        connection.query(insertDataQuery, values, (err) => {
          if (err) {
            console.error('Error inserting data:', err);
            return;
          }
          console.log('Data inserted successfully.');

          // Close the connection
          connection.end();
        });
      });
    });
  });
});
