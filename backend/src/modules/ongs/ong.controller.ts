import {
    ServerRoute,
    Request,
    ResponseObject,
    ResponseToolkit,
} from '@hapi/hapi';

import OngService from './ong.service';
import Ong from '../../database/models/ong.model';

class OngController {
    routes = (): ServerRoute[] => {
        const routes: ServerRoute[] = [
            {
                method: 'GET',
                path: '/ongs',
                handler: this.index,
            },
            {
                method: 'POST',
                path: '/ongs',
                handler: this.create,
            },
        ];
        return routes;
    };

    index = async (
        req: Request,
        h: ResponseToolkit,
    ): Promise<ResponseObject> => {
        const data = await OngService.find();
        return h.response(data);
    };

    create = async (
        req: Request,
        h: ResponseToolkit,
    ): Promise<ResponseObject> => {
        const data = await OngService.create(req.payload as Ong);
        return h.response(data);
    };
}

export default new OngController();
