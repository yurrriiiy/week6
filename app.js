export default (express, bodyParser, fs, crypto, http) => {
    const app = express();

    app
    .use((r, res, next) => r.res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE"}) && next())
    .use(bodyParser.urlencoded({ extended: true }))
    .all('/req/', (req, res) => {
        const addr = req.method === 'POST' ? req.body.addr : req.query.addr;

        http.get(addr, (r, b = '') => {
            r
            .on('data', d => b += d)
            .on('end', () => res.send(b));
        });
    })
    .get('/login/', (req, res) => res.send('glebtretiak'))   
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .get('/sha1/:input/', (req, res) => res.send(crypto.createHash('sha1').update(req.params.input).digest('hex')))
    .all('/*', r => r.res.send('glebtretiak'));

    return app;
}
