const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express()

// port numer
const port = 3000

// connect to mongoDB
const dbURI = 'mongodb+srv://vishnu:test123@blog-site.ppdbt81.mongodb.net/blog-site?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then(result=> app.listen(port, ()=> {
    console.log(`Server running at port : ${port}`);
}))
.catch(error => console.log(error))


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res)=> {
//     const blog = new Blog({
//         title:  'new blog2',
//         snippet: 'about my new blog2',
//         body: 'more about my new blog2'
//     });

//     blog.save()
//     .then(result => res.send(result))
//     .catch(err => console.log(err))
// })

// app.get('/all-blogs', (req, res)=> {
//     Blog.find()
//     .then(result => res.send(result))
//     .catch(err => console.log(err))
// })

// app.get('/single-blog', (req, res)=> {
//     Blog.findById('635e52a2648aa33d7ac27f4f')
//     .then(result => res.send(result))
//     .catch(err => console.log(err))
// })

// routes
app.get('/', (req, res)=> {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
})

// blog routes
app.use('/blogs', blogRoutes)

app.use((req, res)=> {
    res.status(404).render('404', { title: "404" });
})