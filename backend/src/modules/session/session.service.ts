import connection from '../../database/connection';

import { NotFountError } from '../../errors/errors';

class SessionService {
    login = async (ongId: string): Promise<{ name: string }> => {
        const ong = connection.Ong().where('id', ongId).select('name').first();

        if (!ong) {
            throw new NotFountError('No ONG found with this id');
        }

        return ong;
    };
}

export default new SessionService();
