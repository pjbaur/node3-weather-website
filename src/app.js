const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode-axios')
const forecast = require('./utils/forecast-axios')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Paul Baur'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Paul Baur'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Paul Baur',
    helpText: 'This is some helpful text.'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({
      error: 'You must provide an address.'
    })
  }

  geocode(address, (error, {longitude, latitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        location,
        forecast: forecastData,
        address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 help page not found',
    name: 'Paul Baur',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 page not found',
    name: 'Paul Baur',
    errorMessage: 'Page not found.'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})