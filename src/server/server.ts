import express        = require('express');
import path           = require('path');
import bodyParser     = require('body-parser');
import cookieParser   = require('cookie-parser');
import compression    = require('compression');
import methodOverride = require('method-override');
import {configure, getLogger, levels, Logger, setGlobalLogLevel} from 'log4js';
import {ServerLoader}      from 'ts-express-decorators';

export class Server extends ServerLoader {

    private static logger: Logger;
    private rootDir: string;
    private env: string;
    private port: string;

    constructor() {
        super();

        this.rootDir = path.resolve(process.cwd());
        this.env = process.env.NODE_ENV || 'development';
        this.port = process.env.port || 3000;
        this.mount("/api", this.rootDir + "/src/controllers/**.js")
            .scan(this.rootDir + "/src/services/**.js")
            .scan(this.rootDir + "/src/converters/**.js")
            .scan(this.rootDir + "/src/middlewares/**.js")
            //.mountStaticDirectories()
            .createHttpServer(this.port)
            .createHttpsServer({
                port: 8080
            });
    }

    public $onMountingMiddlewares(): void|Promise<any> {
        let logLevel = this.env === 'development' ? levels.ALL : levels.ERROR ;
        configure(path.join(this.rootDir, 'src/config/log4js_configuration.json'));
        setGlobalLogLevel(logLevel);
        Server.logger = getLogger('server');

        this.use(cookieParser())
            .use(compression({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .set('views', path.join(this.rootDir, 'src/views'))
            .set('view engine', 'ejs')
            .engine('html', require('ejs').renderFile);

        return null;
    }

    public $onReady() {
        Server.logger.info("Application started. Listening on port: " + this.port);
    }

    public $onServerInitError(err) {
        Server.logger.error(err);
    }

    static Initialize = (): Promise<any> => new Server().start();
}

Server.Initialize();
