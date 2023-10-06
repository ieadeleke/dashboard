
import AuthLayout from "@/components/layout/AuthLayout";
import LogoIcon from '@/assets/icons/ic_logo.svg'
import { TextField } from "@/components/input/InputText";
import { IconButton } from "@/components/buttons/IconButton";
import { EyeIcon } from "lucide-react";
import Button from "@/components/buttons";
import Link from "next/link";

export default function GetStartedPage() {
    return <AuthLayout>
        <div className="relative flex flex-col  min-h-screen items-center justify-center py-8">

            <Link href="/login">
                <Button variant="outlined" className="absolute py-3 right-2 top-4">Already Have an Account</Button>
                </Link>

            <div className="flex flex-col gap-8 w-full px-2 md:w-[400px]">
                <div className="flex flex-col gap-4">
                    <LogoIcon className="self-center" />
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="font-bold text-2xl md:text-3xl text-primary">Get Started</h1>
                        <p className="text-[#666666]">Control Center</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-[#3F3F3F]">First Name</p>
                        <TextField.Container className="bg-white rounded:lg">
                            <TextField.Input />
                        </TextField.Container>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-[#3F3F3F]">Last Name</p>
                        <TextField.Container className="bg-white rounded:lg">
                            <TextField.Input />
                        </TextField.Container>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-[#3F3F3F]">Email</p>
                        <TextField.Container className="bg-white rounded:lg">
                            <TextField.Input />
                        </TextField.Container>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-[#3F3F3F]">Password</p>
                        <TextField.Container className="bg-white rounded:lg">
                            <TextField.Input type="password" />

                            <IconButton>
                                <EyeIcon />
                            </IconButton>
                        </TextField.Container>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Button className="py-4" variant="contained">Sign Up</Button>
                </div>

            </div>
        </div>
    </AuthLayout>
}