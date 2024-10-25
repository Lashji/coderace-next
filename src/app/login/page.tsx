import Image from "next/image";
import { TermsFooter } from "../_components/footer";
import { LoginForm } from "./_compontents/login-form";
import { LoginHeader } from "./_compontents/login-header";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-white">
        <Image src="/logo.jpg" alt="Momentum Logo" width={400} height={400} />
      </div>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center space-y-8 bg-gradient-to-br from-primary to-accent">
        <LoginHeader />
        <LoginForm />
        <TermsFooter />
      </div>
    </div>
  );
}
