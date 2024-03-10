"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignupForm() {
  const [showPassword, isShowingPassword] = useState<boolean>(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const HandleSignUp = (data: any) => {
    try {
      fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      }).then((res) =>
        res.json().then((result) => {
          if (result.status === 406) {
            setError("password", { message: "Username already registered!" });
            return;
          } else if (result.status === 500) {
            setError("password", {
              message: "Unexpected server issue! Please wait....",
            });
            return;
          }
          router.push("/signin");
        })
      );
    } catch (error) {
      console.error(error);
      setError("password", { message: "Unexpected Server Issue! Please Wait" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up!</CardTitle>
        <CardDescription>
          Create an account to gain access to to the newest Portfilo Maker!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(HandleSignUp)}
          className="flex flex-col gap-y-2"
        >
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              {...register("username", {
                required: true,
                minLength: 3,
                maxLength: 22,
              })}
            />
            {errors.username?.type === "required" && (
              <Label className="text-red-500">Username is required!</Label>
            )}
            {errors.username?.type === "minLength" && (
              <Label className="text-red-500">
                Username has to three or more characters!
              </Label>
            )}
            {errors.username?.type === "maxlength" && (
              <Label className="text-red-500">
                Username can be no more than 22 characters!
              </Label>
            )}
          </div>
          <div>
            <Label>Password</Label>
            <div className="flex">
              <Input
                type={showPassword == true ? "text" : "password"}
                {...register("password", { required: true, minLength: 8 })}
              />
              <Button
                onClick={() => isShowingPassword(!showPassword)}
                type="button"
              >
                <EyeOpenIcon />
              </Button>
            </div>
            {errors.password?.type === "required" && (
              <Label className="text-red-500">Password is required!</Label>
            )}
            {errors.password?.type === "minLength" && (
              <Label className="text-red-500">
                Password has to be eight or more characters!
              </Label>
            )}
            {errors.password?.message && (
              <Label className="text-red-500">
                {errors.password?.message as string}
              </Label>
            )}
          </div>

          <Button type="submit" className="mt-5">
            Create Account!
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
