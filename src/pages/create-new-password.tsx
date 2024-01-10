import { Layout } from "@/components/layout";
import Logo from "@/assets/icons/ic_logo.svg";
import Button from "@/components/buttons";
import { RegularTextInput } from "@/components/input/RegularTextInput";

export default function CreateNewPassword() {

    return <Layout>
        <div className="flex flex-col gap-8">
            <div className="flex items-center">
                <Logo className="text-primary" />
                <div className="flex-1" />
                <Button variant="text" className="text-black underline">Close this page</Button>
            </div>

            <div className="flex flex-col self-center items-center w-[500px] gap-4 mt-16">
                <div className="flex flex-col gap-3 text-center">
                    <h1 className="font-bold text-2xl">Create New Password</h1>
                    <p className="text-gray-500">{`One more step and you are back into your account.`}</p>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <div>
                        <p className="font-semibold">New Password:</p>
                        <RegularTextInput />
                    </div>

                    <div>
                        <p className="font-semibold">Confirm New Password:</p>
                        <RegularTextInput />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button>Send recovery link to email</Button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}