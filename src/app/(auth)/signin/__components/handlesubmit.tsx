"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export default async function HandleSignIn(data: any) {
  try {
    const username = data.username;
    const password = data.password;

    await signIn("credentials", {
      username,
      password,
      redirectTo: `${process.env.DOMAIN}/home`,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
}
