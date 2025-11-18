import { Category } from "./types";

export const tailwindCategory: Category = {
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
              filePath: "lib/tailwind.txt",
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
              filePath: "lib/New Text Document.txt",
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
              filePath: "lib/New Text Document (2).txt",
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
              filePath: "lib/New Text Document (3).txt",
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
              filePath: "lib/New Text Document (4).txt",
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

