import { Category } from "./types";

export const nodejsCategory: Category = {
  id: "nodejs",
  title: "Node.js",
  description: "Server-side JavaScript with Node.js - Learn step by step",
  prerequisites: ["JavaScript fundamentals", "Command line basics"],
  icon: "🟢",
  order: 6,
  topics: [
    {
      id: "nodejs-basics",
      title: "Node.js Fundamentals",
      description: "Learn Node.js from basics to advanced",
      prerequisites: ["JavaScript basics"],
      order: 1,
      examples: [
        {
          id: "program-1",
          title: "Step 1: Your First Node.js Program",
          description: "Write and run your first Node.js program",
          learningObjectives: [
            "Understand Node.js basics",
            "Run JavaScript on server",
          ],
          prerequisites: ["Node.js installed"],
          files: [
            {
              name: "Program1.js",
              filePath: "lib/NODE JS EXAMPLES/Program1.js.txt",
              description: "Basic Node.js program with console.log",
              order: 1,
            },
          ],
          steps: [
            "Create a new file: Program1.js",
            "Write console.log statements",
            "Run using: node Program1.js",
          ],
          executionSteps: [
            "Copy code to Program1.js file",
            "Open terminal in file directory",
            "Run: node Program1.js",
            "Observe the output",
          ],
          expectedOutput: "Welcome messages printed in terminal",
          order: 1,
        },
        {
          id: "program-2",
          title: "Step 2: Node.js Modules",
          description: "Learn about Node.js modules and require",
          learningObjectives: [
            "Understand Node.js modules",
            "Use require() function",
          ],
          prerequisites: ["Completed Step 1"],
          files: [
            {
              name: "Program2.js",
              filePath: "lib/NODE JS EXAMPLES/Program2.js.txt",
              description: "Example using Node.js modules",
              order: 1,
            },
          ],
          steps: [
            "Study the module usage",
            "Understand require()",
            "Run the program",
          ],
          executionSteps: [
            "Copy code to Program2.js",
            "Run: node Program2.js",
            "Observe module behavior",
          ],
          expectedOutput: "Program runs using Node.js modules",
          order: 2,
        },
        {
          id: "program-3",
          title: "Step 3: Reading Files",
          description: "Learn to read files using fs module",
          learningObjectives: [
            "Use fs module",
            "Read files asynchronously",
          ],
          prerequisites: ["Completed Step 2"],
          files: [
            {
              name: "Program3.js",
              filePath: "lib/NODE JS EXAMPLES/Program3_file.js.txt",
              description: "File reading example",
              order: 1,
            },
          ],
          steps: [
            "Require fs module",
            "Use fs.readFile()",
            "Handle callback function",
          ],
          executionSteps: [
            "Create a test file: message1.txt",
            "Copy code to Program3.js",
            "Run: node Program3.js",
          ],
          expectedOutput: "File content displayed in terminal",
          order: 3,
        },
        {
          id: "program-4",
          title: "Step 4: Writing Files",
          description: "Learn to write/create files",
          learningObjectives: [
            "Write files using fs",
            "Create new files",
          ],
          prerequisites: ["Completed Step 3"],
          files: [
            {
              name: "Program4.js",
              filePath: "lib/NODE JS EXAMPLES/Program4_file.js.txt",
              description: "File writing example",
              order: 1,
            },
          ],
          steps: [
            "Use fs.writeFile()",
            "Provide content and filename",
            "Handle errors",
          ],
          executionSteps: [
            "Copy code to Program4.js",
            "Run: node Program4.js",
            "Check for output.txt file",
          ],
          expectedOutput: "New file created with content",
          order: 4,
        },
        {
          id: "program-5",
          title: "Step 5: Reading Files (Synchronous)",
          description: "Learn synchronous file operations",
          learningObjectives: [
            "Understand sync vs async",
            "Use readFileSync",
          ],
          prerequisites: ["Completed Step 4"],
          files: [
            {
              name: "Program5.js",
              filePath: "lib/NODE JS EXAMPLES/Program5_read.js.txt",
              description: "Synchronous file reading",
              order: 1,
            },
          ],
          steps: [
            "Use readFileSync instead of readFile",
            "Understand blocking nature",
            "Compare with async version",
          ],
          executionSteps: [
            "Copy code to Program5.js",
            "Run: node Program5.js",
            "Observe synchronous behavior",
          ],
          expectedOutput: "File read synchronously and displayed",
          order: 5,
        },
        {
          id: "program-6",
          title: "Step 6: HTTP Server",
          description: "Create a basic HTTP server",
          learningObjectives: [
            "Create HTTP servers",
            "Handle HTTP requests",
          ],
          prerequisites: ["Completed Step 5"],
          files: [
            {
              name: "Program6.js",
              filePath: "lib/NODE JS EXAMPLES/Program6_http.js.txt",
              description: "Basic HTTP server",
              order: 1,
            },
          ],
          steps: [
            "Require http module",
            "Create server with createServer()",
            "Listen on a port",
          ],
          executionSteps: [
            "Copy code to Program6.js",
            "Run: node Program6.js",
            "Open browser: [http://localhost:3000](http://localhost:3000)",
          ],
          expectedOutput: "Server running and responding to requests",
          order: 6,
        },
        {
          id: "program-7",
          title: "Step 7: Calculator",
          description: "Build a simple calculator",
          learningObjectives: [
            "Handle user input",
            "Process calculations",
          ],
          prerequisites: ["Completed Step 6"],
          files: [
            {
              name: "Program7.js",
              filePath: "lib/NODE JS EXAMPLES/Program7_Calc.js.txt",
              description: "Calculator program",
              order: 1,
            },
          ],
          steps: [
            "Use readline module",
            "Get user input",
            "Perform calculations",
          ],
          executionSteps: [
            "Copy code to Program7.js",
            "Run: node Program7.js",
            "Enter numbers when prompted",
          ],
          expectedOutput: "Calculator performs operations based on input",
          order: 7,
        },
        {
          id: "program-8",
          title: "Step 8: Timer/Interval",
          description: "Use setInterval in Node.js",
          learningObjectives: [
            "Use timers in Node.js",
            "Understand setInterval",
          ],
          prerequisites: ["Completed Step 7"],
          files: [
            {
              name: "Program8.js",
              filePath: "lib/NODE JS EXAMPLES/Program8_Timer.js.txt",
              description: "Timer example",
              order: 1,
            },
          ],
          steps: [
            "Use setInterval",
            "Execute code repeatedly",
            "Clear interval when needed",
          ],
          executionSteps: [
            "Copy code to Program8.js",
            "Run: node Program8.js",
            "Observe timer output",
          ],
          expectedOutput: "Timer runs and displays output at intervals",
          order: 8,
        },
        {
          id: "program-9",
          title: "Step 9: JSON Operations",
          description: "Work with JSON data",
          learningObjectives: [
            "Parse JSON",
            "Stringify objects",
          ],
          prerequisites: ["Completed Step 8"],
          files: [
            {
              name: "Program9.js",
              filePath: "lib/NODE JS EXAMPLES/Program9_JSON.js.txt",
              description: "JSON operations example",
              order: 1,
            },
          ],
          steps: [
            "Use JSON.parse()",
            "Use JSON.stringify()",
            "Work with JSON files",
          ],
          executionSteps: [
            "Copy code to Program9.js",
            "Run: node Program9.js",
            "Observe JSON operations",
          ],
          expectedOutput: "JSON data parsed and stringified correctly",
          order: 9,
        },
      ],
    },
  ],
};

