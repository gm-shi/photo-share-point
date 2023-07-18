import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";

export const getServerSideProps = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
