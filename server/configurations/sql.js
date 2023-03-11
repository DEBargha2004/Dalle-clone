import sql from 'mysql2'
import * as dotenv from 'dotenv'
dotenv.config()

const connection = sql.createPool({
    database : process.env.database,
    password:process.env.password,
    user:process.env.user,
    host:process.env.host
})

export default connection;