import http from 'http'
import process from 'process'
import express from 'express'

const app = express()

app.use(express.json())

const server = http.createServer(app)

server.listen(process.env.PORT)

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
