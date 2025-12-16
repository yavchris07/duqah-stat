"use server";

import mysql from 'mysql2/promise'

const dbConfig = {
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

const pool = mysql.createPool(dbConfig)

export async function query(sql: string, params: string[] = []) {
  const [rows] = await pool.execute(sql, params)
  // Convertir les RowDataPacket en JSON simple
  return JSON.parse(JSON.stringify(rows))
}
 

export async function queryOne(sql: string, params: string[] = []) {
  const rows = await query(sql, params)
  return rows[0] || null
}

