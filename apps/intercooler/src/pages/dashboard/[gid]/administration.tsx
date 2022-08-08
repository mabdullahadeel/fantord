import Head from "next/head";
import { Authenticated } from "src/components/Authenticated";
import { PlainLayout } from "src/layouts/PlainLayout";
import React from "react";
import { GuildAdministration } from "src/content/guild-home/GuildAdministration";

const GuildAdministrationPage = () => {
  return (
    <>
      <Head>
        <title>Administration</title>
      </Head>
      <GuildAdministration />
    </>
  );
};

GuildAdministrationPage.getLayout = function (page: React.ReactElement) {
  return (
    <Authenticated>
      <PlainLayout>{page}</PlainLayout>
    </Authenticated>
  );
};

export default GuildAdministrationPage;
