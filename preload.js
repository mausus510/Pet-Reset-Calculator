// preload.js
const { contextBridge } = require('electron');
const path = require('path');

contextBridge.exposeInMainWorld('electron', {
  path: path,
  images: {
    milk: path.join(__dirname, 'images/milk.png'),
    juice: path.join(__dirname, 'images/juice.png'),
    coffee: path.join(__dirname, 'images/coffee.png'),
    soda: path.join(__dirname, 'images/soda.png'),
    cola: path.join(__dirname, 'images/cola.png'),
    champagne: path.join(__dirname, 'images/champagne.png'),
    water: path.join(__dirname, 'images/water.png'),
    'chicken essence': path.join(__dirname, 'images/chicken_essence.png'),
    'ginseng soup': path.join(__dirname, 'images/ginseng_soup.png'),
    default: path.join(__dirname, 'images/default.png')
  }
});
