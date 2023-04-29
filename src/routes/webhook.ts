import express from 'express';
import WebSocket from 'ws';
import axios from 'axios';


export const router = express.Router();

router.post('/register', (req, res) => {
  const { url } = req.body;
  registerWebhook(url);
  res.sendStatus(200);
});

router.post('/send', (req, res) => {
  const { message } = req.body;
  sendWebhook(message);
  res.sendStatus(200);
});



const registeredWebhooks: string[] = [];

export const registerWebhook = (url: string) => {
  registeredWebhooks.push(url);
};

export const sendWebhook = (message: string) => {
  registeredWebhooks.forEach(async (url) => {
    try {
      await axios.post(url, { message });
    } catch (error) {
      console.error(`Failed to send webhook to ${url}`, error);
    }
  });
};

const ws = new WebSocket('wss://example.com');

ws.on('open', () => {
  console.log('WebSocket connected');
});

ws.on('message', (data: any) => {
  const payment = JSON.parse(data);

  if (payment.type === 'payment') {
    const { public_key, amount } = payment;

    // TODO: Check if the payment is valid and send webhook event if it is
    if (public_key && amount) {
      sendWebhook(`Payment received: ${amount} from ${public_key}`);
    }
  }
});

ws.on('close', () => {
  console.log('WebSocket disconnected');
});

ws.on('error', (error: Error) => {
  console.error('WebSocket error', error);
});
