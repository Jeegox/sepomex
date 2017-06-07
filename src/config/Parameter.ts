export class Parameter {
    public static connexion: ConnexionConfigInterface = {
        PROTOCOL: "mongodb",
        SERVER: "localhost",
        PORT: 27017,
        NAME: "sepomex"
    }
}

interface ConnexionConfigInterface {
    PROTOCOL: string;
    SERVER: string;
    PORT: number;
    NAME: string
}
