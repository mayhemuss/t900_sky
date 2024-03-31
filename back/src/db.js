import pg from 'pg'

const pool = new pg.Pool(
    {
        user: "mayhemuss",
        password: "mayhem09y",
        host: "localhost",
        port: 5432,
        database: "montersbill"
    }
)

export default pool