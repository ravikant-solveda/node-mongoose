const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65965e1dc5a93d30906f849e')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://ravikant:yVaAU3XKsztWKbyn@cluster0.czucbsf.mongodb.net/shop'
  )
  .then(result => {
    User.findOne().then(user => {
      if(!user){
        const user = new User({
          name:'Maximus',
          email: 'abc@gmail.com',
          cart:{
            items : []
          }
        });
        user.save();
      }
    })
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
