import {
  GithubButton,
  GoogleButton,
  LoginButton,
  SignUpButton,
} from "./AuthButtons";

const AuthButtonsContainer = ({ closeDrawer }: { closeDrawer: () => void }) => {
  return (
    <div
      className={`my-5 flex flex-col items-center justify-center gap-3 px-4`}
    >
      <GoogleButton />
      <GithubButton />

      <div className="mt-4 flex w-full items-center justify-between">
        <span className="h-1 flex-1 bg-gray-200"></span>
        <span className="flex-1 text-center">or</span>
        <span className="h-1 flex-1 bg-gray-200"></span>
      </div>

      <LoginButton closeDrawer={closeDrawer} />
      <SignUpButton closeDrawer={closeDrawer} />
    </div>
  );
};
export default AuthButtonsContainer;
