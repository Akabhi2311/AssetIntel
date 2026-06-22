export async function callAIEndpoint(endpoint: string, data: any, extraHeaders: any = {}) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders, // 🔥 IMPORTANT
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
