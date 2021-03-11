import { createPool } from 'mysql2/promise';



export async function connect() {

    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: process.env.DATABASE_PASSWORD || '123data_bMYSQL-storage456',
        database: 'todo_app_ts_mysql',
        connectionLimit: 10
    })

    return connection
}