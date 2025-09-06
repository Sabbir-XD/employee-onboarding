"use client";

import { MultiStepForm } from "./_components/multi-step-from";



export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-md p-8">
        <MultiStepForm />
      </div>
    </main>
  );
}
