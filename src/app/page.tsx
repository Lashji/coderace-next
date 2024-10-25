import { Board } from "./_components/board";
import { Plus } from "lucide-react";
import type { Board as BoardType, Task } from "../types";
import { useEffect, useState } from "react";
import BoardContainer from "./_components/board-container";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-primary/80 text-white">
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
            <BoardContainer />
          </main>
        </div>
      </div>
    </main>
  );
}
