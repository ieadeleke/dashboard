import { ApiResponse } from "@/models";
import { User } from "@/models/users";

export type GetAllUserResponse = ApiResponse & {
    Users: User[]
}