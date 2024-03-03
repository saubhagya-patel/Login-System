import pg from "pg";
import bcrypt from "bcrypt";
import { resolveInclude } from "ejs";

const db=new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})
db.connect();

const saltRounds=10;

export async function verifyLocalLogin(loginData, req, res) {
    try {
        const result = await db.query("SELECT * FROM users WHERE email=$1;",[loginData.email])
        console.log(result.rows[0]);
        const user=result.rows[0];
        const storedHashedPassword=user.password;
    } catch (error) {
        console.log(error);
    }
}

export async function registerLocalUser(signupData, req, res) {
    console.log(signupData);
    const password = signupData.password;
    try {
        const checkUserRegistered = await db.query("SELECT FROM users WHERE email=$1;",[signupData.email]);
        if(checkUserRegistered.rows.length > 0) {
            res.redirect("/?message=User%20already%20registered.%20Please%20login.")
        }else {
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                if(err) {
                    console.error("ERROR HASHING PASSWORD : ",err);
                }
                else {
                    const result = await db.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *;",[signupData.name, signupData.email, hash])
                    const user = result.rows[0];
                    
                }
            }) 
        }
    } catch (error) {
        console.log(error)
    }
}
