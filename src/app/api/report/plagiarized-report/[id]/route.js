// src/app/api/report/plagiarized-report/[id]/route.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import "@/lib/mongodb";
import { fetchPlagiarisedReport } from "@/services/report.service";

export async function GET(req, { params }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const report = await fetchPlagiarisedReport(params.id);
    if (!report || report.length === 0) {
      return NextResponse.json(
        { message: "Report not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Report fetched successfully",
      report,
    });
  } catch (err) {
    console.error("[plagiarized-report]", err);
    return NextResponse.json(
      { message: "Failed to fetch report", error: err.message },
      { status: 500 }
    );
  }
}
