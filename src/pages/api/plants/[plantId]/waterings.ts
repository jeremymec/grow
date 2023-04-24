import { waterPlant } from "@/services/watering_service";
import { getUserFromCode } from "@/services/user_service"
import { listPlantsOfUser } from "@/services/plant_service"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { plantId } = req.query;

  try {
    const user = await getUserFromCode(String(userCode));

    if (user){ 
        const usersPlants = await listPlantsOfUser(user.id);
        if (usersPlants.some(plant => {
            plant.id === Number(plantId);
        })) {
            waterPlant(Number(plantId));
            return res.status(200);
        } else {
            return res.status(403);
        }


    } else {
      return res.status(404);
    }

  } catch (err) {
    return res.status(501);
  }
}