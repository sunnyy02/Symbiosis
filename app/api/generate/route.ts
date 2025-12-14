import { NextRequest, NextResponse } from "next/server";
import { getProjectByCombo } from "@/lib/projects";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const primary = searchParams.get("primary");
  const secondary = searchParams.get("secondary");

  if (!primary || !secondary) {
    return NextResponse.json(
      { error: "Missing primary or secondary parameter" },
      { status: 400 }
    );
  }

  try {
    const project = await getProjectByCombo(primary, secondary);

    if (!project) {
      return NextResponse.json({ error: "No project found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
