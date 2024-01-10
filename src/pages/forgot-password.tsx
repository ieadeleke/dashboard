import { Layout } from "@/components/layout";
import Logo from "@/assets/icons/ic_logo.svg";
import Button from "@/components/buttons";
import { RegularTextInput } from "@/components/input/RegularTextInput";
import Link from "next/link";

export default function ForgotPassword() {

    return <Layout>
        <div className="flex flex-col gap-8">
            <div className="flex items-center">
                <Logo className="text-primary" />
                <div className="flex-1" />
                <Button variant="text" className="text-black underline">Close this page</Button>
            </div>

            <div className="flex flex-col self-center items-center w-[500px] gap-4 mt-16">
                <div className="flex flex-col gap-3 text-center">
                    <h1 className="font-bold text-2xl">Forgot Password</h1>
                    <p className="text-gray-500">{`Don’t worry about it, happens to the best of us☺️`}</p>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <div>
                        <p className="font-semibold">Email Address:</p>
                        <RegularTextInput />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Link href="/create-new-password">
                            <Button>Send recovery link to email</Button>
                        </Link>
                        <div className="flex items-center justify-center">
                            <Link href="/login">
                                <Button variant="text" className="underline">Back to Sign in</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}