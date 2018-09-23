const express = require('express');
var app = express();
const port = process.env.PORT || 3000; // if the process.env does not exist, we will set the port to 3000
const hbs = require("hbs");

// req => request
// res => response


hbs.registerPartials(__dirname + "/views/partials");


// We set the view engine to handlebars
app.set("view engine","hbs"); 

// To serve static files such as 
// images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
// __dirname has the route path.
app.use(express.static(__dirname + '/public'));

// This is the helper
// Express first check the helper, if there is no helper than express check the variable with that name
// here the helper is the 'year', this is what the express check the helper name, if not present then
// the variable with that name
hbs.registerHelper("year",() => {
    return new Date().getFullYear();
});

// We can also pass the arguments in the helper
hbs.registerHelper("upSize",(content) => {
    return content.toUpperCase();
});


app.get('/', (req, res) => {
    // .render function provides the template
    // 2nd para. we have the object, we set the keys and values, place the keys in template (html)
    res.render("home.hbs",{
        // this object values are injected into the view 'home.hbs'
        // we are using the obj variables by setting via hbs in partials 
        pageTitle: "Home",
        Wow: "HomePage",
        someText: "Welcome to my homepage"       
    });
});

app.get('/about', (req,res) => {
    res.render("about.hbs",{
        pageTitle: "About",
        aboutHeading: "About Page",
        someText: "SOme about text"
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMsg: 'Sorry Error 404!'
    });
});

// localhost port# 3000
app.listen(port, () => {
    console.log(`The Server Stared!! ${port}`);
});