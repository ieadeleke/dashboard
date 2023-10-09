import AuthLayout from "@/components/layout/AuthLayout";
import LogoIcon from '@/assets/icons/ic_logo.svg'
import { TextField } from "@/components/input/InputText";
import { IconButton } from "@/components/buttons/IconButton";
import { EyeIcon } from "lucide-react";
import { CheckBox } from "@/components/buttons/CheckBox";
import Button from "@/components/buttons";
import Link from "next/link";
import SEO from "@/components/SEO";

export default function LoginPage() {
    return <AuthLayout>
        <div className="flex flex-col  min-h-screen items-center justify-center py-8">
            <SEO title="Laswa | Login" />

            <div className="flex flex-col gap-8 w-full px-2 md:w-[400px]">
                <div className="flex flex-col gap-4">
                    <LogoIcon className="self-center" />
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="font-bold text-2xl md:text-3xl text-primary">Log In to Admin</h1>
                        <p className="text-[#666666]">Control Center</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
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

                <div className="flex items-center gap-4">
                    <CheckBox />
                    <p className="font-semibold text-[#212121]">Remember Me</p>
                </div>

                <div className="flex flex-col gap-4">
                    <Button className="py-4" variant="contained">Login</Button>

                    <Link href='/reset-password' className="self-center">
                        <Button className="py-4" variant="text">{`Can't remember your password?`}</Button>
                    </Link>
                </div>

            </div>
        </div>
    </AuthLayout>
}