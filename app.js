import http from 'http'
import process from 'process'
import express from 'express'

import { config as env } from 'dotenv'

import morgan from './http/middlewares/morgan.js'
import api from './routes/api.js'
import Logger from './utils/logger.js'

env()

const app = express()

app.use(express.json())
app.use(morgan)
app.use(api)

const server = http.createServer(app)

server.listen(process.env.PORT)
Logger.info(`Server is running on port ${process.env.PORT}`)

const shutdownConfig = {
    timeout: 40000,
    signals: ['SIGINT', 'SIGTERM']
}
shutdownConfig.signals.forEach(signal => process.on(signal, onShutdown));

function onShutdown(s) {
    console.log('Shutdown signal received: ' + s + '. Closing the HTTP server...');
    shutdownConfig.signals.forEach(signal => process.off(signal, onShutdown));
    server.close(onClosed);
}
function onClosed() {
    console.log('HTTP server closed. Shutting down gracefully...');
    setTimeout(shutdown, shutdownConfig.timeout);
}
function shutdown() {
    process.exit(0);
}
