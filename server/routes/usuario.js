const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/usuario');
const app = express();

app.get('/usuario', (req, res) => {

    let start = req.query.start || 0;
    start = Number(start);

    let limited = req.query.limited || 5;
    limited = Number(limited);

    User.find({ status: true }, 'name email role status google img').skip(start).limit(limited).exec( ( err, users ) => {
        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        User.count({ status: true }, (err, count) => {
            res.json({
                ok: true,
                users,
                count
            });
        });

    });
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10),
        role: body.role
    });

    user.save( (err, userDB) => {

        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // userDB.password = undefined;

        res.json({
            ok: true,
            user: userDB
        });

    });

});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick( req.body, ['name', 'email', 'img', 'role', 'status'] );

    User.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, userDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            user: userDB
        });
    });
});

app.delete('/usuario/:id', (req, res) => {
    
    let id = req.params.id;

    let changeStatus = {
        status: false
    };

    User.findByIdAndUpdate( id, changeStatus,{ new: true },( err, userDelete ) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if ( !userDelete ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'user not found'
                }
            });
        }

        res.json({
            ok: true,
            user: userDelete
        });

    });


});

module.exports = app;