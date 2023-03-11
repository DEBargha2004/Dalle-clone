import express from "express";
import * as dotenv from 'dotenv'
import connection from "../configurations/sql.js";
import bcrypt from 'bcrypt';
import Crypto from 'crypto'
dotenv.config()
const signRoute = express.Router()
const saltRounds = 10


signRoute.route('/signup').post((req, res) => {
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    let password = req.body.password
    const cookie = Crypto.randomUUID()
    console.log(firstname,lastname,email,password);
    connection.query('select * from userinfo where emailid = ?', [email], (err, result) => {
        if (err) {
            res.json({
                'message': 'Something went wrong please try again after some time'
            })
        } else {
            if (result.length) {
                res.json({
                    'message': 'This email Id already exists, try with some other ones'
                })
            } else {
                bcrypt.hash(password, saltRounds, (err, hashedpass) => {
                    connection.query('insert into userinfo values(?,?,?,?,?)', [Date.now(), firstname, lastname, email, hashedpass])
                })
                connection.query('insert into cookieinfo values (?,?,?)', [Date.now(), cookie, email])
                res.cookie('cookie', cookie, {
                    maxAge: 86400000,
                    sameSite:'lax'
                })
                res.json({
                    'message': 'success'
                })
            }
        }
    })
})

signRoute.route('/signin').post((req, res) => {
    let email = req.body.email
    let password = req.body.password
    let cookie = Crypto.randomUUID()
    connection.query('select * from userinfo where emailid = ?', [email], (err, result) => {
        if (result.length) {
            let actualPass = result[0].password
            bcrypt.compare(password, actualPass, (err, comparison) => {
                if (comparison === true) {
                    connection.query('insert into cookieinfo values (?,?,?)', [Date.now(), cookie, email])
                    res.cookie('cookie', cookie, {
                        maxAge: 86400000,
                        sameSite:'lax',
                    })
                    res.json({
                        'message': 'success'
                    })
                } else {
                    res.json({
                        'message': 'Incorrect password'
                    })
                }
            })
        } else {
            res.json({
                'message': 'Email Id doesnot exists'
            })
        }
    })
})

signRoute.route('/firstreq').get((req,res)=>{
    let cookie = req.cookies
    console.log(cookie);
    if(!cookie.cookie){
        res.json({
            'message' : 'sign in again'
        })
    }else{
        connection.query('select * from cookieinfo where cookie = ?',[cookie.cookie],(err,result)=>{
            if (result.length){
                res.json({
                    'message' : 'success'
                })
            }
        })
    }
})

signRoute.route('/logout').post((req,res)=>{
    let cookie = req.cookies.cookie
    console.log(cookie);
    if(cookie){
        res.clearCookie('cookie')
        res.json({
            'message' : 'Logout successful'
        })
        console.log('cookie cleared');
    }else{
        res.json({
            'message' : 'You donot have a key'
        })
    }
})



export { signRoute };