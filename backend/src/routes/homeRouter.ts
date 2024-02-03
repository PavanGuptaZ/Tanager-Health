import express from "express";
import path from "path";

const router = express.Router()

router.all('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', '..', 'views', 'index.html'))
})

export default router