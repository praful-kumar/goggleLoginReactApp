const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');
const cookiesParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('./User');
// const { default: GoogleLogin } = require('react-google-login');
const { OAuth2Client, IdentityPoolClient } = require('google-auth-library');
const { response } = require('express');

const client = new OAuth2Client('776803220214-2sebppvier2dbnam4qdh5r91dig3md5n.apps.googleusercontent.com')
mongoose.connect("mongodb+srv://praful1:Admin@123@cluster0.syfts.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('database Connected')
})

const app = express();

//middleWare----

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));





// controller
const googlelogin = (req, res) => {
    const { tokenId } = req.body;
    client.verifyIdToken({ idToken: tokenId, audience: '776803220214-2sebppvier2dbnam4qdh5r91dig3md5n.apps.googleusercontent.com' }).then(response => {
        const { email_verified, name, email } = response.payload;
        if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: 'somethig went wrong..'
                    })
                } else {
                    if (user) {
                        //signin data
                        const token = jwt.sign({ _id: user._id }, 'shhhhh', { expiresIn: '1d' });
                        const { _id, name, email } = user;
                        res.json({
                            token,
                            user: { _id, name, email }
                        })
                    } else {
                        let password = email + name;
                        let newuser = new User({ name, email, password });
                        newuser.save((err, data) => {
                            if (err) {
                                return res.status(400).json({
                                    error: 'somethig went wrong..'
                                })
                            } else {
                                //signin data
                                const token = jwt.sign({ _id: data._id }, 'shhhhh', { expiresIn: '1d' });
                                const { _id, name, email } = data;
                                res.json({
                                    token,
                                    user: { _id, name, email }
                                })
                                console.log('data', data)
                            }
                        })
                    }
                }
            })
        }

    })
}

// sign in auth
// const signin = (req, res) => {
//     const { email, password } = req.body;
//     User, findOne({ email }).exec((err, user) => {

//     })

//     const token = jwt.sign({ _id: user._id }, 'shhhhh', { expiresIn: '1d' });
//     const { _id, name, email } = user;
//     res.json({
//         token,
//         user: { _id, name, email }
//     })
// }


// Routes
app.post("/api/googlelogin", googlelogin)

/*------- midleware ends------ */







app.listen(4000, () => {
    console.log('Server Connected..')
});
