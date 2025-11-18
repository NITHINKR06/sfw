import { Category } from "./types";

export const htmlCategory: Category = {
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
            filePath: `lib/HTML_CODE/EX${i + 1}.HTML`,
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
};

