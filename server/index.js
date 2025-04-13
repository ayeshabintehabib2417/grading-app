const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/grading", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Create student
app.post("/users", async (req, res) => {
  try {
    const { name, email, role, grades } = req.body;
    
    // Validate request data
    if (!name || !email) {
      return res.status(400).send("Name and Email are required.");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists.");
    }

    const user = new User({ name, email, role, grades });
    await user.save();
    res.status(201).send("User created successfully.");
  } catch (err) {
    res.status(500).send("Error creating user: " + err.message);
  }
});

// Get student by email
app.get('/users', (req, res) => {
    User.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

// Get student by email
app.get("/users/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    res.send(user);
  });

  
  app.put("/users", async (req, res) => {
    const { email } = req.body; // Expect the email to be in the request body
  
    if (!email) {
      return res.status(400).send("Email is required.");
    }
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email }, // Searching by email (or another unique field)
        req.body,  // The updated data
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).send("User not found.");
      }
  
      res.status(200).send("User updated successfully.");
    } catch (err) {
      res.status(500).send("Error updating user: " + err.message);
    }
  });
  
  

// Delete student
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send("User not found.");
    }
    res.status(200).send("User deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting user: " + err.message);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
