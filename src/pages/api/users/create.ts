import { createUser } from "@/services/user_service"
import { createPlantForUser } from "@/services/plant_service";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await createUser();

    res.setHeader("Set-Cookie", `UserCode ${user.code}`)

    await createPlantForUser(user.id);

    return res.status(200).json(user.id);
  } catch (err) {
    return res.status(501);
  }
}