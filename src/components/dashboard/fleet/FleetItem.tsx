import { Avatar } from "@/components/image/Avatar"
import { Fleet } from "@/models/fleets"
import { DEFAULT_PROFILE_URL } from "@/utils/constants/strings"
import { faker } from '@faker-js/faker'
import { useEffect, useState } from "react"


type FleetItemProps = {
    data: Fleet
}

export const FleetItem = (props: FleetItemProps) => {
    const { data } = props
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [username, setUsername] = useState('')
    const [count, setCount] = useState(0)

    useEffect(() => {
        const image = faker.image.dataUri()
        const name = faker.airline.airline().name
        const username = faker.name.zodiacSign()
        const count = faker.number.int({ min: 54, max: 1000 })
        setName(name)
        setUsername(username)
        setCount(count)
        setImage(image)
    }, [])

    return <div className="flex flex-col gap-4">
        <img src={image} className="bg-grey-200 object-cover object-center rounded-lg h-[400px]" />

        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-text-color text-xl md:text-2xl">{data.model}</h1>
                <p className="text-gray-600">0 Passengers</p>
            </div>

            <div className="flex items-center gap-2">
                <Avatar src={DEFAULT_PROFILE_URL} className="w-8 h-8" />
                <p>{data.User.firstName} {data.User.lastName}</p>
            </div>

            <p className="text-text-color font-bold">Active</p>
        </div>
    </div>
}