const serveCSS = function (req, res) {
    if (req.url.indexOf('css') !== -1) {
        const css = fs.createReadStream(__dirname + req.url, 'utf8');
        css.pipe(res);
    }
};

const userRoute = function (req, res) {
        let username = req.url.replace('/', '');
        const miscUrls = req.url.indexOf('css') !== -1;
        if (username.length > 0 && !(miscUrls)) {
             // do stuff
        }

http.createServer((req, res) => {
        router.serveCSS(req, res);
        router.home(req, res);
        router.user(req, res); 
});
//this is some code i found.. trying to get css to work but not so far