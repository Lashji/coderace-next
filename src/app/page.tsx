"use client";
import { Board } from "./_components/board";
import { Plus } from "lucide-react";
import type { Board as BoardType, Task } from "../types";
import { useEffect, useState } from "react";
import BoardContainer from "./_components/board-container";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { LoginHeader } from "./_components/login-header";
import { LoginForm } from "./_components/login-form";
import { TermsFooter } from "./_components/footer";

export default function Page() {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-primary/80 text-white">
      {userName ?? (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-white">
            <Image
              src="/logo.jpg"
              alt="Momentum Logo"
              width={400}
              height={400}
            />
          </div>
          <div className="flex h-full w-full flex-1 flex-col items-center justify-center space-y-8 bg-gradient-to-br from-primary to-accent">
            <LoginHeader />
            <LoginForm setUserName={setUserName} />
            <TermsFooter />
          </div>
        </div>
      )}
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-[1400px]">
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                My Project Board
              </h1>
              <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-white transition-colors hover:bg-blue-600">
                <Plus size={20} />
                Add Board
              </button>
            </div>
          </header>

          <main
            className="flex w-full items-start gap-6 overflow-x-auto bg-primary pb-6"
            style={{ padding: 10, paddingBottom: 25, borderRadius: 15 }}
          >
            <BoardContainer userName={userName} />
          </main>
        </div>
      </div>
    </main>
  );
}
