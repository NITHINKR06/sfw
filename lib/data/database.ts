import { Category } from "./types";

export const databaseCategory: Category = {
  id: "database",
  title: "Database Integration",
  description: "Learn to integrate databases with your backend - MongoDB and PostgreSQL",
  prerequisites: ["Node.js basics", "Express.js basics"],
  icon: "💾",
  order: 8,
  topics: [
    {
      id: "mongodb",
      title: "MongoDB with Mongoose",
      description: "Learn MongoDB database operations using Mongoose ODM",
      prerequisites: ["Express.js basics"],
      order: 1,
      examples: [
        {
          id: "mongodb-setup",
          title: "Step 1: MongoDB Setup and Connection",
          description: "Set up MongoDB and connect to your Express app",
          learningObjectives: [
            "Install MongoDB and Mongoose",
            "Connect to MongoDB database",
            "Understand connection strings",
          ],
          prerequisites: ["Express.js basics"],
          files: [
            {
              name: "server.js",
              filePath: "../DATABASE GUIDES/MONGODB/1. MongoDB Setup/server.js",
              description: "Express server with MongoDB connection",
              order: 1,
            },
            {
              name: ".env",
              filePath: "../DATABASE GUIDES/MONGODB/1. MongoDB Setup/.env.example",
              description: "Environment variables file",
              order: 2,
            },
          ],
          steps: [
            "Install MongoDB locally or use MongoDB Atlas (cloud)",
            "Install Mongoose: npm install mongoose",
            "Install dotenv: npm install dotenv",
            "Create .env file with connection string",
            "Connect to MongoDB in server.js",
          ],
          executionSteps: [
            "Sign up for MongoDB Atlas at mongodb.com (free tier)",
            "Create a cluster and get connection string",
            "Install: npm install mongoose dotenv",
            "Create .env file: MONGODB_URI=your_connection_string",
            "Add connection code to server.js",
            "Test connection: node server.js",
          ],
          expectedOutput: "Successfully connected to MongoDB database",
          order: 1,
        },
        {
          id: "mongoose-schema",
          title: "Step 2: Create Mongoose Schema and Model",
          description: "Define data structure using Mongoose schemas",
          learningObjectives: [
            "Create Mongoose schemas",
            "Define models",
            "Understand data types and validation",
          ],
          prerequisites: ["Completed Step 1"],
          files: [
            {
              name: "models/User.js",
              filePath: "../DATABASE GUIDES/MONGODB/2. Schema and Model/User.js",
              description: "User model with schema definition",
              order: 1,
            },
          ],
          steps: [
            "Create models folder",
            "Define schema with fields and types",
            "Add validation rules",
            "Export the model",
          ],
          executionSteps: [
            "Create models folder: mkdir models",
            "Create User.js with schema",
            "Define required fields, types, and validations",
            "Export: module.exports = mongoose.model('User', userSchema)",
          ],
          expectedOutput: "User model created and ready to use",
          order: 2,
        },
        {
          id: "crud-operations",
          title: "Step 3: CRUD Operations - Create, Read, Update, Delete",
          description: "Perform all database operations with Mongoose",
          learningObjectives: [
            "Create documents (save/create)",
            "Read documents (find/findOne)",
            "Update documents (updateOne/findByIdAndUpdate)",
            "Delete documents (deleteOne/findByIdAndDelete)",
          ],
          prerequisites: ["Completed Step 2"],
          files: [
            {
              name: "routes/users.js",
              filePath: "../DATABASE GUIDES/MONGODB/3. CRUD Operations/users.js",
              description: "Complete CRUD operations example",
              order: 1,
            },
          ],
          steps: [
            "Create POST route to create user",
            "Create GET route to read users",
            "Create PUT route to update user",
            "Create DELETE route to delete user",
          ],
          executionSteps: [
            "Create routes/users.js file",
            "Implement all CRUD operations",
            "Test with Postman or browser",
            "Verify data in MongoDB Atlas",
          ],
          expectedOutput: "All CRUD operations working correctly",
          order: 3,
        },
      ],
    },
    {
      id: "postgresql",
      title: "PostgreSQL with Node.js",
      description: "Learn to use PostgreSQL relational database",
      prerequisites: ["Express.js basics"],
      order: 2,
      examples: [
        {
          id: "postgres-setup",
          title: "Step 1: PostgreSQL Setup and Connection",
          description: "Set up PostgreSQL and connect using pg library",
          learningObjectives: [
            "Install PostgreSQL",
            "Connect to PostgreSQL database",
            "Use pg library for Node.js",
          ],
          prerequisites: ["Express.js basics"],
          files: [
            {
              name: "db.js",
              filePath: "../DATABASE GUIDES/POSTGRESQL/1. Setup/db.js",
              description: "PostgreSQL connection file",
              order: 1,
            },
          ],
          steps: [
            "Install PostgreSQL locally or use online service",
            "Install pg library: npm install pg",
            "Create database connection",
            "Test connection",
          ],
          executionSteps: [
            "Install PostgreSQL or use ElephantSQL (free)",
            "Create database",
            "Install: npm install pg",
            "Create db.js with connection",
            "Test connection",
          ],
          expectedOutput: "Successfully connected to PostgreSQL",
          order: 1,
        },
      ],
    },
  ],
};

