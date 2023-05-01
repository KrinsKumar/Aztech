let mongoose = require('mongoose');
let database = require('./database.js');

let Userdb;

exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(process.env.MONGO_CONNECTION_STRING);

        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            user = db.model("user", database.userSchema);
            resolve();
        });
    });
};

exports.registerUser = function (data) {
    return new Promise((resolve, reject) => {
        //if the password do not match or the data is empty
        if ((data.password != data.password2) || !data) {
            reject("Passwords do not match");
        }

        let newUser = new Userdb(data);
        newUser.save((err) => {
            if (err) {
                reject(err);
            } else {
                resolve(`new user: ${newUser.userName} successfully registered`);
            }
        });
    });
};