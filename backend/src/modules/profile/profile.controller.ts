import {
    Request,
    ResponseToolkit,
    ResponseObject,
    ServerRoute,
} from '@hapi/hapi';

import ProfileService from './profile.service';

class ProfileController {
    routes = (): ServerRoute[] => [
        {
            method: 'GET',
            path: '/profile',
            handler: this.index,
        },
    ];

    index = async (
        req: Request,
        h: ResponseToolkit,
    ): Promise<ResponseObject> => {
        const ongId = req.headers.authorization;
        const data = await ProfileService.findIncidents(ongId);
        return h.response(data);
    };
}

export default new ProfileController();
