const jsonServer = require('json-server');
const multer  = require('multer');
const server = jsonServer.create();
const router = jsonServer.router(__dirname + '/db.json');
const middlewares = jsonServer.defaults();
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage: storage });

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

//add multer upload file
server.use(upload.single('file'));

//custom routes
server.get('/project/bank', (req,res) => {
    res.jsonp(router.db.__wrapped__.projectBank[0]);
});

server.get('/project/state', (req,res) => {
    res.jsonp(router.db.__wrapped__.projectStatus[0]);
});

server.get('/project/property', (req,res) => {
    res.jsonp(router.db.__wrapped__.projectType[0]);
});

server.get('/ubigeo/departments', (req,res) => {
    res.jsonp(router.db.__wrapped__.projectDepartament[0]);
});

// Use default router
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running!');
    console.log('Source:', router.db.source);
});