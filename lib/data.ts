// Enhanced data structure with step-by-step instructions
export interface CodeFile {
  name: string;
  filePath: string;
  description?: string;
  order: number;
}

export interface CodeExample {
  id: string;
  title: string;
  description?: string;
  learningObjectives?: string[];
  prerequisites?: string[];
  files: CodeFile[];
  steps?: string[];
  executionSteps?: string[];
  expectedOutput?: string;
  order: number;
}

export interface Topic {
  id: string;
  title: string;
  description?: string;
  prerequisites?: string[];
  examples: CodeExample[];
  order: number;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  prerequisites?: string[];
  topics: Topic[];
  order: number;
}

export const categories: Category[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Set up your development environment and learn the fundamentals",
    icon: "🚀",
    prerequisites: [],
    order: 0,
    topics: [
      {
        id: "setup",
        title: "Development Environment Setup",
        description: "Install and configure all necessary tools for web development",
        prerequisites: [],
        order: 1,
        examples: [
          {
            id: "install-nodejs",
            title: "Step 1: Install Node.js and npm",
            description: "Set up Node.js and npm package manager on your computer",
            learningObjectives: [
              "Download and install Node.js",
              "Verify installation",
              "Understand npm (Node Package Manager)",
            ],
            prerequisites: [],
            files: [
              {
                name: "README.md",
                filePath: "../DEPLOYMENT GUIDES/GETTING STARTED/1. Install Node.js.txt",
                description: "Step-by-step guide to install Node.js",
                order: 1,
              },
            ],
            steps: [
              "Visit nodejs.org and download LTS version",
              "Run the installer and follow instructions",
              "Open terminal/command prompt",
              "Verify installation: node --version and npm --version",
            ],
            executionSteps: [
              "Download Node.js from nodejs.org",
              "Install Node.js (includes npm automatically)",
              "Open terminal: node --version",
              "Check npm: npm --version",
            ],
            expectedOutput: "Node.js and npm versions displayed in terminal",
            order: 1,
          },
          {
            id: "install-git",
            title: "Step 2: Install Git and GitHub Account",
            description: "Set up Git for version control and create GitHub account",
            learningObjectives: [
              "Install Git",
              "Create GitHub account",
              "Configure Git with your credentials",
            ],
            prerequisites: ["Completed Step 1"],
            files: [
              {
                name: "README.md",
                filePath: "../DEPLOYMENT GUIDES/GETTING STARTED/2. Install Git.txt",
                description: "Guide to install Git and set up GitHub",
                order: 1,
              },
            ],
            steps: [
              "Download Git from git-scm.com",
              "Install Git",
              "Create GitHub account at github.com",
              "Configure Git: git config --global user.name and user.email",
            ],
            executionSteps: [
              "Download and install Git",
              "Create GitHub account",
              "Configure Git: git config --global user.name 'Your Name'",
              "Set email: git config --global user.email 'your.email@example.com'",
              "Verify: git --version",
            ],
            expectedOutput: "Git installed and configured with your credentials",
            order: 2,
          },
          {
            id: "install-vscode",
            title: "Step 3: Install VS Code Editor",
            description: "Set up Visual Studio Code with useful extensions",
            learningObjectives: [
              "Install VS Code",
              "Install essential extensions",
              "Configure VS Code for web development",
            ],
            prerequisites: ["Completed Step 2"],
            files: [
              {
                name: "README.md",
                filePath: "../DEPLOYMENT GUIDES/GETTING STARTED/3. Install VS Code.txt",
                description: "Guide to install and configure VS Code",
                order: 1,
              },
            ],
            steps: [
              "Download VS Code from code.visualstudio.com",
              "Install VS Code",
              "Install extensions: ESLint, Prettier, Live Server, GitLens",
              "Configure settings for your preference",
            ],
            executionSteps: [
              "Download and install VS Code",
              "Open Extensions panel (Ctrl+Shift+X)",
              "Install: ESLint, Prettier, Live Server, GitLens",
              "Restart VS Code",
            ],
            expectedOutput: "VS Code installed with essential extensions",
            order: 3,
          },
        ],
      },
    ],
  },
  {
    id: "html",
    title: "HTML Fundamentals",
    description: "Master HTML5 from scratch - structure, elements, and semantic markup",
    prerequisites: [],
    icon: "📄",
    order: 1,
    topics: [
      {
        id: "html-examples",
        title: "HTML5 Examples",
        description: "Learn HTML5 from basics to advanced",
        prerequisites: ["Text editor"],
        order: 1,
        examples: Array.from({ length: 19 }, (_, i) => ({
          id: `ex${i + 1}`,
          title: `Step ${i + 1}: HTML Example ${i + 1}`,
          description: `Learn HTML5 concepts with example ${i + 1}`,
          learningObjectives: [
            "Understand HTML5 structure",
            "Learn HTML5 elements",
          ],
          prerequisites: i === 0 ? ["Text editor"] : [`Completed Step ${i}`],
          files: [
            {
              name: `EX${i + 1}.HTML`,
              filePath: `../HTML EXAMPLES UPLOADED/HTML EXAMPLES UPLOADED/EX${i + 1}.HTML`,
              description: `HTML5 example ${i + 1}`,
              order: 1,
            },
          ],
          steps: [
            "Copy the HTML code",
            "Save as .html file",
            "Open in web browser",
          ],
          executionSteps: [
            "Copy code to a new file",
            "Save as EX" + (i + 1) + ".html",
            "Double-click to open in browser",
            "Observe the output",
          ],
          expectedOutput: "HTML page displays correctly in browser",
          order: i + 1,
        })),
      },
    ],
  },
  {
    id: "css",
    title: "CSS Fundamentals",
    description: "Learn CSS styling, layouts, and responsive design from basics",
    prerequisites: ["HTML basics"],
    icon: "🎨",
    order: 2,
    topics: [
      {
        id: "css-basics",
        title: "CSS Basics",
        description: "Learn CSS fundamentals: selectors, properties, and styling",
        prerequisites: ["HTML basics"],
        order: 1,
        examples: [
          {
            id: "css-intro",
            title: "Step 1: CSS Introduction and Syntax",
            description: "Learn what CSS is and how to write CSS code",
            learningObjectives: [
              "Understand what CSS is",
              "Learn CSS syntax",
              "Link CSS to HTML",
            ],
            prerequisites: ["HTML basics"],
            files: [
              {
                name: "styles.css",
                filePath: "../CSS EXAMPLES/1. CSS Introduction/styles.css",
                description: "Basic CSS file with syntax examples",
                order: 1,
              },
              {
                name: "index.html",
                filePath: "../CSS EXAMPLES/1. CSS Introduction/index.html",
                description: "HTML file linked to CSS",
                order: 2,
              },
            ],
            steps: [
              "Create a CSS file (styles.css)",
              "Learn CSS syntax: selector { property: value; }",
              "Link CSS to HTML using <link> tag",
              "Write your first CSS rule",
            ],
            executionSteps: [
              "Create styles.css file",
              "Link it in HTML: <link rel='stylesheet' href='styles.css'>",
              "Write: body { color: blue; }",
              "Open HTML in browser",
            ],
            expectedOutput: "HTML page styled with blue text",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Fundamentals",
    description: "Master JavaScript from basics to advanced concepts",
    prerequisites: ["HTML basics"],
    icon: "📜",
    order: 3,
    topics: [
      {
        id: "js-examples",
        title: "JavaScript Examples",
        description: "Learn JavaScript from basics to advanced",
        prerequisites: ["HTML basics"],
        order: 1,
        examples: Array.from({ length: 15 }, (_, i) => ({
          id: `ex${i + 1}`,
          title: `Step ${i + 1}: JavaScript Example ${i + 1}`,
          description: `Learn JavaScript concepts with example ${i + 1}`,
          learningObjectives: [
            "Understand JavaScript syntax",
            "Learn JavaScript features",
          ],
          prerequisites: i === 0 ? ["HTML basics"] : [`Completed Step ${i}`],
          files: [
            {
              name: `ex${i + 1}.html`,
              filePath: `../JAVASCRIPT EXAMPLES/JAVASCRIPT EXAMPLES/ex${i + 1}.html`,
              description: `JavaScript example ${i + 1}`,
              order: 1,
            },
          ],
          steps: [
            "Copy the HTML with JavaScript code",
            "Save as .html file",
            "Open in web browser",
          ],
          executionSteps: [
            "Copy code to a new file",
            "Save as ex" + (i + 1) + ".html",
            "Open in browser",
            "Interact with the page",
          ],
          expectedOutput: "JavaScript functionality works in browser",
          order: i + 1,
        })),
      },
    ],
  },
  {
    id: "react",
    title: "React.js",
    description: "Build modern web applications with React - from basics to advanced",
    prerequisites: ["JavaScript fundamentals", "HTML & CSS basics"],
    icon: "⚛️",
    order: 4,
    topics: [
      {
        id: "conditional-rendering",
        title: "Conditional Rendering",
        description: "Learn how to conditionally render components based on state",
        prerequisites: ["React basics", "useState hook"],
        order: 1,
        examples: [
          {
            id: "simple-if",
            title: "Step 1: Simple If Statement",
            description: "Learn the basic if statement for conditional rendering",
            learningObjectives: [
              "Understand how to use if statements in JSX",
              "Learn to conditionally show/hide content",
            ],
            prerequisites: ["React component basics"],
            files: [
              {
                name: "App.jsx",
                filePath: "../5. Conditional Rendering in React/5. Conditional Rendering in React/1. SIMPLE IF.txt",
                description: "Main component with conditional rendering using if statement",
                order: 1,
              },
            ],
            steps: [
              "Create a new React component file (App.jsx)",
              "Import useState from React",
              "Create a state variable (e.g., isLoggedIn)",
              "Use an if statement to conditionally render content",
              "Add a button to toggle the state",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Make sure you have React installed: npm install react react-dom",
              "Run your development server: npm run dev",
              "Click the toggle button to see conditional rendering in action",
            ],
            expectedOutput: "You should see either 'Welcome back!' or 'Please log in.' based on the button click",
            order: 1,
          },
          {
            id: "ternary-operator",
            title: "Step 2: Ternary Operator",
            description: "Use the ternary operator for inline conditional rendering",
            learningObjectives: [
              "Learn the ternary operator syntax in JSX",
              "Understand when to use ternary vs if statements",
            ],
            prerequisites: ["Completed Step 1: Simple If Statement"],
            files: [
              {
                name: "App.jsx",
                filePath: "../5. Conditional Rendering in React/5. Conditional Rendering in React/2. TERNARY OPERATOR.txt",
                description: "Component using ternary operator for conditional rendering",
                order: 1,
              },
            ],
            steps: [
              "Replace if statement with ternary operator (? :)",
              "Use inline conditional rendering in JSX",
              "Test with different state values",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Observe how ternary operator works inline",
            ],
            expectedOutput: "Content changes based on state using inline ternary operator",
            order: 2,
          },
          {
            id: "logical-and",
            title: "Step 3: Logical AND Operator",
            description: "Use && operator for conditional rendering",
            learningObjectives: [
              "Understand the && operator for conditional rendering",
              "Learn when to use && vs ternary",
            ],
            prerequisites: ["Completed Step 2: Ternary Operator"],
            files: [
              {
                name: "App.jsx",
                filePath: "../5. Conditional Rendering in React/5. Conditional Rendering in React/3 LOGICAL AND.txt",
                description: "Component using logical AND operator",
                order: 1,
              },
            ],
            steps: [
              "Use && operator to conditionally render",
              "Understand short-circuit evaluation",
              "Practice with different conditions",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Test the logical AND behavior",
            ],
            expectedOutput: "Content appears only when condition is true",
            order: 3,
          },
          {
            id: "all-together",
            title: "Step 4: Putting All Together",
            description: "Combine all conditional rendering techniques",
            learningObjectives: [
              "Combine multiple conditional rendering techniques",
              "Build a complete example using all methods",
            ],
            prerequisites: ["Completed Steps 1-3"],
            files: [
              {
                name: "App.jsx",
                filePath: "../5. Conditional Rendering in React/5. Conditional Rendering in React/4 PUTTING ALL TOGETHER.txt",
                description: "Complete example combining all conditional rendering methods",
                order: 1,
              },
            ],
            steps: [
              "Review all previous examples",
              "Combine if, ternary, and && operators",
              "Create a comprehensive example",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Test all conditional rendering scenarios",
            ],
            expectedOutput: "A complete application demonstrating all conditional rendering techniques",
            order: 4,
          },
        ],
      },
      {
        id: "lists-keys",
        title: "Lists and Keys",
        description: "Rendering lists and using keys in React",
        prerequisites: ["Conditional Rendering", "Array methods in JavaScript"],
        order: 2,
        examples: [
          {
            id: "example-1",
            title: "Step 1: Basic List Rendering",
            description: "Learn to render arrays of data",
            learningObjectives: [
              "Understand how to map over arrays in React",
              "Learn the importance of keys",
            ],
            prerequisites: ["React component basics"],
            files: [
              {
                name: "App.jsx",
                filePath: "../6 LISTS AND KEYS IN REACT/6 LISTS AND KEYS IN REACT/1. EXAMPLE 1.txt",
                description: "Basic list rendering example",
                order: 1,
              },
            ],
            steps: [
              "Create an array of data",
              "Use map() to render list items",
              "Add unique keys to each item",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Observe the rendered list",
            ],
            expectedOutput: "A list of items rendered on the screen",
            order: 1,
          },
          {
            id: "todo-list",
            title: "Step 2: Todo List Example",
            description: "Build a complete todo list application",
            learningObjectives: [
              "Create interactive lists",
              "Handle list item operations (add, remove)",
            ],
            prerequisites: ["Completed Step 1: Basic List Rendering"],
            files: [
              {
                name: "App.jsx",
                filePath: "../6 LISTS AND KEYS IN REACT/6 LISTS AND KEYS IN REACT/2. TO DO LIST EXAMPLE.txt",
                description: "Complete todo list application",
                order: 1,
              },
            ],
            steps: [
              "Set up state for todo items",
              "Create add and remove functionality",
              "Render list with proper keys",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Add and remove todo items to test",
            ],
            expectedOutput: "A functional todo list where you can add and remove items",
            order: 2,
          },
        ],
      },
      {
        id: "useeffect",
        title: "useEffect Hook",
        description: "Understanding useEffect for side effects",
        prerequisites: ["React State (useState)", "JavaScript functions"],
        order: 3,
        examples: [
          {
            id: "program-1",
            title: "Step 1: Basic useEffect",
            description: "Learn the fundamentals of useEffect hook",
            learningObjectives: [
              "Understand what useEffect does",
              "Learn when useEffect runs",
            ],
            prerequisites: ["React useState hook"],
            files: [
              {
                name: "App.jsx",
                filePath: "../7. UseEffect in React JS/7. UseEffect in React JS/1. PROGRAM 1.txt",
                description: "Basic useEffect example that runs on every render",
                order: 1,
              },
            ],
            steps: [
              "Import useEffect from React",
              "Add useEffect hook to your component",
              "Add console.log to see when it runs",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Open browser console to see useEffect logs",
              "Click the button and observe console output",
            ],
            expectedOutput: "Console logs showing useEffect runs on every render",
            order: 1,
          },
          {
            id: "program-2",
            title: "Step 2: Run Only Once (Mount)",
            description: "Learn to run useEffect only when component mounts",
            learningObjectives: [
              "Understand empty dependency array",
              "Learn component lifecycle",
            ],
            prerequisites: ["Completed Step 1: Basic useEffect"],
            files: [
              {
                name: "App.jsx",
                filePath: "../7. UseEffect in React JS/7. UseEffect in React JS/2. PROGRAM 2 RUN ONLY ONCE.txt",
                description: "useEffect with empty dependency array",
                order: 1,
              },
            ],
            steps: [
              "Add empty dependency array [] to useEffect",
              "Observe it runs only once on mount",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Check console - should log only once",
            ],
            expectedOutput: "Console log appears only once when component first mounts",
            order: 2,
          },
          {
            id: "program-3",
            title: "Step 3: Run Only Once (Alternative)",
            description: "Another example of useEffect running once",
            learningObjectives: [
              "Reinforce empty dependency array concept",
              "See different use cases",
            ],
            prerequisites: ["Completed Step 2"],
            files: [
              {
                name: "App.jsx",
                filePath: "../7. UseEffect in React JS/7. UseEffect in React JS/3. PROGRAM 3 RUN ONLY ONCE.txt",
                description: "Alternative example of useEffect running once",
                order: 1,
              },
            ],
            steps: [
              "Study this alternative example",
              "Compare with previous example",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Observe the behavior",
            ],
            expectedOutput: "useEffect runs only once on component mount",
            order: 3,
          },
          {
            id: "program-4",
            title: "Step 4: useEffect with Dependencies",
            description: "Learn to run useEffect when specific values change",
            learningObjectives: [
              "Understand dependency arrays",
              "Learn to control when useEffect runs",
            ],
            prerequisites: ["Completed Steps 1-3"],
            files: [
              {
                name: "App.jsx",
                filePath: "../7. UseEffect in React JS/7. UseEffect in React JS/4. PROGRAM 4 USEEFFECT WITH DEPENDENCIES.txt",
                description: "useEffect with dependency array",
                order: 1,
              },
            ],
            steps: [
              "Add dependencies to useEffect",
              "Observe when it runs based on dependencies",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Change the dependency value and watch console",
            ],
            expectedOutput: "useEffect runs when dependency values change",
            order: 4,
          },
          {
            id: "program-5",
            title: "Step 5: Fetching Data",
            description: "Use useEffect to fetch data from APIs",
            learningObjectives: [
              "Learn async operations in useEffect",
              "Understand data fetching patterns",
            ],
            prerequisites: ["Completed Step 4", "Basic fetch API knowledge"],
            files: [
              {
                name: "App.jsx",
                filePath: "../7. UseEffect in React JS/7. UseEffect in React JS/5. PROGRAM 5 USEEFFECT FETCHING DATA.txt",
                description: "Data fetching example with useEffect",
                order: 1,
              },
            ],
            steps: [
              "Set up state for data",
              "Use fetch inside useEffect",
              "Handle loading and error states",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Observe data fetching on component mount",
            ],
            expectedOutput: "Data fetched and displayed when component loads",
            order: 5,
          },
          {
            id: "program-6",
            title: "Step 6: Timer Example",
            description: "Create a timer using useEffect",
            learningObjectives: [
              "Learn setInterval in useEffect",
              "Understand cleanup functions",
            ],
            prerequisites: ["Completed Step 5"],
            files: [
              {
                name: "App.jsx",
                filePath: "../7. UseEffect in React JS/7. UseEffect in React JS/6. PROGRAM 6 USEEFFECT TIMER.txt",
                description: "Timer implementation with useEffect",
                order: 1,
              },
            ],
            steps: [
              "Set up timer with setInterval",
              "Add cleanup function to clear interval",
              "Test timer functionality",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Watch the timer count",
            ],
            expectedOutput: "A working timer that counts up",
            order: 6,
          },
          {
            id: "program-7",
            title: "Step 7: Cleanup Event Listener",
            description: "Learn to clean up event listeners in useEffect",
            learningObjectives: [
              "Understand cleanup functions",
              "Prevent memory leaks",
            ],
            prerequisites: ["Completed Step 6"],
            files: [
              {
                name: "App.jsx",
                filePath: "../7. UseEffect in React JS/7. UseEffect in React JS/7. PROGRAM 7 CLEANUP EVENT LISTENER.txt",
                description: "Event listener with cleanup example",
                order: 1,
              },
            ],
            steps: [
              "Add event listener in useEffect",
              "Return cleanup function",
              "Remove event listener on unmount",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Test event listener and cleanup",
            ],
            expectedOutput: "Event listener works and cleans up properly",
            order: 7,
          },
        ],
      },
      {
        id: "useref",
        title: "useRef Hook",
        description: "Using useRef to access DOM and store values",
        prerequisites: ["React useState", "DOM basics"],
        order: 4,
        examples: [
          {
            id: "useref-counter",
            title: "Step 1: useRef Counter",
            description: "Learn basic useRef usage",
            learningObjectives: [
              "Understand useRef hook",
              "Learn when to use useRef vs useState",
            ],
            prerequisites: ["React useState hook"],
            files: [
              {
                name: "App.jsx",
                filePath: "../8. Useref Hook in React JS/8. Useref Hook in React JS/1. PROGRAM 1 USEREF COUNTER.txt",
                description: "Basic useRef counter example",
                order: 1,
              },
            ],
            steps: [
              "Import useRef from React",
              "Create a ref using useRef()",
              "Use ref to store values without re-rendering",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Click buttons and observe behavior",
            ],
            expectedOutput: "Counter that doesn't cause re-renders",
            order: 1,
          },
          {
            id: "access-dom",
            title: "Step 2: Access DOM Elements",
            description: "Use useRef to directly access DOM elements",
            learningObjectives: [
              "Learn to access DOM elements",
              "Understand ref.current",
            ],
            prerequisites: ["Completed Step 1"],
            files: [
              {
                name: "App.jsx",
                filePath: "../8. Useref Hook in React JS/8. Useref Hook in React JS/2. PROGRAM 2 ACCESS DOM.txt",
                description: "DOM access using useRef",
                order: 1,
              },
            ],
            steps: [
              "Create ref and attach to element",
              "Access element using ref.current",
              "Manipulate DOM directly",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Test DOM manipulation",
            ],
            expectedOutput: "Ability to access and manipulate DOM elements",
            order: 2,
          },
          {
            id: "state-change",
            title: "Step 3: State Change Tracking",
            description: "Track previous state values with useRef",
            learningObjectives: [
              "Learn to track previous values",
              "Understand useRef for persistence",
            ],
            prerequisites: ["Completed Step 2"],
            files: [
              {
                name: "App.jsx",
                filePath: "../8. Useref Hook in React JS/8. Useref Hook in React JS/3. PROGRAM 3 STATE CHANGE.txt",
                description: "Tracking state changes with useRef",
                order: 1,
              },
            ],
            steps: [
              "Use useRef to store previous value",
              "Update ref when state changes",
              "Compare current and previous values",
            ],
            executionSteps: [
              "Copy the code to your App.jsx file",
              "Run: npm run dev",
              "Change state and observe tracking",
            ],
            expectedOutput: "Previous state values are tracked and displayed",
            order: 3,
          },
        ],
      },
      {
        id: "routing",
        title: "React Routing",
        description: "Navigation and routing in React applications",
        prerequisites: ["React components", "npm basics"],
        order: 5,
        examples: [
          {
            id: "routing-1",
            title: "Step 1: Basic Routing Setup",
            description: "Set up React Router and create basic routes",
            learningObjectives: [
              "Install and set up React Router",
              "Create multiple routes",
              "Navigate between pages",
            ],
            prerequisites: ["React components", "npm installed"],
            files: [
              {
                name: "App.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 1/APP.JSX.txt",
                description: "Main App component with routing setup",
                order: 1,
              },
              {
                name: "Home.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 1/Home.jsx.txt",
                description: "Home page component",
                order: 2,
              },
              {
                name: "About.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 1/About.jsx.txt",
                description: "About page component",
                order: 3,
              },
              {
                name: "Contact.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 1/Contact.jsx.txt",
                description: "Contact page component",
                order: 4,
              },
            ],
            steps: [
              "Install React Router: npm install react-router-dom",
              "Create Home.jsx, About.jsx, Contact.jsx components",
              "Set up BrowserRouter in App.jsx",
              "Create Route components for each page",
              "Add Link components for navigation",
            ],
            executionSteps: [
              "Run: npm install react-router-dom",
              "Create the component files (Home, About, Contact)",
              "Copy App.jsx code to your App.jsx",
              "Copy each component code to respective files",
              "Run: npm run dev",
              "Click navigation links to test routing",
            ],
            expectedOutput: "Navigation between Home, About, and Contact pages works",
            order: 1,
          },
          {
            id: "routing-2",
            title: "Step 2: 404 Not Found Page",
            description: "Add a catch-all route for invalid URLs",
            learningObjectives: [
              "Create 404/Not Found pages",
              "Use wildcard routes",
            ],
            prerequisites: ["Completed Step 1: Basic Routing"],
            files: [
              {
                name: "App.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 2 NOT FOUND/APP.JSX.txt",
                description: "App with 404 route",
                order: 1,
              },
              {
                name: "NotFound.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 2 NOT FOUND/NotFound.jsx.txt",
                description: "404 Not Found component",
                order: 2,
              },
              {
                name: "Home.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 2 NOT FOUND/Home.jsx.txt",
                description: "Home component",
                order: 3,
              },
              {
                name: "About.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 2 NOT FOUND/About.jsx.txt",
                description: "About component",
                order: 4,
              },
              {
                name: "Contact.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 2 NOT FOUND/Contact.jsx.txt",
                description: "Contact component",
                order: 5,
              },
            ],
            steps: [
              "Create NotFound.jsx component",
              "Add wildcard route (*) at the end",
              "Test with invalid URLs",
            ],
            executionSteps: [
              "Create NotFound.jsx file",
              "Copy all component codes",
              "Run: npm run dev",
              "Navigate to invalid URL (e.g., /random)",
            ],
            expectedOutput: "404 page shows for invalid routes",
            order: 2,
          },
          {
            id: "routing-3",
            title: "Step 3: Nested Routing",
            description: "Create nested routes with parent and child components",
            learningObjectives: [
              "Understand nested routes",
              "Use Outlet component",
              "Create route hierarchies",
            ],
            prerequisites: ["Completed Step 2"],
            files: [
              {
                name: "App.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 3 NESTED ROUTING/App.jsx.txt",
                description: "App with nested routes",
                order: 1,
              },
              {
                name: "About.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 3 NESTED ROUTING/About.jsx.txt",
                description: "Parent route with Outlet",
                order: 2,
              },
              {
                name: "Team.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 3 NESTED ROUTING/Team.jsx.txt",
                description: "Nested child route",
                order: 3,
              },
              {
                name: "Company.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 3 NESTED ROUTING/Company.jsx.txt",
                description: "Nested child route",
                order: 4,
              },
              {
                name: "Home.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 3 NESTED ROUTING/Home.jsx.txt",
                description: "Home component",
                order: 5,
              },
            ],
            steps: [
              "Set up parent route with nested children",
              "Use Outlet in parent component",
              "Create nested Route components",
            ],
            executionSteps: [
              "Copy all component files",
              "Run: npm run dev",
              "Navigate to /about/team and /about/company",
            ],
            expectedOutput: "Nested routes work with parent and child components",
            order: 3,
          },
          {
            id: "routing-4",
            title: "Step 4: URL Parameters",
            description: "Pass and use parameters in routes",
            learningObjectives: [
              "Use route parameters",
              "Extract params with useParams",
            ],
            prerequisites: ["Completed Step 3"],
            files: [
              {
                name: "App.jsx",
                filePath: "../9. REACT ROUTING/9. REACT ROUTING/PROGRAM 4 PARAMETER PASSING/App.jsx.txt",
                description: "App with parameterized routes",
                order: 1,
              },
            ],
            steps: [
              "Add :parameter to route path",
              "Use useParams to extract parameter",
              "Display parameter in component",
            ],
            executionSteps: [
              "Copy the code to App.jsx",
              "Run: npm run dev",
              "Click different user links",
            ],
            expectedOutput: "Different user IDs displayed based on URL",
            order: 4,
          },
        ],
      },
      {
        id: "react-forms-tailwind",
        title: "React Forms with Tailwind CSS",
        description: "Beautiful form components built with React and Tailwind CSS",
        prerequisites: ["React basics", "Tailwind CSS installed"],
        order: 6,
        examples: [
          {
            id: "signup-form",
            title: "Step 1: Sign Up Form",
            description: "Create a beautiful sign-up form with Tailwind CSS",
            learningObjectives: [
              "Style forms with Tailwind CSS",
              "Create responsive form layouts",
            ],
            prerequisites: ["Tailwind CSS installed", "React basics"],
            files: [
              {
                name: "App.jsx",
                filePath: "../New Text Document.txt",
                description: "Sign up form component with Tailwind styling",
                order: 1,
              },
            ],
            steps: [
              "Ensure Tailwind CSS is installed and configured",
              "Copy the form code",
              "Customize form fields as needed",
            ],
            executionSteps: [
              "Copy code to your App.jsx (between <> and </>)",
              "Run: npm run dev",
              "Test the form styling and responsiveness",
            ],
            expectedOutput: "A beautifully styled sign-up form",
            order: 1,
          },
          {
            id: "profile-form",
            title: "Step 2: Profile Form",
            description: "Create a profile form with grid layout",
            learningObjectives: [
              "Use Tailwind grid layouts",
              "Create aligned form fields",
            ],
            prerequisites: ["Completed Step 1"],
            files: [
              {
                name: "App.jsx",
                filePath: "../New Text Document (2).txt",
                description: "Profile form with grid layout",
                order: 1,
              },
            ],
            steps: [
              "Study the grid layout structure",
              "Understand grid-cols-3 usage",
              "Customize for your needs",
            ],
            executionSteps: [
              "Copy code to App.jsx",
              "Run: npm run dev",
              "Observe the grid layout",
            ],
            expectedOutput: "Form with aligned labels and inputs in grid",
            order: 2,
          },
          {
            id: "sample-form",
            title: "Step 3: Complete Form with All Input Types",
            description: "Learn all HTML form input types with Tailwind",
            learningObjectives: [
              "Use various input types",
              "Style all form elements",
            ],
            prerequisites: ["Completed Step 2"],
            files: [
              {
                name: "App.jsx",
                filePath: "../New Text Document (3).txt",
                description: "Complete form with all input types",
                order: 1,
              },
            ],
            steps: [
              "Study each input type",
              "Understand Tailwind classes used",
              "Practice customizing",
            ],
            executionSteps: [
              "Copy code to App.jsx",
              "Run: npm run dev",
              "Test all input types",
            ],
            expectedOutput: "Form with text, email, date, color, checkbox, radio, and select inputs",
            order: 3,
          },
          {
            id: "college-portal",
            title: "Step 4: Complete Website - College Portal",
            description: "Build a complete multi-section website",
            learningObjectives: [
              "Create multi-section layouts",
              "Build complete websites",
              "Use Tailwind for full page design",
            ],
            prerequisites: ["Completed Steps 1-3"],
            files: [
              {
                name: "App.jsx",
                filePath: "../New Text Document (4).txt",
                description: "Complete college portal website",
                order: 1,
              },
            ],
            steps: [
              "Study the complete structure",
              "Understand section organization",
              "Customize content and styling",
            ],
            executionSteps: [
              "Copy code to App.jsx",
              "Run: npm run dev",
              "Navigate through all sections",
            ],
            expectedOutput: "Complete website with navbar, hero, gallery, form, and footer",
            order: 4,
          },
        ],
      },
    ],
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    description: "Learn Tailwind CSS styling and utilities step by step",
    prerequisites: ["HTML & CSS basics", "React basics"],
    icon: "🎨",
    order: 5,
    topics: [
      {
        id: "tailwind-tutorial",
        title: "Tailwind CSS Tutorial",
        description: "Complete guide to using Tailwind CSS with React",
        prerequisites: ["React basics", "npm installed"],
        order: 1,
        examples: [
          {
            id: "tailwind-guide",
            title: "Complete Tailwind CSS Guide",
            description: "Setup, installation, and project examples",
            learningObjectives: [
              "Install and configure Tailwind CSS",
              "Understand Tailwind utility classes",
              "Build projects with Tailwind",
            ],
            prerequisites: ["React project setup", "npm installed"],
            files: [
              {
                name: "tailwind.txt",
                filePath: "../tailwind.txt",
                description: "Complete Tailwind CSS tutorial and examples",
                order: 1,
              },
            ],
            steps: [
              "Read the setup instructions",
              "Install Tailwind CSS",
              "Configure Tailwind",
              "Follow project examples",
            ],
            executionSteps: [
              "Create a new Vite project: npm create vite@latest",
              "Install Tailwind: npm install tailwindcss @tailwindcss/vite",
              "Configure vite.config.js",
              "Add @import 'tailwindcss' to index.css",
              "Follow the project examples in the guide",
            ],
            expectedOutput: "Tailwind CSS working in your React project",
            order: 1,
          },
        ],
      },
      {
        id: "react-forms-tailwind",
        title: "React Forms with Tailwind CSS",
        description: "Beautiful form components built with React and Tailwind CSS",
        prerequisites: ["React basics", "Tailwind CSS installed"],
        order: 2,
        examples: [
          {
            id: "signup-form",
            title: "Step 1: Sign Up Form",
            description: "Create a beautiful sign-up form with Tailwind CSS",
            learningObjectives: [
              "Style forms with Tailwind CSS",
              "Create responsive form layouts",
            ],
            prerequisites: ["Tailwind CSS installed", "React basics"],
            files: [
              {
                name: "App.jsx",
                filePath: "../New Text Document.txt",
                description: "Sign up form component with Tailwind styling",
                order: 1,
              },
            ],
            steps: [
              "Ensure Tailwind CSS is installed and configured",
              "Copy the form code",
              "Customize form fields as needed",
            ],
            executionSteps: [
              "Copy code to your App.jsx (between <> and </>)",
              "Run: npm run dev",
              "Test the form styling and responsiveness",
            ],
            expectedOutput: "A beautifully styled sign-up form",
            order: 1,
          },
          {
            id: "profile-form",
            title: "Step 2: Profile Form",
            description: "Create a profile form with grid layout",
            learningObjectives: [
              "Use Tailwind grid layouts",
              "Create aligned form fields",
            ],
            prerequisites: ["Completed Step 1"],
            files: [
              {
                name: "App.jsx",
                filePath: "../New Text Document (2).txt",
                description: "Profile form with grid layout",
                order: 1,
              },
            ],
            steps: [
              "Study the grid layout structure",
              "Understand grid-cols-3 usage",
              "Customize for your needs",
            ],
            executionSteps: [
              "Copy code to App.jsx",
              "Run: npm run dev",
              "Observe the grid layout",
            ],
            expectedOutput: "Form with aligned labels and inputs in grid",
            order: 2,
          },
          {
            id: "sample-form",
            title: "Step 3: Complete Form with All Input Types",
            description: "Learn all HTML form input types with Tailwind",
            learningObjectives: [
              "Use various input types",
              "Style all form elements",
            ],
            prerequisites: ["Completed Step 2"],
            files: [
              {
                name: "App.jsx",
                filePath: "../New Text Document (3).txt",
                description: "Complete form with all input types",
                order: 1,
              },
            ],
            steps: [
              "Study each input type",
              "Understand Tailwind classes used",
              "Practice customizing",
            ],
            executionSteps: [
              "Copy code to App.jsx",
              "Run: npm run dev",
              "Test all input types",
            ],
            expectedOutput: "Form with text, email, date, color, checkbox, radio, and select inputs",
            order: 3,
          },
          {
            id: "college-portal",
            title: "Step 4: Complete Website - College Portal",
            description: "Build a complete multi-section website",
            learningObjectives: [
              "Create multi-section layouts",
              "Build complete websites",
              "Use Tailwind for full page design",
            ],
            prerequisites: ["Completed Steps 1-3"],
            files: [
              {
                name: "App.jsx",
                filePath: "../New Text Document (4).txt",
                description: "Complete college portal website",
                order: 1,
              },
            ],
            steps: [
              "Study the complete structure",
              "Understand section organization",
              "Customize content and styling",
            ],
            executionSteps: [
              "Copy code to App.jsx",
              "Run: npm run dev",
              "Navigate through all sections",
            ],
            expectedOutput: "Complete website with navbar, hero, gallery, form, and footer",
            order: 4,
          },
        ],
      },
    ],
  },
  {
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
                filePath: "../NODE JS EXAMPLES/NODE JS EXAMPLES/Program1.js.txt",
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
                filePath: "../NODE JS EXAMPLES/NODE JS EXAMPLES/Program2.js.txt",
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
                filePath: "../NODE JS EXAMPLES/NODE JS EXAMPLES/Program3_file.js.txt",
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
                filePath: "../NODE JS EXAMPLES/NODE JS EXAMPLES/Program4_file.js.txt",
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
                filePath: "../NODE JS EXAMPLES/NODE JS EXAMPLES/Program5_read.js.txt",
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
                filePath: "../NODE JS EXAMPLES/NODE JS EXAMPLES/Program6_http.js.txt",
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
              "Open browser: http://localhost:3000",
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
                filePath: "../NODE JS EXAMPLES/NODE JS EXAMPLES/Program7_Calc.js.txt",
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
                filePath: "../NODE JS EXAMPLES/NODE JS EXAMPLES/Program8_Timer.js.txt",
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
                filePath: "../NODE JS EXAMPLES/NODE JS EXAMPLES/Program9_JSON.js.txt",
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
  },
  {
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
  },
  {
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
  },
  {
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
                filePath: "../FULLSTACK PROJECTS/TODO APP/backend/server.js",
                description: "Express server for todo API",
                order: 1,
              },
              {
                name: "models/Todo.js",
                filePath: "../FULLSTACK PROJECTS/TODO APP/backend/models/Todo.js",
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
            expectedOutput: "Backend API running on http://localhost:5000",
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
                filePath: "../FULLSTACK PROJECTS/TODO APP/frontend/App.jsx",
                description: "Main React component",
                order: 1,
              },
              {
                name: "components/TodoList.jsx",
                filePath: "../FULLSTACK PROJECTS/TODO APP/frontend/components/TodoList.jsx",
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
  },
  {
    id: "deployment",
    title: "Deployment & Hosting",
    description: "Deploy your applications - Frontend on Vercel, Backend on Render",
    prerequisites: ["Full-stack project completed", "Git basics"],
    icon: "🚀",
    order: 10,
    topics: [
      {
        id: "vercel-frontend",
        title: "Deploy Frontend to Vercel",
        description: "Complete guide to deploy React/Next.js frontend on Vercel",
        prerequisites: ["React project", "GitHub account"],
        order: 1,
        examples: [
          {
            id: "vercel-setup",
            title: "Step 1: Prepare Project for Vercel",
            description: "Set up your React project for Vercel deployment",
            learningObjectives: [
              "Build production-ready app",
              "Configure environment variables",
              "Prepare for deployment",
            ],
            prerequisites: ["React project"],
            files: [
              {
                name: "vercel.json",
                filePath: "../DEPLOYMENT GUIDES/VERCEL/1. Setup/vercel.json",
                description: "Vercel configuration file",
                order: 1,
              },
              {
                name: ".env.example",
                filePath: "../DEPLOYMENT GUIDES/VERCEL/1. Setup/.env.example",
                description: "Environment variables template",
                order: 2,
              },
            ],
            steps: [
              "Ensure project builds successfully",
              "Test: npm run build",
              "Create vercel.json if needed",
              "Prepare environment variables",
            ],
            executionSteps: [
              "Build project: npm run build",
              "Test build: npm run preview",
              "Note down all environment variables needed",
              "Ensure .env.local is in .gitignore",
            ],
            expectedOutput: "Project builds successfully without errors",
            order: 1,
          },
          {
            id: "vercel-deploy",
            title: "Step 2: Deploy to Vercel",
            description: "Deploy your frontend application to Vercel",
            learningObjectives: [
              "Create Vercel account",
              "Deploy via GitHub",
              "Configure environment variables",
              "Get production URL",
            ],
            prerequisites: ["Completed Step 1", "GitHub repository"],
            files: [
              {
                name: "README.md",
                filePath: "../DEPLOYMENT GUIDES/VERCEL/2. Deploy/DEPLOYMENT_STEPS.txt",
                description: "Detailed deployment instructions",
                order: 1,
              },
            ],
            steps: [
              "Push code to GitHub",
              "Sign up/login to Vercel",
              "Import GitHub repository",
              "Configure build settings",
              "Add environment variables",
              "Deploy",
            ],
            executionSteps: [
              "Create GitHub repository",
              "Push code: git push origin main",
              "Go to vercel.com and sign up",
              "Click 'New Project'",
              "Import your GitHub repository",
              "Configure build command: npm run build",
              "Add environment variables in settings",
              "Click Deploy",
            ],
            expectedOutput: "Frontend deployed and accessible at vercel.app URL",
            order: 2,
          },
          {
            id: "vercel-env-vars",
            title: "Step 3: Configure Environment Variables on Vercel",
            description: "Set up environment variables for production",
            learningObjectives: [
              "Add environment variables",
              "Update API URLs for production",
              "Understand Vercel environment settings",
            ],
            prerequisites: ["Completed Step 2"],
            files: [
              {
                name: "README.md",
                filePath: "../DEPLOYMENT GUIDES/VERCEL/3. Environment Variables/SETUP.txt",
                description: "Environment variables setup guide",
                order: 1,
              },
            ],
            steps: [
              "Go to project settings in Vercel",
              "Navigate to Environment Variables",
              "Add each variable (key-value pairs)",
              "Update frontend code to use environment variables",
              "Redeploy if needed",
            ],
            executionSteps: [
              "Open Vercel dashboard",
              "Go to your project",
              "Settings → Environment Variables",
              "Add: VITE_API_URL=https://your-backend-url.onrender.com",
              "Add other required variables",
              "Redeploy or wait for auto-deploy",
            ],
            expectedOutput: "Environment variables configured and app working in production",
            order: 3,
          },
        ],
      },
      {
        id: "render-backend",
        title: "Deploy Backend to Render",
        description: "Complete guide to deploy Express/Node.js backend on Render",
        prerequisites: ["Express backend", "GitHub account"],
        order: 2,
        examples: [
          {
            id: "render-prepare",
            title: "Step 1: Prepare Backend for Render",
            description: "Configure backend for Render deployment",
            learningObjectives: [
              "Set up environment variables",
              "Configure start script",
              "Prepare database connection",
            ],
            prerequisites: ["Express backend"],
            files: [
              {
                name: "package.json",
                filePath: "../DEPLOYMENT GUIDES/RENDER/1. Setup/package.json",
                description: "Package.json with start script",
                order: 1,
              },
              {
                name: ".env.example",
                filePath: "../DEPLOYMENT GUIDES/RENDER/1. Setup/.env.example",
                description: "Environment variables template",
                order: 2,
              },
            ],
            steps: [
              "Ensure package.json has start script",
              "Set up environment variables",
              "Configure database connection string",
              "Test locally with production-like settings",
            ],
            executionSteps: [
              "Check package.json has: 'start': 'node server.js'",
              "Update MongoDB URI to use environment variable",
              "Test: PORT=5000 node server.js",
              "Verify all environment variables are in .env.example",
            ],
            expectedOutput: "Backend runs successfully with environment variables",
            order: 1,
          },
          {
            id: "render-deploy",
            title: "Step 2: Deploy to Render",
            description: "Deploy your backend API to Render",
            learningObjectives: [
              "Create Render account",
              "Create Web Service",
              "Connect GitHub repository",
              "Configure build and start commands",
            ],
            prerequisites: ["Completed Step 1", "GitHub repository"],
            files: [
              {
                name: "README.md",
                filePath: "../DEPLOYMENT GUIDES/RENDER/2. Deploy/DEPLOYMENT_STEPS.txt",
                description: "Detailed Render deployment guide",
                order: 1,
              },
            ],
            steps: [
              "Push code to GitHub",
              "Sign up/login to Render",
              "Create new Web Service",
              "Connect GitHub repository",
              "Configure settings",
              "Add environment variables",
              "Deploy",
            ],
            executionSteps: [
              "Push backend code to GitHub",
              "Go to render.com and sign up",
              "Click 'New +' → 'Web Service'",
              "Connect your GitHub account",
              "Select your repository",
              "Name: your-app-backend",
              "Runtime: Node",
              "Build Command: npm install",
              "Start Command: node server.js",
              "Add environment variables",
              "Click 'Create Web Service'",
            ],
            expectedOutput: "Backend deployed and accessible at render.com URL",
            order: 2,
          },
          {
            id: "render-env-db",
            title: "Step 3: Configure Database and Environment Variables",
            description: "Set up MongoDB Atlas and configure environment variables on Render",
            learningObjectives: [
              "Use MongoDB Atlas for production",
              "Configure environment variables on Render",
              "Connect backend to cloud database",
            ],
            prerequisites: ["Completed Step 2"],
            files: [
              {
                name: "README.md",
                filePath: "../DEPLOYMENT GUIDES/RENDER/3. Database and Env/DATABASE_SETUP.txt",
                description: "Database setup guide",
                order: 1,
              },
            ],
            steps: [
              "Set up MongoDB Atlas (if not done)",
              "Get MongoDB connection string",
              "Add environment variables on Render",
              "Update frontend API URL",
              "Test connection",
            ],
            executionSteps: [
              "Go to MongoDB Atlas",
              "Get connection string from Atlas",
              "In Render, go to Environment tab",
              "Add: MONGODB_URI=your_atlas_connection_string",
              "Add: PORT=10000 (Render's default)",
              "Add: NODE_ENV=production",
              "Add frontend URL to CORS whitelist",
              "Save and redeploy",
            ],
            expectedOutput: "Backend connected to MongoDB Atlas and working in production",
            order: 3,
          },
          {
            id: "render-cors",
            title: "Step 4: Configure CORS for Frontend Connection",
            description: "Allow frontend to communicate with backend",
            learningObjectives: [
              "Understand CORS",
              "Configure CORS in Express",
              "Connect frontend to backend",
            ],
            prerequisites: ["Completed Step 3"],
            files: [
              {
                name: "server.js",
                filePath: "../DEPLOYMENT GUIDES/RENDER/4. CORS Configuration/server.js",
                description: "Express server with CORS configuration",
                order: 1,
              },
            ],
            steps: [
              "Install cors package",
              "Configure CORS with frontend URL",
              "Test connection between frontend and backend",
            ],
            executionSteps: [
              "Install: npm install cors",
              "In server.js: const cors = require('cors')",
              "Configure: app.use(cors({ origin: process.env.FRONTEND_URL }))",
              "Add FRONTEND_URL to Render environment variables",
              "Redeploy backend",
              "Update frontend API URL to Render URL",
            ],
            expectedOutput: "Frontend successfully communicates with backend",
            order: 4,
          },
        ],
      },
      {
        id: "connecting-frontend-backend",
        title: "Connect Frontend and Backend",
        description: "Connect your deployed frontend (Vercel) to deployed backend (Render)",
        prerequisites: ["Frontend deployed on Vercel", "Backend deployed on Render"],
        order: 3,
        examples: [
          {
            id: "update-api-url",
            title: "Step 1: Update Frontend API URL",
            description: "Configure frontend to use Render backend URL",
            learningObjectives: [
              "Update API endpoint URLs",
              "Use environment variables",
              "Test connection",
            ],
            prerequisites: ["Both deployed"],
            files: [
              {
                name: ".env.production",
                filePath: "../DEPLOYMENT GUIDES/CONNECTING/1. Update API URL/.env.production",
                description: "Production environment variables",
                order: 1,
              },
            ],
            steps: [
              "Get Render backend URL",
              "Update frontend API base URL",
              "Add to Vercel environment variables",
              "Redeploy frontend",
            ],
            executionSteps: [
              "Copy your Render backend URL (e.g., https://your-app.onrender.com)",
              "In Vercel, go to Environment Variables",
              "Add: VITE_API_URL=https://your-app.onrender.com",
              "Redeploy frontend",
              "Test the connection",
            ],
            expectedOutput: "Frontend successfully connects to backend API",
            order: 1,
          },
        ],
      },
    ],
  },
];

// Helper functions
export function getCategory(categoryId: string): Category | undefined {
  return categories.find((cat) => cat.id === categoryId);
}

export function getTopic(categoryId: string, topicId: string): Topic | undefined {
  const category = getCategory(categoryId);
  return category?.topics.find((topic) => topic.id === topicId);
}

export function getExample(
  categoryId: string,
  topicId: string,
  exampleId: string
): CodeExample | undefined {
  const topic = getTopic(categoryId, topicId);
  return topic?.examples.find((ex) => ex.id === exampleId);
}
