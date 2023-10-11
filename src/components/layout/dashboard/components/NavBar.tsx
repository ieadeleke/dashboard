import { Avatar } from '@/components/image/Avatar'
import { DEFAULT_PROFILE_URL } from '@/utils/constants/strings'
import NotificationIcon from '../../../../assets/icons/ic_notification.svg'

export const NavBar = () => {
    return <div className="flex justify-end h-16 bg-white rounded-3xl px-8">

        <div className="flex items-center gap-6">
            <div className="text-gray-400 border border-gray-200 rounded-full p-2">
                <NotificationIcon className="w-6 h-6" />
            </div>

            <div className="flex gap-2">
                <Avatar className="w-10 h-10 object-center object-cover" src={DEFAULT_PROFILE_URL} />

                <div className="flex flex-col">
                    <h1 className="text-sm font-bold">Maruf Aregbesola</h1>
                    <p className="text-sm text-gray-300">marouf@laswa.com</p>
                </div>
            </div>
        </div>
    </div>
}