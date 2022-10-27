require('dotenv').config()
const axios = require('axios');
const express = require('express')
const app = express()
const logger = require('./middlewares/logger')
var cors = require('cors');

// app.use(cors({ origin: 'localhost:3001', credentials: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
  console.log("Server is running.");
});

app.use(logger)
app.use(express.json());

let saFuelApi = axios.create({
  baseURL: "https://fppdirectapi-prod.safuelpricinginformation.com.au",
  headers: {
    Authorization: `FPDAPI SubscriberToken=${process.env.SAFUELAPI}`,
    'Content-type': 'application/json',
  }
})

app.get("/Subscriber/getCountryFuelTypes", function (req, res) {
  saFuelApi(`/Subscriber/GetCountryFuelTypes?countryId=21`).then(({ data }) => {
    res.send(JSON.stringify(data))
  })
})

app.get("/Subscriber/getCountryGeographicRegions", function (req, res) {
  saFuelApi(`/Subscriber/GetCountryGeographicRegions?countryId=21`).then(({ data }) => {
    res.send(JSON.stringify(data))
  })
})

app.get("/Price/getSitesPrices", function (req, res) {
  saFuelApi(`/Price/GetSitesPrices?countryId=21&geoRegionLevel=3&geoRegionId=4`).then(({ data }) => {
    res.send(JSON.stringify(data))

  })
})

app.get("/Subscriber/getCountryBrands", function (req, res) {
  saFuelApi(`/Subscriber/GetCountryBrands?countryId=21`).then(({ data }) => {
    res.send(JSON.stringify(data))
  })
})

app.get("/Subscriber/getFullSiteDetails", function (req, res) {
  saFuelApi(`/Subscriber/GetFullSiteDetails?countryId=21&geoRegionLevel=3&geoRegionId=4`).then(({ data }) => {
    console.log()
    res.send(JSON.stringify(data))
  })
})
if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}
