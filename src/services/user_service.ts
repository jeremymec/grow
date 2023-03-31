import { User } from "@/models/user";
import { getDBConnection } from "../database";

const conn = getDBConnection();

const listUsers = async (): Promise<User[]> => {
    const query = conn.execute('SELECT * FROM users');

    const data = query.then(res => {
        return res.rows.map(row => {
            return {
                id: 
            }
        })
    });
}

export { listUsers }