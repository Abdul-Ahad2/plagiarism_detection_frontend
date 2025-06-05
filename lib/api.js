// lib/api.js
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function postPlagiarismCheck(formData) {
  const res = await fetch(`${API_BASE_URL}/plagiarism/check`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to check plagiarism");
  }
  return res.json();
}
