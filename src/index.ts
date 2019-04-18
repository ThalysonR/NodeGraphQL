
import app from './app';
import db from './models';
import { normalizePort } from './utils/utils';
import { Server } from 'http';

const port = normalizePort(process.env.port || 3000);
const host = process.env.host || '127.0.0.1';


db.sequelize.sync()
    .then(() => {
        app.listen(port, host).then(({ url }) => {
            console.log(`🚀Server ready at ${url}`);
        }).catch(onError);
    });

const onError = (server: Server) => {
    return (error: NodeJS.ErrnoException): void => {
        // @ts-ignore
        const port: number | string = server.address().port;
        if (error.syscall !== 'listen') { throw error; }
        const bind = (typeof port === 'string') ? `pipe ${port}` : `port ${port}`;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
};