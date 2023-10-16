import { faker } from "@faker-js/faker"
import { request } from "../../request"
import { GetAllUserResponse } from "./types"



export function UserService() {

    async function getAllUsers() {
        const { data } = await request(`api/v1/admin/user/GetAllUsers`, "GET")
        const _data = (data as GetAllUserResponse)
        return Object.assign({}, _data, {
            Users: _data.Users.map((user) => ({ ...user, image: faker.image.url() }))
        })
    }

    return {
        getAllUsers
    }

}