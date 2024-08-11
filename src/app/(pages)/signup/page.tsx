import SignUpForm from "@/forms/my-user-forms/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 px-5">
      <h1 className="text-xl font-bold md:text-2xl">
        Sign Up Now to Start Selling Food.
      </h1>

      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
