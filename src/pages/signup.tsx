import { Layout } from "@/components/layout";
import Logo from "@/assets/icons/ic_logo.svg";
import Button from "@/components/buttons";
import { Checkbox } from "@/components/ui/checkbox";
import { IndividualSignUpForm } from "@/components/page_components/dashboard/auth/sign-up/IndividualSignUpForm";
import { useState } from "react";
import { OrganizationSignUpForm } from "@/components/page_components/dashboard/auth/sign-up/OrganizationSignUpForm";

export default function SignUp() {
    const [formType, setFormType] = useState<"individual" | "organization">("individual")

    function updateToIndividual() {
        setFormType("individual")
    }

    function updateToOrganization() {
        setFormType("organization")
    }

    return <Layout>
        <div className="flex flex-col gap-8">
            <div className="flex items-center">
                <Logo className="text-primary" />
                <div className="flex-1" />
                <Button variant="text" className="text-black underline">Close this page</Button>
            </div>

            <div className="flex flex-col self-center items-center w-[500px] gap-4">
                <div className="flex flex-col gap-3 text-center">
                    <h1 className="font-bold text-2xl">Create Account</h1>
                    <p className="text-gray-500">Enter your details to get started</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Checkbox onCheckedChange={updateToIndividual} checked={formType == 'individual'} className="rounded-full w-5 h-5" />
                        <p>Individual</p>
                    </div>

                    <div className="flex items-center gap-1">
                        <Checkbox onCheckedChange={updateToOrganization} checked={formType == 'organization'} className="rounded-full w-5 h-5" />
                        <p>Business/Organization</p>
                    </div>
                </div>


                <div className="w-full">
                    {formType == 'individual' ? <IndividualSignUpForm /> : <OrganizationSignUpForm />}
                </div>
            </div>
        </div>
    </Layout>
}