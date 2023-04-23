import { Plant } from "@/models/plant";
import { Watering } from "@/models/watering";
import { getDBConnection } from "../database";

const conn = getDBConnection();

const waterPlant = async (plant_id: number): Promise<boolean> => {

    const sql = `INSERT INTO waterings (plant_id) values (${plant_id})`;
    const query = await conn.execute(sql);

    return query.rowsAffected === 1;

}

const getWaterings = async (plant_id: number): Promise<Watering[]> => {

    const sql = `SELECT * FROM waterings WHERE plant_id = ${plant_id}`
    const query = await conn.execute(sql);

    return query.rows as Watering[];

}

export { waterPlant, getWaterings }