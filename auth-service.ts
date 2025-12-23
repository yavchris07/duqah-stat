import { generateToken, generateSessionToken, getSessionExpiry } from './auth-utils'
import { query, queryOne } from './lib/db'
import { toMySQLDateTime } from './lib/db-utils'
import { User } from './types'



export const AuthService = {



    // // CORRECTION dans lib/auth-service.ts
    // async generateUniqueUsername(email: string): Promise<string> {
    //     const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
    //     let username = baseUsername
    //     let counter = 1

    //     while (true) {
    //         const existing = await queryOne(
    //             'SELECT id FROM profiles WHERE username = ?',
    //             [username]
    //         )

    //         if (!existing) {
    //             return username
    //         }

    //         username = `${baseUsername}${counter}`
    //         counter++

    //         if (counter > 100) {
    //             throw new Error('Impossible de générer un nom d\'utilisateur unique')
    //         }
    //     }
    // },

    async signUp(email: string, password: string, fullName: string) {
        try {
            // Vérifier si l'email existe déjà
            const existingUser = await queryOne(
                'SELECT id FROM users WHERE email = ?',
                [email]
            )

            if (existingUser) {
                throw new Error('Un compte avec cet email existe déjà')
            }

            // Hasher le mot de passe
            // const passwordHash = await hashPassword(password)
            const verificationToken = generateToken()

            // Créer l'utilisateur et récupérer l'ID correctement
            const result = await query(
                'INSERT INTO users (email, password_hash, full_name, verification_token) VALUES (?, ?, ?, ?)',
                [email, fullName, verificationToken]
            )

            // RÉCUPÉRER L'ID CORRECTEMENT - MySQL avec UUID()
            const userId = await queryOne(
                'SELECT id FROM users WHERE email = ?',
                [email]
            )

            if (!userId) {
                throw new Error('Erreur lors de la création de l\'utilisateur')
            }

            // Créer le profil utilisateur
            // const username = email.split('@')[0] + Math.random().toString(36).substring(2, 8)
            // const nikename = await this.generateUniqueUsername(email)
            const username = ''
            await query(
                'INSERT INTO profiles (user_id, username) VALUES (?, ?)',
                [userId.id, username]
            )

            return { success: true, userId: userId.id }
        } catch (error) {
            console.error('Signup error:', error)
            throw error
        }
    },

    async signIn(email: string, password: string) {
        // const user: User = await queryOne(
        //     'SELECT id_client, nom,email, telephone, role FROM client WHERE email = ? AND passwords = ?',
        //     [email,password]
        // )

        // if (!user) throw new Error('Email ou mot de passe incorrect')

        // const valid = await verifyPassword(password, user.passwords)
        // if (!valid) throw new Error('Email ou mot de passe incorrect')

        const user: User = await queryOne(
            'SELECT id_client, email, telephone, role, passwords FROM client WHERE email = ?',
            [email]
        );

        if (!user) throw new Error('Email ou mot de passe incorrect');

        // comparaison directe (dev uniquement)
        if (user.passwords !== password) throw new Error('Email ou mot de passe incorrect');


        if (!user.email) throw new Error('Veuillez vérifier votre email avant de vous connecter')

        const sessionToken = generateSessionToken()
        const expiresAt = getSessionExpiry()

        await query('INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)', [
            user.id,
            sessionToken,
            toMySQLDateTime(expiresAt),
        ])

        // const { password_hash, ...userSafe } = user
        return { success: true, user, sessionToken, expiresAt }
    },

    // async verifySession(token: string) {
    //     const session: Session = await queryOne(
    //         `SELECT s.*, u.email, u.full_name, u.role
    //    FROM sessions s
    //    JOIN users u ON s.user_id = u.id
    //    WHERE s.token = ? AND s.expires_at > NOW()`,
    //         [token]
    //     )

    //     if (!session) return null
    //     const { password_hash, ...user } = session
    //     return user
    // },

    async signOut(token: string) {
        await query('DELETE FROM sessions WHERE token = ?', [token])
        return { success: true }
    },

    async signOutAll(userId: string) {
        await query('DELETE FROM sessions WHERE user_id = ?', [userId])
        return { success: true }
    },

    async verifyEmail(token: string) {
        const user: User = await queryOne('SELECT id_client FROM client WHERE verification_token = ?', [token])
        if (!user) throw new Error('Token de vérification invalide')

        await query('UPDATE users SET email_verified = TRUE, verification_token = NULL WHERE id = ?', [user.id])
        return { success: true }
    },

    async forgotPassword(email: string) {
        const user: User = await queryOne('SELECT id FROM users WHERE email = ?', [email])
        if (!user) return { success: true }

        const resetToken = generateToken()
        const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000).toISOString()

        await query('UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?', [
            resetToken,
            resetTokenExpires,
            user.id,
        ])

        return { success: true }
    },

    // async resetPassword(token: string, newPassword: string) {
    //     const user: User = await queryOne(
    //         'SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > NOW()',
    //         [token]
    //     )
    //     if (!user) throw new Error('Token de réinitialisation invalide ou expiré')

    //     const passwordHash = await hashPassword(newPassword)
    //     await query(
    //         'UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
    //         [passwordHash, user.id]
    //     )

    //     await this.signOutAll(user.id)
    //     return { success: true }
    // },
}



