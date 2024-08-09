import SignUpForm from "@/components/AuthComponents/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="flex flex-col min-h-screen gap-10 items-center justify-center px-5">
      <h1 className="font-bold text-xl  md:text-2xl">
        Sign Up Now to Start Selling Food.
      </h1>

      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
