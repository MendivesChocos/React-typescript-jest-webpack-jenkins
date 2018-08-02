/**
 * @description Task component:delete
 * @argument name
 * @author Juan Pablo
 */

const fs      = require('fs');
const path    = require('path');
const rimraf  = require('rimraf');

const nameComponent = process.env.name;
const strComponent  = './src/Components';
const strStorie     = './stories';
const pathComponent = path.resolve(strComponent, nameComponent);
const pathStorie    = path.resolve(strStorie, nameComponent);

if(!nameComponent) {
    console.log('the flag "--name" is required');
    process.exit();
}

if(nameComponent === 'true') {
    console.log('value is required. Example --name MyComponent');
    process.exit();
}

if(!fs.existsSync(pathComponent)) {
    console.log(`[component:not delete] Component "${nameComponent}" Not exist `);
    process.exit();
}

// remove  Component
rimraf(pathComponent, ()=>console.log(`[component:remove] ${pathComponent}`));
rimraf(pathStorie, ()=>console.log(`[storie:remove] ${pathStorie}`));