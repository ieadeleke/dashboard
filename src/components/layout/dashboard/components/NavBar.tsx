import { Avatar } from '@/components/image/Avatar'
import UserContext from '@/context/UserContext'
import { DEFAULT_PROFILE_URL } from '@/utils/constants/strings'
import { useContext } from 'react'
import NotificationIcon from '../../../../assets/icons/ic_notification.svg'

export const NavBar = () => {
    const { user } = useContext(UserContext)
    
    return <div className="flex justify-end h-16 bg-white rounded-3xl px-8">

        <div className="flex items-center gap-6">
            <div className="text-gray-400 border border-gray-200 rounded-full p-2">
                <NotificationIcon className="w-6 h-6" />
            </div>

            <div className="flex gap-2">
                <Avatar className="w-10 h-10 object-center object-cover" src={DEFAULT_PROFILE_URL} />

                <div className="flex flex-col">
                    <h1 className="text-sm font-bold">{user?.firstName} {user?.lastName}</h1>
                    <p className="text-sm text-gray-300">{user?.email}</p>
                </div>
            </div>
        </div>
    </div>
}