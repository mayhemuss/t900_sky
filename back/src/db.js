import sequlize from "sequelize"

const db = new sequlize.Sequelize(
    "monters_billing",
    "mayhemuss",
    "mayhem09y",{
        dialect: "postgres",
        host: "localhost",
        port: 5432
    }
)

export default db

import pg from 'pg'

const pool = new pg.Pool(
    {
        user: "mayhemuss",
        password: "mayhem09y",
        host: "192.168.0.74",
        port: 5432,
        database: "monters_billing"
    }
)

// export default pool