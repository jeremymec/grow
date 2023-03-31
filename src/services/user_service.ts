import { User } from "@/models/user";
import { getDBConnection } from "../database";
import { connect, Connection } from '@planetscale/database'
const conn = getDBConnection();

const listUsers = async (): Promise<User[]> => {
    const query = await conn.execute('SELECT * FROM users;');
    const users = query.rows as User[];
    console.log(users[0].code);
    return query.rows.map(row => row as User);
}

export { listUsers }