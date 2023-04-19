import { User } from "@/models/user";
import { Plant } from "@/models/plant";
import { getDBConnection } from "../database";

const conn = getDBConnection();

const listPlantsOfUser = async (user_id: number): Promise<Plant[]> => {
    const sql = `SELECT * FROM plants WHERE user_id = ${user_id}`
    const query = await conn.execute(sql);

    return query.rows as Plant[];
}

export { listPlantsOfUser }