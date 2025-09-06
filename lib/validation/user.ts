import { ROLE } from "@prisma/client";
import { z } from "zod";
import { emailSchema, passwordSchema, nameSchema } from "./common";

// User validation schemas
export const UserCreateSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  role: z.nativeEnum(ROLE),
});

export const UserLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

// Type with default role handling
export type UserCreateInput = Omit<z.infer<typeof UserCreateSchema>, "role"> & {
  role?: ROLE;
};

export type UserLoginInput = z.infer<typeof UserLoginSchema>;
