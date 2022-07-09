import { ProfileHomePage as ProfileHomePageContent } from "src/content/profile/ProfileHomePage";
import Head from "next/head";
import { Authenticated } from "src/components/Authenticated";
import { PlainLayout } from "src/layouts/PlainLayout";
import React from "react";

const ProfileSettingsHome = () => {
  return (
    <>
      <Head>
        <title>Fantord - Profile</title>
      </Head>
      <ProfileHomePageContent />
    </>
  );
};

ProfileSettingsHome.getLayout = function (page: React.ReactElement) {
  return (
    <Authenticated>
      <PlainLayout>{page}</PlainLayout>
    </Authenticated>
  );
};

export default ProfileSettingsHome;
