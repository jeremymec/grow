import { getUserFromCode } from "@/services/user_service";
import { headers } from 'next/headers';
import { listPlantsOfUser } from "@/services/plant_service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  const headersList = headers();
  const referer = headersList.get('authorization');

  try {
    const user = await getUserFromCode(String(userCode));

    if (user){ 
        return res.json(await listPlantsOfUser(user.id))
    } else {
      return res.status(404);
    }

  } catch (err) {
    return res.status(501);
  }
}