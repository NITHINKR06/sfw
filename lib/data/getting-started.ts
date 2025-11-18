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
              filePath: "lib/GETTING STARTED/1. Install Node.js.txt",
              description: "Step-by-step guide to install Node.js",
              order: 1,
            },
          ],
          steps: [
            "Download the latest LTS installer for your OS from [nodejs.org](https://nodejs.org/en/download).",
            "Run the installer, keep the default options (npm installs automatically), and allow the installer to add Node.js to your PATH.",
            "After installation, close and reopen your terminal (PowerShell, Command Prompt, or Terminal on macOS/Linux) so the PATH updates.",
            "Verify Node.js by running `node -v` — you should see a semantic version such as v20.x.x.",
            "Verify npm by running `npm -v` — npm ships with Node.js, so you should see a matching version.",
            "Optional sanity check: run `npx --version` to confirm the npm runtime tools are also available.",
          ],
          executionSteps: [
            "Open [nodejs.org/download](https://nodejs.org/en/download) and grab the LTS installer (or use your package manager on Linux/macOS).",
            "Run the installer with default settings; allow it to install the additional build tools if prompted.",
            "Restart your terminal session so the new PATH entries take effect.",
            "Run `node -v` to confirm Node.js is available.",
            "Run `npm -v` and `npx --version` to verify the package manager tooling.",
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
              filePath: "lib/GETTING STARTED/2. Install Git.txt",
              description: "Guide to install Git and set up GitHub",
              order: 1,
            },
          ],
          steps: [
            "Download the installer from [git-scm.com](https://git-scm.com/downloads) (choose the build that matches your OS).",
            "Run the installer with default options so Git adds itself to PATH and installs Git Bash on Windows.",
            "Create or sign in to your GitHub account at [github.com/signup](https://github.com/signup) so you can host repositories.",
            "Open a terminal and configure Git identity: `git config --global user.name \"Your Name\"` and `git config --global user.email \"you@example.com\"`.",
            "Verify the installation by running `git --version` (optional extra: `git config --list --show-origin | Select-String user.` on Windows PowerShell).",
            "Add SSH or HTTPS authentication later; for now confirm you can reach GitHub by visiting [github.com/settings/keys](https://github.com/settings/keys) after signing in.",
          ],
          executionSteps: [
            "Install Git from [git-scm.com](https://git-scm.com/downloads) (use the default PATH option).",
            "Sign up or sign in at [github.com/signup](https://github.com/signup) to enable remote repositories.",
            "Run `git config --global user.name \"Your Name\"`.",
            "Run `git config --global user.email \"you@example.com\"`.",
            "Run `git --version` to verify the binary is available and `git config --list --global` to confirm your identity.",
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
              filePath: "lib/GETTING STARTED/3. Install VS Code.txt",
              description: "Guide to install and configure VS Code",
              order: 1,
            },
          ],
          steps: [
            "Download VS Code for your platform from [code.visualstudio.com](https://code.visualstudio.com/Download).",
            "Install VS Code with default options (allow it to add `code` to PATH on Windows/macOS for command-line launching).",
            "Launch VS Code, sign in with your GitHub or Microsoft account if you want settings sync, and walk through the welcome tour.",
            "Install the essentials: ESLint, Prettier, Live Server, GitLens, and Thunder Client (or REST Client) from the Extensions panel.",
            "Verify the CLI integration by running `code --version` from your terminal; it should print the VS Code version along with commit information.",
            "Customize basic editor settings (font, format on save, auto save) via File → Preferences → Settings.",
          ],
          executionSteps: [
            "Download and install VS Code from [code.visualstudio.com](https://code.visualstudio.com/Download).",
            "Launch VS Code and press Ctrl+Shift+X (Cmd+Shift+X on macOS) to open the Extensions view.",
            "Install ESLint, Prettier, Live Server, GitLens, and any language packs you need.",
            "Open a terminal and run `code --version` to confirm the editor was added to PATH.",
            "Restart VS Code so all extensions activate cleanly.",
          ],
          expectedOutput: "VS Code installed with essential extensions",
          order: 3,
        },
      ],
    },
  ],
};

