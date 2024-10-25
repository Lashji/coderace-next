"use client";
import React from "react";
import { Rocket } from "lucide-react";

export function LoginHeader() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-900">
        Welcome back to MOMENTUM
      </h2>
      <p className="mt-2 text-gray-600">
        Enter your name to continue your journey
      </p>
    </div>
  );
}
