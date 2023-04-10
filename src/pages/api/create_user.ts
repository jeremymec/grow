import { createUser } from "@/services/user_service"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await createUser();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(501);
  }
}