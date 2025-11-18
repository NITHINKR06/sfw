import { Category } from "./types";

// React category is very large - extracting from original data.ts
// This file contains the React.js category data

export const reactCategory: Category = {
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
};

