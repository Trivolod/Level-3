import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'school_library'}\`;`
    );

    console.log(`✅ Database "${process.env.DB_NAME}" initialized successfully!`);
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create database:', error);
    process.exit(1);
  }
}

createDatabase();