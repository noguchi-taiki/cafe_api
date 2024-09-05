const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 8000;
let connection;

(async()=>{
    connection = await mysql.createConnection({
        host: "127.0.0.1",
        // prot: "3306",非推奨らしいので書かない
        database: "cafe_db",
        user: "root",
        password: "root",
    })
})()

// app.get('/',(req,res)=>{
//     res.send("テスト用");
// })

app.get('/api',async(req,res)=>{
    const responce = await connection.query('SELECT * FROM tokyo limit 5')
    .then((responce)=>{
        responce = responce[0];//responceの2番目(1)のオブジェクトにはfield？(DBの型)が挿入されている
        console.log(responce);
        res.json(responce);
    })
})

app.listen(port, ()=>{
    console.log(`サーバーがポート${port}番で稼働してます。`)
})