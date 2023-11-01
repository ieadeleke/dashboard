import { Avatar } from "@/components/image/Avatar"
import { DEFAULT_PROFILE_URL } from "@/utils/constants/strings"
import { faker } from '@faker-js/faker'

const image = faker.image.dataUri()
const name = faker.airline.airline().name
const username = faker.name.zodiacSign()
const count = faker.number.int({ min: 54, max: 1000 })

export const FleetItem = () => {

    return <div className="flex flex-col gap-4">
        <img src={image} className="bg-grey-200 object-cover object-center rounded-lg h-[400px]" />

        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-text-color text-xl md:text-2xl">{name}</h1>
                <p className="text-gray-600">{count} Passengers</p>
            </div>

            <div className="flex items-center gap-2">
                <Avatar src={DEFAULT_PROFILE_URL} className="w-8 h-8" />
                <p>@{username}</p>
            </div>

            <p className="text-text-color font-bold">Active</p>
        </div>
    </div>
}