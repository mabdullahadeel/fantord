import { ProfileSettingsPage as ProfileSettingsPageContent } from "src/content/profile/settings";
import Head from "next/head";
import { Authenticated } from "src/components/Authenticated";
import { PlainLayout } from "src/layouts/PlainLayout";
import React from "react";

const ProfileSettingsPage = () => {
  return (
    <>
      <Head>
        <title>Fantord - Profile Settings</title>
      </Head>
      <ProfileSettingsPageContent />
    </>
  );
};

ProfileSettingsPage.getLayout = function (page: React.ReactElement) {
  return (
    <Authenticated>
      <PlainLayout>{page}</PlainLayout>
    </Authenticated>
  );
};

export default ProfileSettingsPage;
