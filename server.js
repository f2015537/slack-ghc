const conString = require('./config/keys').mongoURI
const express = require('express')

const app = express()
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const nodeMailer = require('nodemailer')
const mongoose = require('mongoose')
const User = require('./models/User')

mongoose.Promise = global.Promise
mongoose.connect(conString)


app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/main.html`)
})

app.use(express.static('public'))

app.post('/addname', (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.sendFile(`${__dirname}/response.html`)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'communitystaff@anitab.org',
      pass: ''
    }
  })
  const mailOptions = {
    from: '<communitystaff@anitab.org>', // sender address
    to: req.body.name, // list of receivers
    subject: 'Join the GHC slack channel !', // Subject line
    text: 'Hell', // plain text body
    html: '<img src ="http://abetteruserexperience.com/wp-content/uploads/2016/07/slack.png" > <br> <br><br><h1> Join GHC18 on Slack</h1><br><img src="https://ci5.googleusercontent.com/proxy/fyAoFvPyo0eYUKe4_VolitANLFrpYnGlA9dPRAn9Thn2P-RtFZBrniNkAu7FEmEg_j-XJ5-p40WabZ2smDC0Ava2DFzgnTXUyxPRRi5doXPnr-vKqfniYrZ7BdVMgjXh-2uPUhhLM3EK5qWWF6YjgV0n2yqQ0Q0u8Om6v6mWM0eh=s0-d-e1-ft#https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2017-10-03/251165127045_b5f26f2478857e3c6557_88.jpg"><a href="https://ghc17.slack.com/"><h2>Click here to join the slack channel</h2></a>'
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }

    res.render('index')
  })
})

app.listen(PORT, () => {
  console.log('now listening on port 5000!')
})
