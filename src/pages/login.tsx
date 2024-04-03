import { Layout } from "@/components/layout";
import Logo from "@/assets/icons/ic_logo_flat.svg";
import Button from "@/components/buttons";
import { useContext, useEffect, useState } from "react";
import { RegularTextInput } from "@/components/input/RegularTextInput";
import { TextField } from "@/components/input/InputText";
import { IconButton } from "@/components/buttons/IconButton";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { useLogin } from "@/utils/apiHooks/auth/useLogin";
import { useRouter } from "next/router";
import { isEmail } from "@/utils/validation";
import UserContext from "@/context/UserContext";

export default function Login() {
    const { showSnackBar } = useContext(GlobalActionContext)
    const { error, isLoading, data, login } = useLogin()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const { updateUser } = useContext(UserContext)
    const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);

    useEffect(() => {
        if (error) {
            showSnackBar({ severity: 'error', message: error })
        }
    }, [error])

    useEffect(() => {
        if (data) {
            showSnackBar({ severity: 'success', message: "Login successful" })
            updateUser(data)
            setTimeout(() => {
                router.push('/')
            }, 1000)
        }
    }, [data])

    function submit() {
        if (!isEmail(email)) {
            return showSnackBar({ severity: 'error', message: "Invalid email" })
        } else if (password.trim().length < 4) {
            return showSnackBar({ severity: 'error', message: "Password should be at least 4 characters" })
        }
        login({
            email: email,
            password
        })
    }

    function revealPassword() {
        setIsPasswordRevealed((value) => !value);
    }

    return <Layout>
        <div className="flex flex-col gap-8">
            <div className="flex items-center px-2 py-2">
                <Logo className="text-primary" />
                <div className="flex-1" />
                {/* <Button variant="text" className="text-black underline">Close this page</Button> */}
            </div>

            <div className="flex flex-col self-center items-center px-3 gap-4 mt-16 md:[500px]">
                <div className="flex flex-col gap-3 text-center">
                    <h1 className="font-bold text-2xl">Login to your Account</h1>
                    <p className="text-gray-500">Welcome back! Please enter your details</p>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <div>
                        <p className="font-semibold">Email Address:</p>
                        <RegularTextInput type="email" placeholder="example@gmail.com" className="text-xs" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                    </div>

                    <div className="flex flex-col">
                        <p className="font-semibold">Password:</p>
                        <TextField.Container className="bg-white outline outline-1 outline-gray-200">
                            <TextField.Input value={password} onChange={(evt) => setPassword(evt.target.value)} type={isPasswordRevealed ? "text" : "password"} placeholder="123456" className="text-xs" />
                            <IconButton onClick={revealPassword}>
                                {isPasswordRevealed ? <EyeIcon /> : <EyeOffIcon />}
                            </IconButton>
                        </TextField.Container>

                        <Link href="/forgot-password" className="self-end">
                            <Button variant="text" className="h-8 mt-1">Forgot Password?</Button>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        <Button onClick={submit} isLoading={isLoading} disabled={isLoading}>Sign In</Button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}