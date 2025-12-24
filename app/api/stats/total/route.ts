import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client_id");

  if (!clientId) {
    return NextResponse.json(
      { error: "client_id manquant" },
      { status: 400 }
    );
  }

  const result = await queryOne<{
    visites: number;
  }>(
    `
    SELECT COUNT(ip_address) AS visites
    FROM user_events
    WHERE client_id = ?
    `,
    [clientId]
  );

  return NextResponse.json({
    visites: result?.visites ?? 0,
  });
}
