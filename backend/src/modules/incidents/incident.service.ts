import Incident from '../../database/models/incident.model';
import connection from '../../database/connection';
import { UnauthorizedError } from '../../errors/errors';

class IncidentService {
    create = async (incident: Incident): Promise<{ id: number }> => {
        const [id] = await connection.Incident().insert(incident);
        return { id };
    };

    find = async (page = 1): Promise<Incident[]> => {
        return await connection
            .Incident()
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf',
            ]);
    };

    count = async (): Promise<number> => {
        const [count] = await connection.Incident().count();
        return count['count(*)'];
    };

    delete = async (incidentId: number, ongId: string): Promise<void> => {
        const incident = await connection
            .Incident()
            .where('id', incidentId)
            .first();

        if (incident.ong_id !== ongId) {
            throw new UnauthorizedError('Operation not permitted');
        }

        await connection.Incident().where('id', incidentId).delete();
    };
}

export default new IncidentService();
