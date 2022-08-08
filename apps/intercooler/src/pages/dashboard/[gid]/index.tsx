import Head from "next/head";
import { Authenticated } from "src/components/Authenticated";
import { PlainLayout } from "src/layouts/PlainLayout";
import React from "react";
import { GuildHome } from "src/content/guild-home/GuildHome";

const GuildHomePage = () => {
  return (
    <>
      <Head>
        <title>Fantord</title>
      </Head>
      <GuildHome />
    </>
  );
};

GuildHomePage.getLayout = function (page: React.ReactElement) {
  return (
    <Authenticated>
      <PlainLayout>{page}</PlainLayout>
    </Authenticated>
  );
};

export default GuildHomePage;
