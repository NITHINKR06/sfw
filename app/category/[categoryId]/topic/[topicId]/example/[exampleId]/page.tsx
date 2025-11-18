import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getExample } from "@/lib/data";
import type { Topic, CodeExample } from "@/lib/data";
import CodeViewer from "@/components/CodeViewer";

interface PageProps {
  params: Promise<{
    categoryId: string;
    topicId: string;
    exampleId: string;
  }>;
}

export default async function ExamplePage({ params }: PageProps) {
  const { categoryId, topicId, exampleId } = await params;
  const category = getCategory(categoryId);
  const example = getExample(categoryId, topicId, exampleId);

  if (!category || !example) {
    notFound();
  }

  const topic = category.topics.find((t: Topic) => t.id === topicId);

  // Get previous and next examples for navigation
  const allExamples = topic?.examples.sort((a: CodeExample, b: CodeExample) => a.order - b.order) || [];
  const currentIndex = allExamples.findIndex((ex: CodeExample) => ex.id === exampleId);
  const prevExample =
    currentIndex > 0 ? allExamples[currentIndex - 1] : null;
  const nextExample =
    currentIndex < allExamples.length - 1
      ? allExamples[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/category/${categoryId}`}
              className="hover:text-blue-600"
            >
              {category.title}
            </Link>
            <span>/</span>
            <Link
              href={`/category/${categoryId}/topic/${topicId}`}
              className="hover:text-blue-600"
            >
              {topic?.title}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{example.title}</span>
          </div>

          {/* Title Section */}
          <div className="flex items-center gap-4">
            <span className="text-3xl">{category.icon}</span>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {example.title}
              </h1>
              {example.description && (
                <p className="mt-2 text-gray-600">{example.description}</p>
              )}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <span>
              Step {example.order} of {allExamples.length}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${(example.order / allExamples.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CodeViewer
          files={example.files}
          learningObjectives={example.learningObjectives}
          prerequisites={example.prerequisites}
          steps={example.steps}
          executionSteps={example.executionSteps}
          expectedOutput={example.expectedOutput}
        />
      </main>

      {/* Navigation Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            {prevExample ? (
              <Link
                href={`/category/${categoryId}/topic/${topicId}/example/${prevExample.id}`}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <span>←</span> Previous: {prevExample.title}
              </Link>
            ) : (
              <div></div>
            )}

            {nextExample ? (
              <Link
                href={`/category/${categoryId}/topic/${topicId}/example/${nextExample.id}`}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Next: {nextExample.title} <span>→</span>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
