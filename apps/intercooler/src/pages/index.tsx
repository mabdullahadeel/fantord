import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();

  if (status === "authenticated") {
    return <p>Authenticated as {sessionData.user?.email}</p>;
  }

  return (
    <>
      <a href="/api/auth/signin">
        <button>Signin with Discord</button>
      </a>
    </>
  );
};

export default Home;
