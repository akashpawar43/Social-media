const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URL = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB URI
const dbName = 'social'; // Replace with your database name


const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


let db; // Declare db variable to hold the database connection

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(MONGO_URL, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    db = client.db('social'); // Replace 'myDatabase' with your database name
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Handle the error or retry the connection
  }
}

connectToDatabase();

app.get('/api/users', async (req, res) => {
  try {
    const collection = db.collection('users');
    const users = await collection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(express.json());


// Example endpoint to perform MongoDB operations
app.post('/api/register', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database connection error' });
    }

    const collection = db.collection('users'); // Replace 'users' with your collection name
    const { username, email, password } = req.body;

    const existingUser = await collection.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    await collection.insertOne({ username, email, password }); // Hash the password before saving!

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check credentials against your database or authentication service
    // Implement your logic to validate the user's login credentials here
    // For example, check if the email and password match a user in the database

    if (email === 'example@example.com' && password === 'password') {
      // Authentication successful
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Authentication failed
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/posts', async (req, res) => {
  const collection = db.collection('posts');
  const posts = await collection.find({}).toArray();
  res.json(posts);
})


// Add Post endpoint
app.post('/api/posts', async (req, res) => {
  try {
    const collection = db.collection('posts');
    const { title, description, imageUrl } = req.body;
    await collection.insertOne({ title, description, imageUrl });
    res.status(201).json({ message: 'Post added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add post' });
  }
});

// Endpoint to fetch comments for a post
app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id : postId} = req.params.id;
    const collection = db.collection('posts');
    // Fetch comments for postId from your database
    // Return comments as JSON
    // const postall = await collection.findById(postId);
    const postall = await collection.findOne(postId)
    console.log(postall)
    res.json(postall)
  } catch (error) {
    res.status(500).json({ error: 'Failed to add post' });
  }
});

// Endpoint to fetch comments for a post
app.get('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  // Fetch comments for postId from your database
  // Return comments as JSON
  res.json({ comments: fetchedComments });
});

// Endpoint to add a comment to a post
app.post('/api/posts/:id/comments', (req, res) => {
  const postId = req.params.postId;
  const { comment } = req.body;
  // Add 'comment' to the post with postId in your database
  // Return success response
  res.json({ message: 'Comment added successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});