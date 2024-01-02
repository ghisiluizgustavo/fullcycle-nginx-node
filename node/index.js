const express = require('express')
const faker = require('faker')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    multipleStatements: true
}

const mysql = require('mysql2')
const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
    connection.query(`
        INSERT INTO PEOPLE (NAME) VALUES ('${faker.name.firstName()}');
        SELECT ID, NAME FROM PEOPLE;`, 
    (error, results, fields) => {
      res.send(`
        <h1>Full Cycle</h1>
        <h2>Desafio Docker: nginx - nodejs - mysql</h2>
        <ul>
          ${results[1].map(el => `<li>${el.ID} - ${el.NAME}</li>`).join('')}
        </ul>
      `)
    })
})

app.listen(port, () => {
    console.log('Rodando na porta: ' + port)
})