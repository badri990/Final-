const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


require('./models/User');
require('./models/Topic');

require('./config/passport')(passport);


const index = require('./routes/index'); 
const auth = require('./routes/auth');
const topics = require('./routes/topics');

const keys = require('./config/keys');
const {stripTags, formatDate} = require('./helpers/hbs');


mongoose.connect(keys.mongoURI, 
 { useNewUrlParser: true } 
 )  
	.then(() => console.log('Database Connected!'))
	.catch(err => console.log(err));

mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({
	helpers: {
		stripTags: stripTags,
		formatDate: formatDate
	},
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false  
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});


app.use(express.static(path.join(__dirname, 'static')));
app.use('/', index);
app.use('/auth', auth);
app.use('/topics', topics);


const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Server is UP!!!');
});
