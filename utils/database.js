const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(
        "mongodb+srv://newuser:SxT3jpNzP7qjz2Jw@cluster0.bykdf.mongodb.net/shop?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    )
        .then((client) => {
            // console.log(client);
            _db = client.db();
            callback(client);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
};
// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
