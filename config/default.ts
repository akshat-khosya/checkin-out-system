import env from 'dotenv';
import log from '../src/logger';

class Config {
    _config: Record<string, any>;
    constructor() {
        env.config();
        this._config = {
            port: process.env.PORT,
            host: process.env.HOST || "localhost",
            dbUri: process.env.DB_URI,
            saltWorkFactor: 10,
            accessTokenTtl: "15m",
            refreshTokenTtl: "30d",
            privateKey: process.env.PRIVATE_KEY,
            googleId: process.env.ID,
            googleSecret: process.env.SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            email: "20106@iiitu.ac.in"
        };

        
    }

    get(key: string): any {
        const val: any = this._config[key] ?? null;

        if (!val) {
            throw new Error(`Config for key [${key}] not found`);
        }

        return val;
    }
    set(key: string, val: any): void {
        this._config[key] = val;
    }
}


const config = new Config();

export default config;