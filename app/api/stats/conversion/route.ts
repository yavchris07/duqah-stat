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

    // const conversion = await query(
    //     `
    // SELECT COUNT(*) AS conversion
    // FROM user_events
    // WHERE client_id = ?
    // AND event_type = 'click_button'
    // `,
    //     [clientId]
    // ) as { conversion: number } | null;

    const rows = await query(
        `
        SELECT COUNT(*) AS conversion
        FROM user_events
        WHERE client_id = ?
            AND event_type = 'click_button'
  `,
        [clientId]
    ) as { conversion: number }[];

    const conversion = rows[0] ?? null;


    return NextResponse.json(conversion);
}
