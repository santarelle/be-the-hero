import Hapi from '@hapi/hapi';

import HomeController from './modules/home/HomeController';
import OngController from './modules/ongs/ong.controller';

class Server {
    private server: Hapi.Server | undefined;

    constructor() {
        this.server = new Hapi.Server({
            port: 3000,
            host: '0.0.0.0',
        });

        this.routes();
    }

    async init(): Promise<void> {
        await this.server?.start();
        console.log('Server running on %s', this.server?.info.uri);
    }

    async routes(): Promise<void> {
        this.server?.route(HomeController.routes());
        this.server?.route(OngController.routes());
    }
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

export default new Server();
