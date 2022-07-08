import { DashboardPage as DashboadPageContent } from "src/modules/dashboard/DashboardPage";
import Head from "next/head";
import { Authenticated } from "src/components/Authenticated";
import { PlainLayout } from "src/layouts/PlainLayout";

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

DashboardPage.getLayout = function (page) {
  return (
    <Authenticated>
      <PlainLayout>{page}</PlainLayout>
    </Authenticated>
  );
};

export default DashboardPage;
