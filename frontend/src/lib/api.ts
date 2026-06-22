const API = "http://localhost:8000";

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getStats() {
  const res = await fetch(`${API}/stats`, {
    headers: authHeaders(),
  });

  return res.json();
}

export async function getFiles() {
  const res = await fetch(`${API}/files`, {
    headers: authHeaders(),
  });

  return res.json();
}

export async function generateQuestions(payload: any) {
  const res = await fetch(`${API}/generate-questions`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  return res.json();
}