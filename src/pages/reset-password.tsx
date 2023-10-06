import AuthLayout from "@/components/layout/AuthLayout";
import LogoIcon from '@/assets/icons/ic_logo.svg'
import { TextField } from "@/components/input/InputText";
import Button from "@/components/buttons";
import { useState } from "react";

export default function ResetPassword() {
    const [isFocused, setIsFocused] = useState(false)

    function onBlur(){
        setIsFocused(false)
    }

    function onFocused(){
        setIsFocused(true)
    }

    return <AuthLayout>
        <div className="flex flex-col items-center min-h-screen justify-center py-8">

            <div className="flex flex-col gap-8 w-full px-2 md:w-[400px]">
                <div className="flex flex-col gap-4">
                    <LogoIcon className="self-center" />
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="font-bold text-2xl md:text-3xl text-primary">Forgot Password?</h1>
                        <p className="text-[#666666]">Control Center</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-[#3F3F3F]">Enter your email</p>
                        <TextField.Container className={`bg-white rounded-2xl ${isFocused ? 'border border-primary' : ''}`}>
                            <TextField.Input type="email" onBlur={onBlur} onFocus={onFocused} />
                        </TextField.Container>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Button className="py-4 rounded-2xl" variant="contained">Send Password Reset Link</Button>
                </div>

            </div>
        </div>
    </AuthLayout>
}