import express from 'express';
import axios from 'axios';
import * as web3 from '@solana/web3.js';
import dotenv from "dotenv"


export const router = express.Router();

dotenv.config()

const connection = new web3.Connection(process.env.RPC_URL as string, {
  wsEndpoint: process.env.WS_URL,
});

router.post('/register', (req, res) => {
  const { reference } = req.body

  const publicKey = new web3.PublicKey(reference)

  const id = connection.onAccountChange(publicKey, async (updatedAccountInfo, context) => {
    console.log("Updated account info: ", updatedAccountInfo)
    axios.post("https://discord.com/api/webhooks/1102154954359177338/Ot35cV8vBytWkJvdN5CIY_VmDEk1eA1_nKHc0QgdfEcoxL-u189Sd-HdG-AUELR0Q44q",
      {
        username: "Change Made",
        avatar_url: "",
        content: reference,
        embeds: [
          {
            "title": "Some title",
            "color": 15258703,
            "thumbnail": {
              "url": "",
            },
            "fields": [
              {
                "name": "Your fields here",
                "value": "Whatever you wish to send",
                "inline": true
              }
            ]
          }
        ]
      }
    )
    await connection.removeAccountChangeListener(id)
  },
    "confirmed"
  );
  res.send(200).json({ message: "Successfully registered webhook", reference_account: reference })
});
