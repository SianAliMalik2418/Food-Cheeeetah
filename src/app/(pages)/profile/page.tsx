import ProfileForm from "@/forms/my-user-forms/ProfileForm";

const ProfilePage = async () => {
  return (
    <div className="flex min-h-screen py-10 md:items-center md:justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-9 px-5 py-5 md:mx-auto md:min-h-screen md:max-w-[800px] md:items-start md:justify-start">
        <h1 className="text-2xl font-bold md:text-3xl">My Profile</h1>

        <ProfileForm />
      </div>
    </div>
  );
};
export default ProfilePage;
