
import app from './app';
import db from './models';
import { normalizePort, onError } from './utils/utils';

const port = normalizePort(process.env.port || 3000);
const host = process.env.host || '127.0.0.1';


db.sequelize.sync()
    .then(() => {
        app.listen(port, host).then(({ url }) => {
            console.log(`🚀Server ready at ${url}`);
        }).catch(onError);
    });