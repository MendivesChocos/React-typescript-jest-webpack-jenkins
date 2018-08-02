/**
 * @description Task component:create
 * @argument name
 * @author Juan Pablo
 */

const fs      = require('fs');
const path    = require('path');
const globule = require('globule');

const nameComponent = process.env.name;
const strComponent  = './src/Components';
const strStorie     = './stories';
const strTemplate   = './tasks/component/template';
const pathComponent = path.resolve(strComponent, nameComponent);
const pathStorie    = path.resolve(strStorie, nameComponent);
const pathTemplate  = path.resolve(strTemplate);
const createFile    = (file, source)=>{
    let content = fs.readFileSync(file, 'utf-8').replace(/{{NAME}}/g, nameComponent);
    fs.writeFileSync(file.replace(pathTemplate, source).replace(/\.storie/, '').replace(/\.txt/, ''), content);
}

if(!nameComponent) {
    console.log('the flag "--name" is required');
    process.exit();
}

if(nameComponent === 'true') {
    console.log('value is required. Example --name MyComponent');
    process.exit();
}

if(fs.existsSync(pathComponent)) {
    console.log(`[component:exist] Component "${nameComponent}" exist `);
    process.exit();
}

// create  Component
console.log('[component:create] creating.. ', pathComponent);
fs.mkdirSync(pathComponent);
globule.find(pathTemplate+'/{index,index.spec}.tsx.txt').forEach(file=>createFile(file, pathComponent));

// create  Storie
console.log('[storie:create] creating.. ', pathStorie);
fs.mkdirSync(pathStorie);
globule.find(`${pathTemplate}/{index.,}storie.{md,tsx}.txt`).forEach(file=>createFile(file, pathStorie));