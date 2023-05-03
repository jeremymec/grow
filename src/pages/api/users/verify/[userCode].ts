import { User } from "@/models/user";
import { getUserFromCode } from "@/services/user_service"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userCode } = req.query;

  try {
    
    const user = verifyUser(String(userCode));

    if (user){ 
      return res.status(200).json(user);
    } else {
      return res.status(404);
    }

  } catch (err) {
    return res.status(501);
  }
}

export const verifyUser = async (userCode: string): Promise<User | null> => {
  return await getUserFromCode(userCode);
}