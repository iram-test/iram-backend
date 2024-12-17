import dotenv from "dotenv";
import Fastify from 'fastify'
dotenv.config();

const fastify = Fastify({
    logger: true
  })

  console.log("Hello World");