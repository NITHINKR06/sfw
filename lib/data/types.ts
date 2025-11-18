// Type definitions for code learning platform
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

