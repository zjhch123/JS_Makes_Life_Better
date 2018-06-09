const path = require('path');

module.exports = {
  appROOT: process.cwd(),
  appControllers: path.join(process.cwd(), 'controllers'),
  appPublic: path.join(process.cwd(), 'public'),
  appStatic: path.join(process.cwd(), 'public', 'static')
}