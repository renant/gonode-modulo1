const express = require('express')
const nunjuncks = require('nunjucks')

const app = express()

nunjuncks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const checkAgeQuery = (req, res, next) => {
  if (req.query.age && Number.isInteger(parseInt(req.query.age), 10)) {
    return next()
  }
  return res.redirect('/')
}

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${req.body.age}`)
  }
  return res.redirect(`/minor?age=${req.body.age}`)
})

app.get('/major', checkAgeQuery, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', checkAgeQuery, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.listen(3000)
