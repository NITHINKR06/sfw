import { Category } from "./types";

export const javascriptCategory: Category = {
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
            filePath: `lib/JAVASCRIPT EXAMPLES/ex${i + 1}.html`,
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
};

