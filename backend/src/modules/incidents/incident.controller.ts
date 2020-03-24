/* eslint-disable @typescript-eslint/camelcase */
import {
    ServerRoute,
    Request,
    ResponseToolkit,
    ResponseObject,
} from '@hapi/hapi';

import Incident from '../../database/models/incident.model';
import IncidentService from './incident.service';
import { UnauthorizedError } from '../../errors/errors';

class IncidentController {
    routes = (): ServerRoute[] => [
        {
            method: 'GET',
            path: '/incidents',
            handler: this.index,
        },
        {
            method: 'POST',
            path: '/incidents',
            handler: this.create,
        },
        {
            method: 'DELETE',
            path: '/incidents/{id}',
            handler: this.delete,
        },
    ];

    index = async (
        req: Request,
        h: ResponseToolkit,
    ): Promise<ResponseObject> => {
        const { page }: any = req.query;
        const data = await IncidentService.find(page);
        const count = await IncidentService.count();
        return h.response(data).header('X-Total-Count', String(count));
    };

    create = async (
        req: Request,
        h: ResponseToolkit,
    ): Promise<ResponseObject> => {
        const { title, description, value } = req.payload as Incident;
        const ongId = req.headers.authorization;

        const data = await IncidentService.create({
            title,
            description,
            value,
            ong_id: ongId,
        } as Incident);

        return h.response(data);
    };

    delete = async (
        req: Request,
        h: ResponseToolkit,
    ): Promise<ResponseObject> => {
        const { id } = req.params;
        const ongId = req.headers.authorization;
        try {
            await IncidentService.delete(parseInt(id), ongId);
        } catch (e) {
            if (e instanceof UnauthorizedError) {
                return h.response({ error: e.message }).code(401);
            }
            return h.response({ error: e.message }).code(500);
        }
        return h.response().code(204);
    };
}

export default new IncidentController();
