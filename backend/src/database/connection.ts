import knex from 'knex';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

export default {
    Ong: (): knex.QueryBuilder => connection('ongs'),
};
