"use client";
import React, { useState } from "react";
import { Rocket, ArrowRight } from "lucide-react";
import { env } from "~/env";

export function LoginForm({
  setUserName,
}: {
  setUserName: (name: string) => void;
}) {
  const [name, setName] = useState("");

  const handleSubmit = async (name: string) => {
    const res = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_URL}/createUser?user_id=${name}`,
      {
        method: "POST",
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setUserName(name);
    console.log(res);
  };

  return (
    <form className="mt-8 w-2/3 space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Your Name
        </label>
        <div className="relative">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-black shadow-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>
      </div>

      <button
        type="button"
        className="group relative flex w-full items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => handleSubmit(name)}
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Rocket size={16} className="text-blue-100" />
        </span>
        Continue
        <ArrowRight
          size={16}
          className="ml-2 transition-transform group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
