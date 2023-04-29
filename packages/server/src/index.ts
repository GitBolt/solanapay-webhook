import express from 'express';
import { Request, Response } from 'express';


const app = express();
const port = process.env.PORT || '8000';

app.get('/', (req: Request, res: Response) => {
  return res.send("gm")
})

app.listen(port, () => {
  // if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});