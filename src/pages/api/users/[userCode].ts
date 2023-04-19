import { createUser, getUserFromCode } from "@/services/user_service"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userCode } = req.query;

  try {
    const user = await getUserFromCode(String(userCode));

    if (user){ 
      return res.status(200).json(user);
    } else {
      return res.status(404);
    }

  } catch (err) {
    return res.status(501);
  }
}