import {Inject, Singleton} from 'typescript-ioc';
import {AnnotationMappingProvider, Configuration, Session, SessionFactory} from 'hydrate-mongodb';
import {Place} from '../models/Place';
import {getLogger, Logger} from 'log4js';
import {Db, MongoClient} from 'mongodb';
import {Parameter} from '../config/Parameter';

@Singleton
export class ConnexionService {

    @Inject
    private mongoClient: MongoClient;
    @Inject
    private configuration: Configuration;
    private session: Session;
    private logger: Logger = getLogger('Connexion');
    private sessionPromise: any;

    private constructor () {
        const self = this;

        self.sessionPromise = new Promise((resolve, reject) => {
            self.configuration.addMapping(new AnnotationMappingProvider(Place));
            self.mongoClient.connect(ConnexionService.buildStringConnexion(), (error, connexion: Db) => {
                if (error) {
                    reject(error);
                }

                self.configuration.createSessionFactory(connexion, (error, sessionFactory: SessionFactory) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(sessionFactory.createSession());
                });
            });
        });
    }

    /**
     * @returns {string}
     */
    private static buildStringConnexion (): string {
        const stringConnexion: string = Parameter.connexion.PROTOCOL + '://' +
            Parameter.connexion.SERVER + ':' +
            Parameter.connexion.PORT + '/' +
            Parameter.connexion.NAME;

        getLogger('Connexion').info(`String connexion: ${stringConnexion}`);
        return stringConnexion;
    }

    /**
     * @param callback
     */
    public getSessionFactory (callback: Function): void {
        const self = this;

        if (self.session instanceof Object) {
            callback(self.session);
            return;
        }

        self.sessionPromise.then((session: Session) => {
            callback(session);
        }).catch((error) => {
            self.logger.warn(error);
            callback(null, error);
        });
        return;
    }
}
