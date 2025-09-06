"use client";
import { AuthForm, AuthFormField } from "@/components/AuthForm/AuthForm";
import { Select } from "@/components/Selects/Select/Select";
import styles from "./page.module.css";
import { ACTION_INITIAL_STATE } from "@/actions/constants";
import { useActionState } from "react";
import { signUpAction } from "@/actions/auth/signUp/signUp";
import { ActionResponse } from "@/actions/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROLE } from "@prisma/client";
import { useCSRFToken } from "@/lib/hooks";
import toast from "react-hot-toast";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";

const FIELDS: AuthFormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "Full Name",
    autoComplete: "given-name",
  },
  {
    name: "email",
    type: "email",
    required: true,
    label: "Email",
    autoComplete: "email",
  },
  {
    name: "password",
    type: "password",
    required: true,
    label: "Password",
    autoComplete: "new-password",
  },
];

const roleOptions = Object.values(ROLE).map((role) => ({
  value: role,
  text: role,
}));

export default function SignUp() {
  const { csrfToken } = useCSRFToken();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData: FormData) => {
    const result = await signUpAction(formData);
    if (result.success) {
      router.push("/");
    }
    if (result.error) {
      toast.error(result.error);
    }
    return result;
  }, ACTION_INITIAL_STATE);
  return (
    <>
      <h1>Sign Up</h1>
      <ErrorBoundary>
        <AuthForm
          fields={FIELDS}
          csrfToken={csrfToken}
          action={formAction}
          id="signupForm"
          errors={state?.errors}
          isLoading={isPending}
          currentValues={state?.currentValues}
          buttonText="Sign up"
        >
          <Select
            label="Select role"
            name="role"
            options={roleOptions}
            defaultValue="USER"
          />
        </AuthForm>
      </ErrorBoundary>
      <p>
        Already have an account?{" "}
        <Link className={styles.link} href="/signin">
          sign in
        </Link>
      </p>
    </>
  );
}
