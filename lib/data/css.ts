import { Category } from "./types";

export const cssCategory: Category = {
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
};

