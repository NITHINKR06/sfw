import { Category } from "./types";

export const fullstackProjectsCategory: Category = {
  id: "fullstack-projects",
  title: "Full-Stack Projects",
  description: "Build complete full-stack applications from scratch",
  prerequisites: ["React.js", "Express.js", "Database basics"],
  icon: "🌐",
  order: 9,
  topics: [
    {
      id: "todo-app",
      title: "Todo App - Full Stack",
      description: "Build a complete todo application with React frontend and Express backend",
      prerequisites: ["React basics", "Express basics", "MongoDB basics"],
      order: 1,
      examples: [
        {
          id: "todo-backend",
          title: "Step 1: Build Todo Backend API",
          description: "Create Express API with MongoDB for todos",
          learningObjectives: [
            "Create RESTful API",
            "Connect React to Express",
            "Handle CORS",
          ],
          prerequisites: ["Express basics", "MongoDB basics"],
          files: [
            {
              name: "server.js",
              filePath: "lib/FULLSTACK PROJECTS/TODO APP/backend/server.js",
              description: "Express server for todo API",
              order: 1,
            },
            {
              name: "models/Todo.js",
              filePath: "lib/FULLSTACK PROJECTS/TODO APP/backend/models/Todo.js",
              description: "Todo model",
              order: 2,
            },
          ],
          steps: [
            "Create Express server",
            "Set up MongoDB connection",
            "Create Todo model",
            "Create CRUD routes",
            "Add CORS middleware",
          ],
          executionSteps: [
            "Create backend folder",
            "Initialize: npm init -y",
            "Install: npm install express mongoose cors dotenv",
            "Create server.js and Todo model",
            "Create routes for GET, POST, PUT, DELETE",
            "Test API with Postman",
          ],
          expectedOutput: "Backend API running on [http://localhost:5000](http://localhost:5000)",
          order: 1,
        },
        {
          id: "todo-frontend",
          title: "Step 2: Build Todo Frontend",
          description: "Create React frontend that connects to backend",
          learningObjectives: [
            "Fetch data from API",
            "Create, update, delete todos",
            "Handle loading and error states",
          ],
          prerequisites: ["Completed Step 1", "React basics"],
          files: [
            {
              name: "App.jsx",
              filePath: "lib/FULLSTACK PROJECTS/TODO APP/frontend/App.jsx",
              description: "Main React component",
              order: 1,
            },
            {
              name: "components/TodoList.jsx",
              filePath: "lib/FULLSTACK PROJECTS/TODO APP/frontend/components/TodoList.jsx",
              description: "Todo list component",
              order: 2,
            },
          ],
          steps: [
            "Create React app",
            "Create components",
            "Use fetch API to connect to backend",
            "Implement CRUD operations in UI",
          ],
          executionSteps: [
            "Create React app: npm create vite@latest todo-frontend",
            "Create components folder",
            "Install axios: npm install axios",
            "Create TodoList and TodoForm components",
            "Connect to backend API",
          ],
          expectedOutput: "Full-stack todo app working with frontend and backend",
          order: 2,
        },
      ],
    },
  ],
};

