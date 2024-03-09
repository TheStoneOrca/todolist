"use client";

import SignInForm from "./__components/form";

export default function SignInPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center items-center text-center h-[75vh]">
        <SignInForm />
      </div>
    </div>
  );
}
