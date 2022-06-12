import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <pre>
          Authenticated as {JSON.stringify(sessionData.user, undefined, 2)}
        </pre>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
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
