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

  const countries = await query<{
    country: string;
    visites: number;
  }[]>(
    `
    SELECT country, COUNT(*) AS visites
    FROM user_events
    WHERE client_id = ?
    GROUP BY country
    `,
    [clientId]
  );

  return NextResponse.json(countries);
}
