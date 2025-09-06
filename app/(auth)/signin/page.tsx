"use client";
import { signInAction } from "@/actions/auth/singIn/signIn";
import { ACTION_INITIAL_STATE } from "@/actions/constants";
import { ActionResponse } from "@/actions/types";
import { AuthForm, AuthFormField } from "@/components/AuthForm/AuthForm";
import { useCSRFToken } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "react-hot-toast";
import styles from "./page.module.css";
import Link from "next/link";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";

const FIELDS: AuthFormField[] = [
  {
    name: "email",
    type: "email",
    required: true,
    label: "Email",
    autoComplete: "username",
  },
  {
    name: "password",
    type: "password",
    required: true,
    label: "Password",
    autoComplete: "current-password",
  },
];

export default function SignIn() {
  const { csrfToken } = useCSRFToken();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData: FormData) => {
    const result = await signInAction(formData);
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
      <h1>Sign In</h1>
      <ErrorBoundary>
        <AuthForm
          fields={FIELDS}
          csrfToken={csrfToken}
          action={formAction}
          id="loginForm"
          errors={state?.errors}
          isLoading={isPending}
          currentValues={state?.currentValues}
          buttonText="Sign in"
        />
      </ErrorBoundary>
      <p>
        Do not have an account?{" "}
        <Link className={styles.link} href={"/signup"}>
          Sign Up
        </Link>
      </p>
    </>
  );
}
