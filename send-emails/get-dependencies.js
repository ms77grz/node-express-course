const { dependencies } = require('./package.json');

console.log(Object.keys(dependencies).join(' '));
