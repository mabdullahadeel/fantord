import { DashboardPage as DashboadPageContent } from "src/modules/dashboard/DashboardPage";
import Head from "next/head";

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
  return <>{page}</>;
};

export default DashboardPage;
