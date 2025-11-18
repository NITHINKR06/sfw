import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/data";
import type { Topic, CodeExample } from "@/lib/data";

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  const category = getCategory(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.title}</h1>
              <p className="mt-2 text-gray-600">{category.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Prerequisites */}
      {category.prerequisites && category.prerequisites.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <span>📋</span> Prerequisites for {category.title}
            </h3>
            <ul className="list-disc list-inside text-yellow-700 space-y-1">
              {category.prerequisites.map((prereq: string, index: number) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {category.topics
            .sort((a: Topic, b: Topic) => a.order - b.order)
            .map((topic: Topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {topic.title}
                    </h2>
                    {topic.description && (
                      <p className="text-gray-600">{topic.description}</p>
                    )}
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {topic.examples.length} Step{topic.examples.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Topic Prerequisites */}
                {topic.prerequisites && topic.prerequisites.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Prerequisites:</strong>{" "}
                      {topic.prerequisites.join(", ")}
                    </p>
                  </div>
                )}

                {/* Examples as Steps */}
                <div className="space-y-3 mt-4">
                  {topic.examples
                    .sort((a: CodeExample, b: CodeExample) => a.order - b.order)
                    .map((example: CodeExample, index: number) => (
                      <Link
                        key={example.id}
                        href={`/category/${categoryId}/topic/${topic.id}/example/${example.id}`}
                        className="block p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold group-hover:bg-blue-200 transition-colors">
                            {example.order}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 group-hover:text-blue-700">
                              {example.title}
                            </div>
                            {example.description && (
                              <div className="text-sm text-gray-600 mt-1">
                                {example.description}
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>
                                {example.files.length} file
                                {example.files.length !== 1 ? "s" : ""}
                              </span>
                              {example.learningObjectives && (
                                <span>
                                  {example.learningObjectives.length} objective
                                  {example.learningObjectives.length !== 1
                                    ? "s"
                                    : ""}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

