import { DashboardPage as DashboadPageContent } from "src/content/dashboard/DashboardPage";
import Head from "next/head";
import { Authenticated } from "src/components/Authenticated";
import { PlainLayout } from "src/layouts/PlainLayout";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Fantord</title>
      </Head>
      <DashboadPageContent />
    </>
  );
};

DashboardPage.getLayout = function (page: React.ReactElement) {
  return (
    <Authenticated>
      <PlainLayout>{page}</PlainLayout>
    </Authenticated>
  );
};

export default DashboardPage;
