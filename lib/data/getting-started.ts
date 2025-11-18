import { Category } from "./types";

export const gettingStartedCategory: Category = {
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
};

