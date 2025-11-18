import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json({ error: "File path is required" }, { status: 400 });
  }

  try {
    const projectRoot = process.cwd();
    // Get the lib directory (where examples are stored)
    const libDir = path.resolve(projectRoot, "lib");
    
    // If path starts with "..", it's relative to lib directory (remove the ..)
    // Otherwise, resolve relative to project root
    let fullPath: string;
    if (filePath.startsWith("../")) {
      // Remove the "../" prefix and resolve relative to lib directory
      const pathWithoutParent = filePath.replace(/^\.\.\//, "");
      fullPath = path.resolve(libDir, pathWithoutParent);
    } else if (filePath.startsWith("lib/")) {
      // Path already includes lib/, resolve from project root
      fullPath = path.resolve(projectRoot, filePath);
    } else {
      // Assume it's relative to project root
      fullPath = path.resolve(projectRoot, filePath);
    }
    
    const normalizedPath = path.normalize(fullPath);

    // Security check: ensure the path is within the lib directory
    // This allows accessing files in the lib directory where examples are stored
    if (!normalizedPath.startsWith(libDir)) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 403 });
    }

    // Additional check: ensure file exists
    if (!fs.existsSync(normalizedPath)) {
      // For deployment guides, database guides, and getting started, provide helpful message
      if (
        filePath.includes("DEPLOYMENT GUIDES") || 
        filePath.includes("DATABASE GUIDES") ||
        filePath.includes("GETTING STARTED")
      ) {
        const fileName = path.basename(normalizedPath);
        const placeholderContent = `# ${fileName.replace(/\.(txt|js|jsx|ts|tsx|env|example)$/i, '')}

## File Not Yet Created

This guide file is being prepared. The step-by-step instructions are available in the lesson details above.

**Note:** This file will contain detailed code examples and extended explanations. For now, please refer to:
- The Step-by-Step Instructions section
- The Execution Steps section
- The Expected Output section

These sections above contain all the information you need to complete this step.

---
*This is a placeholder message. The actual file will be available soon.*`;

        return NextResponse.json({ 
          content: placeholderContent,
          isPlaceholder: true 
        });
      }
      
      return NextResponse.json({ 
        error: "File not found",
        filePath: filePath,
        hint: "This file may not have been created yet. Please check if the file path is correct or if the content is available in the lesson instructions above."
      }, { status: 404 });
    }

    // Read the file
    const content = fs.readFileSync(normalizedPath, "utf-8");

    return NextResponse.json({ content });
  } catch (error: unknown) {
    console.error("Error reading file:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to read file";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

