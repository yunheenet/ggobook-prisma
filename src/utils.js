import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";
import axios from "axios";
import "./env";

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
    html: `Hello! Your login secret is <strong>${secret}</strong><br/>Copy paste on the app/Website to log in`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

export const requestInterparkBookSearch = async isbn => {
  const INTERPARK_KEY = process.env.INTERPARK_KEY;
  const query = `http://book.interpark.com/api/search.api?key=${INTERPARK_KEY}&query=${isbn}&queryType=isbn&output=json`;

  try {
    const {
      data: { item }
    } = await axios.get(query);

    if (item.length == 0) {
      throw Error("Can't find this book.");
    }

    return item[0];
  } catch (e) {
    console.log(e);
    throw Error("Request fail.");
  }
};
