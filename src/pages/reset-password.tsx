import AuthLayout from "@/components/layout/AuthLayout";
import LogoIcon from '@/assets/icons/ic_logo.svg'
import { InputProps, TextField } from "@/components/input/InputText";
import Button from "@/components/buttons";
import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import SEO from "@/components/SEO";
import { useResetPassword } from "@/utils/apiHooks/auth/useResetPassword";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { useConfirmResetPassword } from "@/utils/apiHooks/auth/useConfirmResetPassword";
import { useRouter } from "next/router";
import Link from "next/link";

type ResetPasswordInputField = {

} & InputProps

const ResetPasswordInputField = ({ className, ...props }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    function onBlur() {
        setIsFocused(false)
    }

    function onFocus() {
        setIsFocused(true)
    }

    return <TextField.Container className={`bg-white rounded-2xl ${isFocused ? 'border border-primary' : ''}`}>
        <TextField.Input onBlur={onBlur} onFocus={onFocus} {...props} />
    </TextField.Container>
}

export default function ResetPassword() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [activationCode, setActivationCode] = useState('')
    const { showSnackBar } = useContext(GlobalActionContext)
    const { resetPassword, data: resetData, isLoading: isInitResetLoading, error: initResetError } = useResetPassword()
    const { confirmResetPassword, error: confirmResetError, isLoading: isConfirmResetLoading, data: confirmResetData } = useConfirmResetPassword()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        if (error) {
            showSnackBar({
                severity: 'error',
                message: error
            })
        }
    }, [error])

    useEffect(() => {
        if (confirmResetData) {
            showSnackBar({ severity: 'success', message: "Password reset successfully" })
            setTimeout(() => router.push('/login'), 2000)
        }
    }, [confirmResetData])

    useEffect(() => {
        setError(initResetError || confirmResetError)
    }, [initResetError, confirmResetError])

    useEffect(() => {
        setIsLoading(isInitResetLoading || isConfirmResetLoading)
    }, [isInitResetLoading, isConfirmResetLoading])

    const isCodeSent = useMemo(() => !!resetData, [resetData])


    function onBlur() {
        setIsFocused(false)
    }

    function onFocused() {
        setIsFocused(true)
    }

    function onEmailChanged(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function onActivationCodeChanged(event: ChangeEvent<HTMLInputElement>) {
        setActivationCode(event.target.value)
    }

    function onPasswordChanged(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function submit() {
        if (!isCodeSent) {
            return resetPassword({ email })
        }
        confirmResetPassword({
            email,
            activationCode,
            newPassword: password
        })
    }

    return <AuthLayout>
        <div className="flex flex-col items-center min-h-screen justify-center py-8">
            <SEO title="Laswa | Reset Password" />

            <div className="flex flex-col gap-8 w-full px-2 md:w-[400px]">
                <div className="flex flex-col gap-4">
                    <LogoIcon className="self-center" />
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="font-bold text-2xl md:text-3xl text-primary">Forgot Password?</h1>
                        <p className="text-[#666666]">Control Center</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className={`flex flex-col gap-2 ${isCodeSent ? 'opacity-50' : 'opacity-100'}`}>
                        <p className="font-medium text-[#3F3F3F]">Enter your email</p>
                        <ResetPasswordInputField contentEditable={isCodeSent} disabled={isCodeSent} onChange={onEmailChanged} type="email" />
                    </div>

                    {isCodeSent && <div className="flex flex-col gap-[inherit]">
                        <div className="flex flex-col gap-2">
                            <p className="font-medium text-[#3F3F3F]">Activation Code</p>
                            <ResetPasswordInputField onChange={onActivationCodeChanged} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-medium text-[#3F3F3F]">New Password</p>
                            <ResetPasswordInputField onChange={onPasswordChanged} type="password" />
                        </div>
                    </div>
                    }
                </div>

                <div className="flex flex-col gap-4">
                    <Button onClick={submit} disabled={isLoading} className="py-4 rounded-2xl" variant="contained">{isCodeSent ? `Reset Password` : `Send Password Reset Code`}</Button>

                    <Link href="/login" className="flex flex-col">
                        <Button disabled={isLoading} className="py-4 rounded-2xl" variant="text">Back to Login</Button>
                    </Link>
                </div>

            </div>
        </div>
    </AuthLayout>
}