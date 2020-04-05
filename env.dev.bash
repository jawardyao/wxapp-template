const fs = require('fs');
fs.writeFile('env.config.js', 'export const __ENV__ = "dev"', 'utf8', () => {console.log('success')});