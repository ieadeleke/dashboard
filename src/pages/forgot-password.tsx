import { Layout } from "@/components/layout";
import Logo from "@/assets/icons/ic_logo_flat.svg";
import Button from "@/components/buttons";
import { RegularTextInput } from "@/components/input/RegularTextInput";
import Link from "next/link";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { useContext, useEffect, useState } from "react";
import { useResetPassword } from "@/utils/apiHooks/auth/useResetPassword";
import { useVerifyResetPassword } from "@/utils/apiHooks/auth/useVerifyResetPassword";
import { useRouter } from "next/router";
import { isEmail } from "@/utils/validation";
import { TextField } from "@/components/input/InputText";
import { IconButton } from "@/components/buttons/IconButton";
import { EyeIcon } from "lucide-react";

export default function ForgotPassword() {
    const { showSnackBar } = useContext(GlobalActionContext)
    const { error, isLoading, isComplete, resetPassword } = useResetPassword()
    const { error: verifyError, isLoading: isVerifyLoading, isComplete: isVerifyComplete, verifyResetPassword } = useVerifyResetPassword()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [activationCode, setActivationCode] = useState("")
    const router = useRouter()
    const [shouldVerify, setShouldVerify] = useState(false)


    useEffect(() => {
        if (error) {
            showSnackBar({ severity: 'error', message: error })
        }
    }, [error])

    useEffect(() => {
        if (verifyError) {
            showSnackBar({ severity: 'error', message: verifyError })
        }
    }, [verifyError])

    useEffect(() => {
        if (isComplete) {
            setShouldVerify(true)
            showSnackBar({ severity: 'success', message: "A confirmation code has been sent to your email address" })
        }
    }, [isComplete])

    useEffect(() => {
        if (isVerifyComplete) {
            setShouldVerify(true)
            showSnackBar({ severity: 'success', message: "Password changed successfully" })
            setTimeout(() => router.push('/login'), 1000)
        }
    }, [isVerifyComplete])

    function submit() {
        if (!isEmail(email)) {
            return showSnackBar({ severity: 'error', message: "Invalid email" })
        }
        resetPassword({
            receivedChannel: email
        })
    }

    function submitConfirmationCode() {
        if (activationCode.length < 4) {
            return showSnackBar({ severity: 'error', message: "Invalid activation code" })
        } else if (password.trim().length < 4) {
            return showSnackBar({ severity: 'error', message: "Password should be at least 4 characters" })
        } else if (password.trim() != password1.trim()) {
            return showSnackBar({ severity: 'error', message: "Passwords do not match" })
        }
        verifyResetPassword({
            activationCode: activationCode.trim(),
            newPassword: password.trim(),
            receivedChannel: email
        })
    }

    return <Layout>
        <div className="flex flex-col gap-8">
            <div className="flex items-center px-2 py-2">
                <Logo className="text-primary" />
                <div className="flex-1" />
                <Button variant="text" className="text-black underline">Close this page</Button>
            </div>

            <div className="flex flex-col self-center items-center px-3 gap-4 mt-16 md:[500px]">

                {!shouldVerify ? <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-3 text-center">
                        <h1 className="font-bold text-2xl">Forgot Password</h1>
                        <p className="text-gray-500">{`Don’t worry about it, happens to the best of us☺️`}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Email Address:</p>
                        <RegularTextInput type="email" autoComplete="email" value={email} onChange={(evt) => setEmail(evt.target.value)} inputMode="email" placeholder="example@email.com" className="text-xs" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button isLoading={isLoading} disabled={isLoading} onClick={submit} className="rounded-xl mx-auto">Send recovery link to email</Button>
                        <div className="flex items-center justify-center">
                            <Link href="/login">
                                <Button variant="text" className="underline">Back to Sign in</Button>
                            </Link>
                        </div>
                    </div>
                </div> : <div className="self-center md:max-w-[400px] flex flex-col gap-8 ">
                    <div className="text-center">
                        <h1 className="font-bold text-2xl">Confirm Reset Password</h1>
                        <p>Enter the code sent to your email</p>
                    </div>

                    <div>
                        <p className="text-base text-gray-600 font-light">OTP code</p>
                        <TextField.Container className="mt-1">
                            <TextField.Input inputMode="numeric" value={activationCode} onChange={(evt) => setActivationCode(evt.target.value)} placeholder="e.g 123456" className="text-xs" />
                        </TextField.Container>
                    </div>

                    <div>
                        <p className="text-base text-gray-600 font-light">Password</p>
                        <TextField.Container className="mt-1">
                            <TextField.Input value={password} onChange={(evt) => setPassword(evt.target.value)} type="password" placeholder="e.g password" className="text-xs" />

                            <IconButton>
                                <EyeIcon className="text-gray-500 w-4 h-4" />
                            </IconButton>
                        </TextField.Container>
                    </div>

                    <div>
                        <p className="text-base text-gray-600 font-light">Confirm Password</p>
                        <TextField.Container className="mt-1">
                            <TextField.Input value={password1} onChange={(evt) => setPassword1(evt.target.value)} type="password" placeholder="e.g password" className="text-xs" />

                            <IconButton>
                                <EyeIcon className="text-gray-500 w-4 h-4" />
                            </IconButton>
                        </TextField.Container>
                    </div>

                    <Button isLoading={isVerifyLoading} disabled={isVerifyLoading} onClick={submitConfirmationCode} className="rounded-xl">Confirm</Button>
                </div>}
            </div>
        </div>
    </Layout>
}