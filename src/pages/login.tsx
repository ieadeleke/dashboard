import { Layout } from "@/components/layout";
import Logo from "@/assets/icons/ic_logo.svg";
import Button from "@/components/buttons";
import { useState } from "react";
import { RegularTextInput } from "@/components/input/RegularTextInput";
import { TextField } from "@/components/input/InputText";
import { IconButton } from "@/components/buttons/IconButton";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)

    function toggleShowPassword() {
        setShowPassword((value) => !value)
    }

    return <Layout>
        <div className="flex flex-col gap-8">
            <div className="flex items-center">
                <Logo className="text-primary" />
                <div className="flex-1" />
                <Button variant="text" className="text-black underline">Close this page</Button>
            </div>

            <div className="flex flex-col self-center items-center w-[500px] gap-4 mt-16">
                <div className="flex flex-col gap-3 text-center">
                    <h1 className="font-bold text-2xl">Login to your Account</h1>
                    <p className="text-gray-500">Welcome back! Please enter your details</p>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <div>
                        <p className="font-semibold">Email Address:</p>
                        <RegularTextInput />
                    </div>

                    <div>
                        <p className="font-semibold">Confirm Password:</p>
                        <TextField.Container className="bg-white outline outline-1 outline-gray-200">
                            <TextField.Input />
                            <IconButton onClick={toggleShowPassword}>
                                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                            </IconButton>
                        </TextField.Container>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button>Sign In</Button>
                        <div className="flex items-center justify-center">
                            <p>{`Don't`} have an account?</p>
                            <Link href="/signup">
                                <Button variant="text">SignUp</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}