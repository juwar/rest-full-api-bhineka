'use strict'
const nodemailer = require('nodemailer')
const conn = require('../Connection/connect')

let random = ''
let email = ''
let id = ''
function acak() {
    random = ''
    let b = '0123456789';
    let c = 6;
    let d = b.length;
    
    for (let i = 0; i < c; i++) {
        random += b.charAt(Math.floor(Math.random() * d));
    }
}

module.exports = function (req, res) {
    let checkEmail = req.body.email
    let sqlSelect = `select * from user where email ='${ checkEmail }'`
    acak()
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tested.email.tes@gmail.com',
            pass: 'testedemail123'
        }
    })

    conn.query(sqlSelect, async (error, rows, results) => {
        //get password lama dan email
        rows.map((item) => {
            (
                email = item.email
            ),(
                id = item.id_user
            )
        })

        if(email == checkEmail){
            let mailOptions = {
                from: 'bc764652ad-251e39@inbox.mailtrap.io',
                to: `juwar@etlgr.com, ${ email }`,
                subject: 'Reset Password',
                text: 'Code Verification is ' + random
            }
    
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(random)
                    res.send({
                        code: random,
                        id: id,
                    })
                    console.log('Email sent: ' + info.response);
                }
            });
        } else if ( checkEmail == '' ){
            res.send({
                message: 'Email not be null'
            })
        } else {
            res.send({
                message: 'Email not found'
            })
        }

    })

};

