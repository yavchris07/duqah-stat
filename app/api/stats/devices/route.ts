import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client_id");

  if (!clientId) {
    return NextResponse.json(
      { error: "client_id manquant" },
      { status: 400 }
    );
  }

  const devices = await query(
    `
    SELECT device_type, COUNT(*) AS visites
    FROM user_events
    WHERE client_id = ?
    GROUP BY device_type
    `,
    [clientId]
  ) as { device_type: string; visites: number }[];

  return NextResponse.json(devices);
}
