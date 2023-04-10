import { User } from "@/models/user";
import { getDBConnection } from "../database";
import { connect, Connection } from '@planetscale/database'
import { generateUserCode } from "../helpers/user_code";
const conn = getDBConnection();

const listUsers = async (): Promise<User[]> => {
    const query = await conn.execute('SELECT * FROM users;');
    const users = query.rows as User[];
    console.log(users[0].code);
    return query.rows.map(row => row as User);
}

const createUser = async (): Promise<User> => {
    
    const code = generateUserCode();
    console.log("Generated code is ", code)

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

export { listUsers, createUser }