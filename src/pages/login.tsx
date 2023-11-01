import AuthLayout from "@/components/layout/AuthLayout";
import LogoIcon from '@/assets/icons/ic_logo.svg'
import { TextField } from "@/components/input/InputText";
import { IconButton } from "@/components/buttons/IconButton";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { CheckBox } from "@/components/buttons/CheckBox";
import Button from "@/components/buttons";
import Link from "next/link";
import SEO from "@/components/SEO";
import { useLogin } from "@/utils/apiHooks/auth/useLogin";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GlobalActionContext } from "@/context/GlobalActionContext";

export default function LoginPage() {
    const { isLoading, data, login, error } = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordRevealed, setIsPasswordRevealed] = useState(false)
    const { showSnackBar } = useContext(GlobalActionContext)
    const router = useRouter()

    function revealPassword() {
        setIsPasswordRevealed(value => !value)
    }

    function onEmailEntered(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function onPasswordEntered(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    useEffect(() => {
        if (error) {
            showSnackBar({ severity: "error", message: error })
        }
    }, [error])

    useEffect(() => {
        if (data) {
            router.push('/')
        }
    }, [data])

    function handleLogin() {
        login({
            email,
            password
        })
    }

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
                            <TextField.Input type="email" inputMode="email" defaultValue={email} onChange={onEmailEntered} />
                        </TextField.Container>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-[#3F3F3F]">Password</p>
                        <TextField.Container className="bg-white rounded:lg">
                            <TextField.Input defaultValue={password} onChange={onPasswordEntered} type={isPasswordRevealed ? 'text' : 'password'} />

                            <IconButton onClick={revealPassword}>
                                {isPasswordRevealed ? <EyeOffIcon /> : <EyeIcon />}
                            </IconButton>
                        </TextField.Container>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <CheckBox />
                    <p className="font-semibold text-[#212121]">Remember Me</p>
                </div>

                <div className="flex flex-col gap-4">
                    <Button onClick={handleLogin} disabled={isLoading} isLoading={isLoading} variant="contained">
                        Login
                    </Button>

                    <Link href='/reset-password' className="self-center">
                        <Button className="py-4" variant="text">{`Can't remember your password?`}</Button>
                    </Link>
                </div>

            </div>
        </div>
    </AuthLayout>
}