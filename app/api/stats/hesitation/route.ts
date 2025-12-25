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

    const rows = await query(
        `
    SELECT COUNT(*) AS hesitation
    FROM user_events
    WHERE client_id = ?
    AND event_type = 'hover_button'
    `,
        [clientId]
    ) as { hesitation: number } [];

    const hesitation = rows[0] ?? null;

    return NextResponse.json(hesitation);
}
