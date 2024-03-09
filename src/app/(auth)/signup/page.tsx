"use client";

import SignupForm from "./__components/form";

export default function SignUpPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center items-center text-center h-[75vh]">
        <SignupForm />
      </div>
    </div>
  );
}
