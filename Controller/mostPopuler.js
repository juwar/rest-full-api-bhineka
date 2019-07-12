'use strict'

const conn = require('../Connection/connect')
module.exports = () => {
    let mostClick = 1
    let id = req.params.id
    let sql = `select * from product where id_product = ${ id }`
    conn.query(sql, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            rows.map((item) => {
                (mostClick += item.mostClick
            )})
            res.send({
                data: rows,
            })
        }
    })
}