import { newUser } from "@/services/user_service"
import { createPlantForUser } from "@/services/plant_service";
import { NextApiRequest, NextApiResponse } from "next"
import { User } from "@/models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await createUser();

    res.setHeader("Set-Cookie", `UserCode ${user.code}`)

    return res.status(200).json(user.id);
  } catch (err) {
    return res.status(501);
  }
}

export const createUser = async (): Promise<User> => {
  const user = await newUser();
  await createPlantForUser(user.id);
  return user;
}