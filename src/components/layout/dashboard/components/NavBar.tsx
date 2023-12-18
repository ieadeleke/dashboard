import { IconButton } from "@/components/buttons/IconButton";
import { Avatar } from "@/components/image/Avatar";
import BellIcon from '@/assets/icons/ic_notification_bell.svg'
import MailIcon from '@/assets/icons/ic_mail.svg'

export const NavBar = () => {
  return (
    <div className="flex justify-end h-20 bg-white px-8">
      <div className="flex items-center gap-4">
        <IconButton>
          <MailIcon className="w-7 h-7" />
        </IconButton>

        <IconButton>
          <BellIcon className="w-7 h-7" />
        </IconButton>

        <div className="flex items-center gap-2">
          <Avatar className="bg-gray-500 w-12 h-12" />
          <div>
            <h2 className="font-bold text-sm">Ashley</h2>
            <p className="text-sm">User</p>
          </div>
        </div>
      </div>
    </div>
  );
};
