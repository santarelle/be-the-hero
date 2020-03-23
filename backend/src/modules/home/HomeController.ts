import {
    Request,
    ResponseToolkit,
    ResponseObject,
    ServerRoute,
} from '@hapi/hapi';

class HomeController {
    routes(): ServerRoute | ServerRoute[] {
        const routes: ServerRoute = {
            method: 'GET',
            path: '/home',
            handler: this.index,
        };
        return routes;
    }

    async index(req: Request, res: ResponseToolkit): Promise<ResponseObject> {
        return res.response('Hello World!!!');
    }
}

export default new HomeController();
