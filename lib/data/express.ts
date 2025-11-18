import { Category } from "./types";

export const expressCategory: Category = {
  id: "express",
  title: "Express.js",
  description: "Web framework for Node.js - Build web servers step by step",
  prerequisites: ["Node.js basics", "HTTP concepts"],
  icon: "🚀",
  order: 7,
  topics: [
    {
      id: "express-basics",
      title: "Express.js Fundamentals",
      description: "Learn Express.js from basics",
      prerequisites: ["Node.js installed"],
      order: 1,
      examples: [
        {
          id: "program-1",
          title: "Step 1: Basic Express Server",
          description: "Create your first Express.js server",
          learningObjectives: [
            "Install Express",
            "Create basic server",
            "Handle routes",
          ],
          prerequisites: ["Node.js installed"],
          files: [
            {
              name: "server.js",
              filePath: "../EXPRESS JS EXAMPLES/EXPRESS JS EXAMPLES/Program1_Basic.js.txt",
              description: "Basic Express server setup",
              order: 1,
            },
          ],
          steps: [
            "Install Express: npm install express",
            "Require express module",
            "Create app instance",
            "Set up route handler",
            "Listen on port",
          ],
          executionSteps: [
            "Run: npm install express",
            "Copy code to server.js",
            "Run: node server.js",
            "Open: http://localhost:3000",
          ],
          expectedOutput: "Server running and 'Hello from Express.js!' displayed",
          order: 1,
        },
        {
          id: "program-2",
          title: "Step 2: GET and POST Routes",
          description: "Handle GET and POST requests",
          learningObjectives: [
            "Create GET routes",
            "Create POST routes",
            "Handle different HTTP methods",
          ],
          prerequisites: ["Completed Step 1"],
          files: [
            {
              name: "server.js",
              filePath: "../EXPRESS JS EXAMPLES/EXPRESS JS EXAMPLES/Program2_GETPOST.js.txt",
              description: "GET and POST route handlers",
              order: 1,
            },
          ],
          steps: [
            "Add app.get() route",
            "Add app.post() route",
            "Test both routes",
          ],
          executionSteps: [
            "Copy code to server.js",
            "Run: node server.js",
            "Test GET: http://localhost:3000",
            "Test POST using Postman or curl",
          ],
          expectedOutput: "Both GET and POST routes work correctly",
          order: 2,
        },
        {
          id: "program-3",
          title: "Step 3: Form Handling",
          description: "Handle form submissions",
          learningObjectives: [
            "Process form data",
            "Use body-parser middleware",
          ],
          prerequisites: ["Completed Step 2"],
          files: [
            {
              name: "server.js",
              filePath: "../EXPRESS JS EXAMPLES/EXPRESS JS EXAMPLES/Program3_GETPOST.js.txt",
              description: "Server handling form data",
              order: 1,
            },
            {
              name: "form.html",
              filePath: "../EXPRESS JS EXAMPLES/EXPRESS JS EXAMPLES/Program3_FORM.HTML.txt",
              description: "HTML form for testing",
              order: 2,
            },
          ],
          steps: [
            "Install body-parser: npm install body-parser",
            "Set up middleware",
            "Create form HTML",
            "Handle POST with form data",
          ],
          executionSteps: [
            "Run: npm install body-parser",
            "Copy server code",
            "Create form.html with provided code",
            "Run server and test form submission",
          ],
          expectedOutput: "Form data received and processed by server",
          order: 3,
        },
        {
          id: "program-4",
          title: "Step 4: URL Parameters",
          description: "Extract parameters from URLs",
          learningObjectives: [
            "Use route parameters",
            "Access req.params",
          ],
          prerequisites: ["Completed Step 3"],
          files: [
            {
              name: "server.js",
              filePath: "../EXPRESS JS EXAMPLES/EXPRESS JS EXAMPLES/Program4_URlParam.js.txt",
              description: "Server with URL parameters",
              order: 1,
            },
          ],
          steps: [
            "Define parameterized routes",
            "Access parameters with req.params",
            "Use parameters in response",
          ],
          executionSteps: [
            "Copy code to server.js",
            "Run: node server.js",
            "Visit: http://localhost:3000/user/123",
          ],
          expectedOutput: "User ID extracted from URL and displayed",
          order: 4,
        },
        {
          id: "program-5",
          title: "Step 5: Query Strings",
          description: "Handle query string parameters",
          learningObjectives: [
            "Access query parameters",
            "Use req.query",
          ],
          prerequisites: ["Completed Step 4"],
          files: [
            {
              name: "server.js",
              filePath: "../EXPRESS JS EXAMPLES/EXPRESS JS EXAMPLES/Program5_QueryString.js.txt",
              description: "Server handling query strings",
              order: 1,
            },
          ],
          steps: [
            "Access query with req.query",
            "Handle multiple query parameters",
            "Test with different queries",
          ],
          executionSteps: [
            "Copy code to server.js",
            "Run: node server.js",
            "Visit: http://localhost:3000/search?q=nodejs&page=1",
          ],
          expectedOutput: "Query parameters extracted and displayed",
          order: 5,
        },
        {
          id: "program-6",
          title: "Step 6: Static Files",
          description: "Serve static files (HTML, CSS, images)",
          learningObjectives: [
            "Serve static files",
            "Use express.static middleware",
          ],
          prerequisites: ["Completed Step 5"],
          files: [
            {
              name: "server.js",
              filePath: "../EXPRESS JS EXAMPLES/EXPRESS JS EXAMPLES/program6_StaticPage.js.txt",
              description: "Server serving static files",
              order: 1,
            },
          ],
          steps: [
            "Create public folder",
            "Add static files",
            "Use express.static()",
          ],
          executionSteps: [
            "Create 'public' folder",
            "Add HTML/CSS files to public",
            "Copy server code",
            "Run: node server.js",
            "Access files via browser",
          ],
          expectedOutput: "Static files served and accessible",
          order: 6,
        },
      ],
    },
  ],
};

