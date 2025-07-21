async function callN8nApi(text: string) {
  const baseUrl = process.env.NEXT_PUBLIC_N8N_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/n8n`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    cache: "no-store",
  });
  return res.json();
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { text?: string };
}) {
  let response: unknown = null;
  const inputText = searchParams?.text || "";

  if (inputText) {
    response = await callN8nApi(inputText);
  }

  return (
    <form method="GET">
      <h1>DashboardPage</h1>
      <input
        type="text"
        name="text"
        defaultValue={inputText}
        style={{ marginRight: 8 }}
      />
      <button
        type="submit"
        style={{ backgroundColor: "blue", color: "white", padding: "8px 16px" }}
      >
        送信
      </button>
      <div style={{ marginTop: 16 }}>
        <strong>レスポンス:</strong>
        <pre
          style={{
            background: "#f4f4f4",
            padding: 12,
            borderRadius: 4,
            minHeight: 60,
          }}
        >
          {response ? JSON.stringify(response, null, 2) : "---"}
        </pre>
      </div>
    </form>
  );
}
