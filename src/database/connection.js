import sql from 'mssql'

const sqlConfig = {
    database:'prueba1',
    user:'SA',
    password:'casz',
    server: 'localhost',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }
  
  export async function conn() {
   try {
    // make sure that any items are correctly URL encoded in the connection string
    const pool = await sql.connect(sqlConfig)
    return pool;
   } catch (err) {
    console.log('err');
   }
  }
export {sql};