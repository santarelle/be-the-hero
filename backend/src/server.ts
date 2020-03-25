import Hapi from '@hapi/hapi';

import ProfileController from './modules/profile/profile.controller';
import OngController from './modules/ongs/ong.controller';
import IncidentController from './modules/incidents/incident.controller';
import SessionController from './modules/session/session.controller';

class Server {
    private server: Hapi.Server | undefined;

    constructor() {
        this.server = new Hapi.Server({
            port: 3333,
            host: '0.0.0.0',
            routes: {
                cors: true,
            },
        });

        this.routes();
    }

    async init(): Promise<void> {
        await this.server?.start();
        console.log('Server running on %s', this.server?.info.uri);
    }

    async routes(): Promise<void> {
        this.server?.route(ProfileController.routes());
        this.server?.route(OngController.routes());
        this.server?.route(IncidentController.routes());
        this.server?.route(SessionController.routes());
    }
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

export default new Server();
