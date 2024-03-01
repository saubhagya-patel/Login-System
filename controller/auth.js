import pg from "pg";
import bcrypt from "bcrypt";

const db=new pg.Client({
    host:"localhost",
    user:"postgres",
    database:"loginSystem",
    password:"Postgres#2023",
    port:"5432",
})
db.connect();

const saltRounds=10;

export async function loginUser(req,res){
    const loginData = {
        email: req.body.email,
        password: req.body.password,
    }
    try {
        const result = await db.query("SELECT * FROM users WHERE email=$1;",[loginData.email])
        if(result.rows.length === 0) {
            
        }
    } catch (error) {
        console.log(error);
    }
}

export async function signupUser(req,res) {
    const signupData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    try {
        const checkUserRegistered = await db.query("SELECT FROM users WHERE email=$1;",[signupData.email]);
        if(checkUserRegistered.rows.length > 0) {
            res.redirect("/user/?message=User%20already%20registered.%20Please%20login.")
        }else {
            bcrypt.hash(signupData.password, saltRounds, async function(err, hash) {
                if(err) {
                    console.error("ERROR HASHING PASSWORD : ",err);
                }
                else {
                    const result = await db.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *;",[signupData.name, signupData.email, hash])
                    const user = result.rows[0];
                    res.redirect("/user/result")  
                }
            }) 
        }
    } catch (error) {
        console.log(error)
    }
}

