const fs = require('fs');
fs.writeFile('env.config.js', 'export const __ENV__ = "prod"', 'utf8', () => {console.log('success')});