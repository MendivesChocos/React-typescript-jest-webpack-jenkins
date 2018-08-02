/**
 * All Tasks
 */

let kebot = require('kebot');

kebot.task({
    alias:'component:create',
    entry: './tasks/component/create.js',
    description: 'Esta tarea crea un componente presentacional y su historia con storybook flag requerido --name\n    Por ejemplo "kb component:create --name MyComponent"\n'
});

kebot.task({
    alias:'component:delete',
    entry: './tasks/component/delete.js',
    description: 'Esta tarea elimina un componente presentacional y su historia flag requerido --name\n    Por ejemplo "kb component:delete --name MyComponent"\n'
});