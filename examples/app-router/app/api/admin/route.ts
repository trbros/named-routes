export function GET() { return Response.json({ students: [{ id: 42, name: "Ana" }] }); }
export async function POST(request: Request) {
  const student: unknown = await request.json();
  return Response.json({ preview: student, persisted: false }, { status: 201 });
}
