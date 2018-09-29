//=======================
// PORT
//=======================

process.env.PORT = process.env.PORT || 3000;

//=======================
// Entorno
//=======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=======================
// DB
//=======================

let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = 'mongodb://coffe-user:davamc86@ds115533.mlab.com:15533/db_coffee';
}


process.env.URLDB = urlDB;

