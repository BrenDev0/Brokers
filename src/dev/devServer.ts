import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = () => {
    app.listen(3000, () =>{
        console.log("Online");
    })
}
//s

server();