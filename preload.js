const { contextBridge } = require('electron');
const path = require('path');

const envArg = process.argv.find((arg) => arg.startsWith('NODE_ENV='));
const nodeEnv = envArg ? envArg.split('=')[1] : 'production';
console.log(`NODE_ENV: ${nodeEnv}`);

const isDev = nodeEnv === 'development';
const basePath = isDev
  ? path.join(__dirname, 'images')  // In development, images are located in the project directory
  : path.join(process.resourcesPath, 'images'); // In production, images are directly in the Resources/images folder

console.log('isDev:', isDev);
console.log('basePath:', basePath);

// Expose paths and images to the renderer process
contextBridge.exposeInMainWorld('electron', {
  path: path,
  images: {
    milk: path.join(basePath, 'milk.png'),
    juice: path.join(basePath, 'juice.png'),
    coffee: path.join(basePath, 'coffee.png'),
    soda: path.join(basePath, 'soda.png'),
    cola: path.join(basePath, 'cola.png'),
    champagne: path.join(basePath, 'champagne.png'),
    water: path.join(basePath, 'water.png'),
    'chicken essence': path.join(basePath, 'chicken_essence.png'),
    'ginseng soup': path.join(basePath, 'ginseng_soup.png'),
    default: path.join(basePath, 'default.png'),
  },
});
