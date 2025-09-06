import { User } from "@prisma/client";

export type UserInput = Omit<User, "createdAt" | "id">;

export function isUserInput(
  values: Record<string, unknown>
): values is UserInput {
  return (
    typeof values?.password === "string" &&
    typeof values?.name === "string" &&
    typeof values?.email === "string"
  );
}

export type LoginData = {
  email: string;
  password: string;
};

export function isLoginData(
  values: Record<string, unknown>
): values is LoginData {
  return (
    typeof values?.password === "string" && typeof values?.email === "string"
  );
}
