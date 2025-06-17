import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  console.log("[proxy] ▶ POST /api/report/check invoked");

  // 1) Get the NextAuth token payload (decrypt the JWE under the hood)
  let tokenPayload;
  try {
    tokenPayload = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      raw: false, // get the decoded payload object
    });
    console.log("[proxy] 🛡️ NextAuth payload:", tokenPayload);
  } catch (err) {
    console.error("[proxy] ❌ getToken error:", err);
  }

  if (!tokenPayload) {
    console.warn("[proxy] 🚨 No session – returning 401");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2) Re-sign as an HS256 JWT using the FastAPI secret
  let signedHs256;
  try {
    signedHs256 = jwt.sign(tokenPayload, process.env.FASTAPI_SECRET, {
      algorithm: "HS256",
    });
    console.log("[proxy] 🔏 Re-signed HS256 token:", signedHs256);
  } catch (err) {
    console.error("[proxy] ❌ Failed to sign HS256 JWT:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: err.message },
      { status: 500 }
    );
  }

  // 3) Pull the multipart form data
  console.log("[proxy] 📑 Extracting FormData");
  const form = await req.formData();
  console.log("[proxy] 📋 FormData keys:", [...form.keys()]);

  // 4) Forward to FastAPI with the new HS256 token
  const upstreamUrl = `${
    process.env.FASTAPI_URL || "http://localhost:8000"
  }/plagiarism/check`;
  console.log(`[proxy] 🌐 Forwarding to FastAPI: ${upstreamUrl}`);

  let upstream;
  try {
    upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${signedHs256}`,
      },
      body: form, // multipart boundary is auto-set
    });
    console.log("[proxy] 🔄 FastAPI responded with status", upstream.status);
  } catch (err) {
    console.error("[proxy] ❌ Network error to FastAPI:", err);
    return NextResponse.json(
      { error: "Bad gateway", detail: err.message },
      { status: 502 }
    );
  }

  // 5) Relay the response JSON (or raw text on parse failure)
  let data;
  try {
    data = await upstream.json();
    console.log("[proxy] 📦 FastAPI JSON:", data);
  } catch (err) {
    const text = await upstream.text();
    console.error("[proxy] ⚠️ Invalid JSON from FastAPI, text:", text);
    data = { error: "Invalid JSON from FastAPI", raw: text };
  }

  console.log("[proxy] ✅ Returning to client");
  return NextResponse.json(data, { status: upstream.status });
}
