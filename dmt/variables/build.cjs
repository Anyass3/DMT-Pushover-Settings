const fs = require('fs');

let settings = fs.readFileSync('dmt/settings.json', 'utf-8');
settings = JSON.parse(settings);

// this is important as it passes the build path to the dmt installer
console.log(settings.build);
