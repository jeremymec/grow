import { listUsers } from "@/services/user_service"

interface CreateUserResult {
    code: string
}

const createUser = () => {
    listUsers();
}

export { createUser }