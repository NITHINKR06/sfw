// Re-export types from types file
export type {
  CodeFile,
  CodeExample,
  Topic,
  Category,
} from "./data/types";

// Import all category data
import { gettingStartedCategory } from "./data/getting-started";
import { htmlCategory } from "./data/html";
import { cssCategory } from "./data/css";
import { javascriptCategory } from "./data/javascript";
import { reactCategory } from "./data/react";
import { tailwindCategory } from "./data/tailwind";
import { nodejsCategory } from "./data/nodejs";
import { expressCategory } from "./data/express";
import { databaseCategory } from "./data/database";
import { fullstackProjectsCategory } from "./data/fullstack-projects";
import { deploymentCategory } from "./data/deployment";

// Combine all categories in order
// Remove duplicates by filtering unique IDs
const allCategories: Category[] = [
  gettingStartedCategory,
  htmlCategory,
  cssCategory,
  javascriptCategory,
  reactCategory,
  tailwindCategory,
  nodejsCategory,
  expressCategory,
  databaseCategory,
  fullstackProjectsCategory,
  deploymentCategory,
];

// Ensure no duplicates by filtering unique IDs
export const categories: Category[] = allCategories.filter(
  (category, index, self) => 
    index === self.findIndex((c) => c.id === category.id)
);

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
