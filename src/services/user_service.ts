import { User } from "@/models/user";
import { getDBConnection } from "../database";
import { generateUserCode } from "../helpers/user_code";

const conn = getDBConnection();

const listUsers = async (): Promise<User[]> => {
    const query = await conn.execute('SELECT * FROM users;');
    const users = query.rows as User[];
    console.log(users[0].code);
    return query.rows.map(row => row as User);
}

const newUser = async (): Promise<User> => {
    
    const code = generateUserCode();

    const sql = `INSERT INTO users (code) VALUES ('${code}')`
    const query = await conn.execute(sql);

    if (query.rowsAffected > 0) {
        return {
            id: Number(query.insertId),
            code: code
        }
    } else {
        throw new Error("Error occured when executing user create")
    }
}

const getUserFromCode = async (code: string): Promise<User | null> => {

    const sql = `SELECT * FROM users WHERE code='${code}'`
    const query = await conn.execute(sql);

    if (query.size === 1) {
        return (query.rows[0] as User)
    } else {
        return null;
    }

}

export { listUsers, newUser, getUserFromCode }