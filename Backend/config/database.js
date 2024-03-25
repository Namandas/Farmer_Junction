import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const conString = process.env.dbPassword;
const db = new pg.Client(conString);

async function connectToDB() {
    try {
        await db.connect();
        console.log('Connected to database');
    } catch (err) {
        console.error('Error connecting to database:', err.message);
    }
}

connectToDB();

export default db;