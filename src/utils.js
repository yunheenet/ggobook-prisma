import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = email => {
  const options = {
    auth: {
      api_key: process.env.SENDGRID_KEY
    }
  };
  const client = nodemailer.createTransport(sendGridTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "ggobooking@gmail.com",
    to: address,
    subject: "🔐Login Secret for GgoBook🔐",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/Website to log in`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
