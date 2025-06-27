export async function POST(req: Request) {
  const { settings } = await req.json();
  localStorage.setItem("settings", JSON.stringify(settings));

  return Response.json({ settings });
}

export async function GET(req: Request) {
}
