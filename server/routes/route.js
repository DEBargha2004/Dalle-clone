import * as dotenv from 'dotenv'
import express from "express";
import openai from '../configurations/openai.js';
import connection from '../configurations/sql.js';
import fs from 'fs'
dotenv.config()

const router = express.Router()

router.route('/').post((req, res) => {
    let prompt = req.body.prompt
    let cookie = req.cookies
    connection.query('select * from cookieinfo where cookie = ?', [cookie.cookie], (err, result) => {
        if (result.length) {
            let email = result[0].emailid
            connection.query('select * from userinfo where emailid = ?', [email], async (select_err, select_result) => {
                let fullname = `${select_result[0].firstname} ${select_result[0].lastname}`
                try {
                    const response = await openai.createImage({
                        prompt: prompt,
                        n: 4,
                        size: '1024x1024',
                        response_format: 'b64_json'
                    })
                    response.data.data = response.data.data.map((item) => {
                        item.b64_json = 'data:image/jpeg;base64,' + item.b64_json
                        return (
                            {
                                ...item,
                                fullname: fullname
                            }
                        )
                    })
                    res.status(200).json({
                        'message': response.data.data
                    })
                } catch (e) {
                    console.log(e);
                    res.json({
                        'message': false
                    })
                }
            })
        } else {
            res.json({
                'message': 'loginfail'
            })
        }
    })
})

router.route('/share').post((req, res) => {
    let prompt = req.body.prompt
    let imagedata = req.body.imagedata
    let filepath = `image/${Date.now()}.jpeg`
    let cookie = req.cookies
    connection.query('select * from cookieinfo where cookie = ?', [cookie.cookie], (err, result) => {
        if (result.length) {
            let email = result[0].emailid
            connection.query('select * from userinfo where emailid = ?', [email], (select_err, select_result) => {
                let fullname = `${select_result[0].firstname} ${select_result[0].lastname}`
                fs.writeFileSync(filepath, imagedata, 'base64')
                connection.query('insert into itemList values (?,?,?,?)', [fullname, prompt, filepath, null], (err, saveresult) => {
                    if (err) {
                        fs.unlinkSync(filepath)
                        res.json({
                            'message': 'Something went wrong please try again later'
                        })
                    } else {
                        res.json({
                            'message': 'Submitted successfully'
                        })
                    }
                })
            })
        } else {
            res.json({
                'message': 'loginfail'
            })
        }
    })
})

router.route('/home').post((req, res) => {
    let cookie = req.cookies
    let index = req.body.index ? req.body.index : 0
    connection.query('select * from cookieinfo where cookie = ?', [cookie.cookie], (err, cookieresult) => {
        if (cookieresult.length) {
            connection.query(`select * from itemList where imageNum ${index ? '<' : '>'} ? order by imageNum desc limit 4`, [index], (err, itemresult) => {
                if (!err) {
                    itemresult = itemresult.map(item => {
                        let path = item.location
                        let base64data = 'data:image/jpeg;base64,' + fs.readFileSync(path, 'base64')
                        return {
                            ...item,
                            base64data
                        }
                    })
                    res.json({
                        'message': itemresult
                    })
                } else {
                    res.json({
                        'message': false
                    })
                }
            })
        } else {
            res.json({
                'message': 'loginfail'
            })
        }
    })
})

export { router };