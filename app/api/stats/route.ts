import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("client_id");

    if (!clientId) {
      return NextResponse.json(
        { error: "client_id manquant" },
        { status: 400 }
      );
    }

    // 1️⃣ Visites par device
    const devices = await query<{device_type: string;visites: number;}[]>(
      `
      SELECT device_type, COUNT(*) AS visites
      FROM user_events
      WHERE client_id = ?
      GROUP BY device_type
      `,
      [clientId]
    );

    // 2️⃣ Nombre total de visites (IP)
    const totalVisits = await queryOne<{visites: number;}>(
      `
      SELECT COUNT(ip_address) AS visites
      FROM user_events
      WHERE client_id = ?
      `,
      [clientId]
    );

    // 3️⃣ Visites par pays
    const countries = await query<{country: string;visites: number;}[]>(
      `
      SELECT country, COUNT(*) AS visites
      FROM user_events
      WHERE client_id = ?
      GROUP BY country
      `,
      [clientId]
    );

    return NextResponse.json({
      devices,
      totalVisits: totalVisits?.visites ?? 0,
      countries,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
