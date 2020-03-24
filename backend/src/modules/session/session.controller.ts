import {
    ServerRoute,
    Request,
    ResponseToolkit,
    ResponseObject,
} from '@hapi/hapi';

import SessionService from './session.service';

import { NotFountError } from '../../errors/errors';

class SessionController {
    routes = (): ServerRoute[] => [
        {
            method: 'POST',
            path: '/login',
            handler: this.login,
        },
    ];

    login = async (
        req: Request,
        h: ResponseToolkit,
    ): Promise<ResponseObject> => {
        try {
            const { id } = req.payload as any;
            const data = await SessionService.login(id);
            return h.response(data);
        } catch (e) {
            if (e instanceof NotFountError) {
                return h.response({ error: e.message }).code(404);
            }
            if (e instanceof TypeError) {
                return h
                    .response({ error: "Missing 'id' on Request Body" })
                    .code(400);
            }
            return h.response({ error: e.message }).code(500);
        }
    };
}

export default new SessionController();
