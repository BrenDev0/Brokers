import express from 'express';
import listingsRouter from './routes/listings';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/listings", listingsRouter);

const server = () => {
    app.listen(3000, () =>{
        console.log("Online");
    })
}

server();