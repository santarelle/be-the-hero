import Incident from '../../database/models/incident.model';
import connection from '../../database/connection';

class ProfileService {
    findIncidents = async (ongId: string): Promise<Incident[]> => {
        return await connection.Incident().where('ong_id', ongId);
    };
}

export default new ProfileService();
