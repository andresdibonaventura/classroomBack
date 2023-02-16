const paypal = require('paypal-rest-sdk');
const { createUser } = require('./users.controllers');
const express = require('express');
const router = express.Router();


paypal.configure({
  mode: 'sandbox',
  client_id: 'Ae2KTa0ca7VyuTHl659s7ffe7hVylTZb8RYIPpb31yTbt1b-70S_3RJrd_K_pPmpgGTifZ0UpRXSu94-',
  client_secret: 'ECUWM4ga6l2VISC592uUbQE2iLsaIeQvbuZzHDyzE6fLKlCktm5tOZc6TST3ITRQI23IpeyvbR5k1Bd1'
});

const processPayment = (amount, description) => {
  return new Promise((resolve, reject) => {
    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      transactions: [{
        amount: {
          total: 70,
          currency: 'USD'
        },
        description: description
      }],
      redirect_urls: {
        return_url: 'https://classroom-ef3j.onrender.com/api/v1/success',
        cancel_url: 'https://classroom-ef3j.onrender.com/api/v1/cancel'
      }
    };
    
    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            resolve(payment.links[i].href);
            break;
          }
        }
      }
    });
  });
};
router.get('/success', async (req, res) => {
    // Procesar el pago de PayPal y crear el usuario
    const amount = 10; // Monto en dólares a cobrar por la registración
    const description = 'Registración de profesor';
    try {
      const redirectUrl = await processPayment(amount, description);
      const newUser = await createUser(req.body); // crea el usuario en la base de datos
      res.redirect(redirectUrl);
    } catch (error) {
      res.status(500).send(error);
    }
  });