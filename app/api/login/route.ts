// app/api/login/route.ts
import { AuthService } from '@/auth-service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        // const { email, password } = await request.json()

        const body = await request.json();
        console.log("BODY REÇU :", body);

        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email et mot de passe sont requis' }, { status: 400 });
        }

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email et mot de passe sont requis' },
                { status: 400 }
            )
        }

        const result = await AuthService.signIn(email, password)

        // Créer un cookie de session
        const response = NextResponse.json(result)
        // response.cookies.set('session_token', result.sessionToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'lax',
        //     maxAge: 7 * 24 * 60 * 60
        // })

        return response
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        } else {
            return NextResponse.json({ error: error })
        }

    }
}

