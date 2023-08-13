/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require('./data');
const http = require('http');
const hostname = 'localhost';
const port = 3035;
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
app.get('/store', (req, res) => {
  res.json(data);
  return data;
  const facets = req.query.facets;
  const searchText = req.query.searchText.toLowerCase();

  const resultsFromSearchText = data.filter(
    item => item.model.toLowerCase().indexOf(searchText) > -1
  );

  if (!facets) {
    const dataWithPosition = resultsFromSearchText.map((item, index) => ({
      ...item,
      position: index
    }));
    res.json(dataWithPosition);
    return;
  }

  const filteredResultsWithPosition = resultsFromSearchText
    .filter(
      item => facets.indexOf(item.brand) > -1 || facets.indexOf(item.type) > -1
    )
    .map((item, index) => ({
      ...item,
      position: index
    }));

  res.json(filteredResultsWithPosition);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log(`[Server running on ${hostname}:${port}]`);
