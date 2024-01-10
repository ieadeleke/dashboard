import { RegularTextInput } from "@/components/input/RegularTextInput";
import { TextField } from "@/components/input/InputText";
import { IconButton } from "@/components/buttons/IconButton";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import Button from "@/components/buttons";
import Link from "next/link";

export const IndividualSignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)

    function toggleShowPassword() {
        setShowPassword((value) => !value)
    }

    function toggleShowPassword1() {
        setShowPassword1((value) => !value)
    }

    return <div className='flex flex-col gap-4'>
        <div className="w-full">
            <p className="font-semibold">First Name:</p>
            <RegularTextInput />
        </div>

        <div className="w-full">
            <p className="font-semibold">Last Name:</p>
            <RegularTextInput />
        </div>

        <div className="w-full">
            <p className="font-semibold">Email Address:</p>
            <RegularTextInput />
        </div>

        <div className="w-full">
            <p className="font-semibold">Phone Number:</p>
            <RegularTextInput />
        </div>

        <div className="w-full">
            <p className="font-semibold">Password:</p>
            <TextField.Container className="bg-white outline outline-1 outline-gray-200">
                <TextField.Input />
                <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </IconButton>
            </TextField.Container>
        </div>

        <div className="w-full">
            <p className="font-semibold">Confirm Password:</p>
            <TextField.Container className="bg-white outline outline-1 outline-gray-200">
                <TextField.Input />
                <IconButton onClick={toggleShowPassword1}>
                    {showPassword1 ? <EyeIcon /> : <EyeOffIcon />}
                </IconButton>
            </TextField.Container>
        </div>

        <div className="w-full flex flex-col">
            <Button>Sign Up</Button>
            <div className="flex items-center justify-center gap-4">
                <p>Already have an account?</p>
                <Link href="/login">
                    <Button variant="text">Login</Button>
                </Link>
            </div>
        </div>
    </div>
}