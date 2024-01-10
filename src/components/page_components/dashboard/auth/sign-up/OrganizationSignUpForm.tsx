import { RegularTextInput } from "@/components/input/RegularTextInput";
import { TextField } from "@/components/input/InputText";
import { IconButton } from "@/components/buttons/IconButton";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import Button from "@/components/buttons";

export const OrganizationSignUpForm = () => {
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
            <p className="font-semibold">Company Name:</p>
            <RegularTextInput />
        </div>

        <div className="w-full">
            <p className="font-semibold">Company Email Address:</p>
            <RegularTextInput />
        </div>

        <div className="w-full">
            <p className="font-semibold">Company Registration Number:</p>
            <RegularTextInput />
        </div>

        <div className="w-full">
            <p className="font-semibold">Company Phone Number:</p>
            <RegularTextInput />
        </div>

        <div className="w-full">
            <p className="font-semibold">Name of Contact Person:</p>
            <RegularTextInput />
        </div>

        <div className="w-full">
            <p className="font-semibold">Phone Number of Contact Person:</p>
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
                <Button variant="text">Login</Button>
            </div>
        </div>
    </div>
}