import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";

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
