const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 8000;

const connection = mysql.createConnection({
    host: "127.0.0.1",
    // prot: "3306",非推奨らしいので書かない
    database: "cafe_db",
    user: "root",
    password: "root",
})

app.get('/',(req,res)=>{
    res.send("テスト用");
})

app.get('/api',async(req,res)=>{
    try {
            const [results] = await connection.query('select * from tokyo limit 10;');
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.status(201).json({msg: results});
    } catch (error) {
            console.log('mysqlの接続エラー'); 
            res.status(500).json({msg: error})
    }
    
})

app.listen(port, ()=>{
    console.log(`サーバーがポート${port}番で稼働してます。`)
})