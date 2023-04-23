import { Plant } from "@/models/plant";
import { getDBConnection } from "../database";

const conn = getDBConnection();

const listPlantsOfUser = async (user_id: number): Promise<Plant[]> => {
    const sql = `SELECT * FROM plants WHERE user_id = ${user_id}`
    const query = await conn.execute(sql);

    return query.rows as Plant[];
}

const createPlantForUser = async (user_id: number): Promise<boolean> => {

    const sql = `INSERT INTO plants (type, user_id) VALUES ('default', ${user_id})`
    const query = await conn.execute(sql);

    return query.rowsAffected === 1;

}

export { listPlantsOfUser, createPlantForUser }