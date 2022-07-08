import { DashboardPage as DashboadPageContent } from "src/modules/dashboard/DashboardPage";
import Head from "next/head";
import { Authenticated } from "src/components/Authenticated";

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
  return <Authenticated>{page}</Authenticated>;
};

export default DashboardPage;
