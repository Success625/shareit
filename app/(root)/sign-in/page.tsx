import { auth } from "@/auth";
import SignInForm from "@/components/SignInForm";
import SignInOptGroup from "@/components/SignInOptGroup";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();
  if (session) {
    redirect('/')
  }

  return (
    <section className="mx-auto">
      <h1 className="header-text_gradient">Sign In</h1>

      <div className="relative opacity-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-t w-4/5 border-gray-700"></div>
        </div>
        <div className="relative flex items-center justify-center">
          <span className="bg-white p-2 text-base">Sign In with:</span>
        </div>
      </div>

      <SignInOptGroup newUser={false} />

      <div className="relative opacity-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-t w-4/5 border-gray-700"></div>
        </div>
        <div className="relative flex items-center justify-center">
          <span className="bg-white p-2 text-base">Or continue with email</span>
        </div>
      </div>

      <SignInForm />

      <div className="mt-6 text-base p-2">
        Don't have an account?{" "}
        <Link href={"sign-up"} className="text-blue-500 underline">
          Create an account.
        </Link>
      </div>
    </section>
  );
};

export default SignInPage;
