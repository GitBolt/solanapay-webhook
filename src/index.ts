import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as webhookRouter } from './routes/webhook'

dotenv.config()

const app = express();
const port = process.env.PORT || '8000';

app.use(cors())
app.use("/webhook", webhookRouter)

app.get('/', (req: Request, res: Response) => {
  return res.send("gm")
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});