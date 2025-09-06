"use client";
import { useEffect, useState, useTransition } from "react";
import styles from "./AuthButton.module.css";
import clsx from "clsx";
import Link from "next/link";
import { signOut } from "@/actions/auth/signOut";
import { useCSRFToken } from "@/lib/hooks";
import { checkAuth } from "@/actions/auth/checkAuth";
import { toast } from "react-hot-toast";

export interface AuthButtonProps {
  className?: string;
}

export function AuthButton({ className }: Readonly<AuthButtonProps>) {
  const [isPending, startTransition] = useTransition();
  const { csrfToken } = useCSRFToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function getAuthStatus() {
      try {
        const authStatus = await checkAuth();
        if (isMounted) {
          setIsAuthenticated(authStatus);
        }
      } catch {
        if (isMounted) {
          toast.error("Failed to check authentication status");
        }
      }
    }

    getAuthStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignOut = (formData: FormData) => {
    startTransition(async () => {
      await signOut(formData);
    });
  };

  if (isAuthenticated) {
    return (
      <form action={handleSignOut}>
        <input type="hidden" name="csrf_token" value={csrfToken} />
        <button
          type="submit"
          className={clsx(styles.authButton, styles.button, className)}
          disabled={isPending}
        >
          {isPending ? "...Loading" : "Log out"}
        </button>
      </form>
    );
  }
  return (
    <Link
      className={clsx(styles.authButton, styles.link, className)}
      href="/signin"
      data-testid="header-signin-button"
    >
      Sign in
    </Link>
  );
}
