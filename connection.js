import mongoose from "mongoose";
import mdbMS from "mongodb-memory-server"

const mongoServer = new mdbMS.MongoMemoryServer();
let promise;
mongoose.Promise = Promise;

const connect = () => {
    return mongoServer.getUri('events')
        .then((mongoUri) => {
            const mongooseOpts = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };

            mongoose.connect(mongoUri, mongooseOpts);

            mongoose.connection.on('error', (e) => {
                promise = null;
                if (e.message.code === 'ETIMEDOUT') {
                    console.log(e);
                    mongoose.connect(mongoUri, mongooseOpts);
                }
                console.log(e);
            });

            mongoose.connection.once('open', () => {
                promise = null;
                console.log(`MongoDB successfully connected to ${mongoUri}`);
            });

            return mongoose;
        });
}

const forExport = () => {
    if(promise){
        return promise;
    }
    promise = connect();
    return promise;
}

promise = forExport()

export {promise}
