import crypto from 'crypto';

import connection from '../../database/connection';
import Ong from '../../database/models/ong.model';

class OngService {
    create = async (ong: Ong): Promise<{ id: string }> => {
        const id = crypto.randomBytes(4).toString('HEX');
        ong.id = id;
        await connection.Ong().insert(ong);

        return { id };
    };

    find = async (): Promise<Ong[]> => {
        return await connection.Ong().select('*');
    };
}

export default new OngService();
