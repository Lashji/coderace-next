"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(name: string) {
  console.log(name);

  // Add name to cookie
  cookies().set("userName", name, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  console.log(cookies().get("userName"));

  // Redirect to home
  redirect("/");
}
