import Link from "next/link";
import { categories } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Code Learning Hub</h1>
          <p className="mt-2 text-gray-600">
            Master full-stack web development from basics to deployment. Learn HTML, CSS, JavaScript, React, Node.js, Express, Databases, and deploy to Vercel & Render - everything explained step-by-step!
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              ✓ Step-by-Step Instructions
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              ✓ Prerequisites Listed
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              ✓ Execution Guides
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              ✓ Learning Objectives
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories
            .sort((a, b) => a.order - b.order)
            .map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 hover:border-blue-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{category.icon}</span>
                  <h2 className="text-2xl font-semibold text-gray-900">{category.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                {category.prerequisites && category.prerequisites.length > 0 && (
                  <div className="text-xs text-gray-500 mb-3">
                    <strong>Prerequisites:</strong> {category.prerequisites.slice(0, 2).join(", ")}
                    {category.prerequisites.length > 2 && "..."}
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <div className="text-blue-600 font-medium">
                    {category.topics.length} topic{category.topics.length !== 1 ? "s" : ""} •{" "}
                    {category.topics.reduce((sum, topic) => sum + topic.examples.length, 0)} step
                    {category.topics.reduce((sum, topic) => sum + topic.examples.length, 0) !== 1 ? "s" : ""}
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                    Start Learning →
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
          <p>© 2025 Code Learning Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
