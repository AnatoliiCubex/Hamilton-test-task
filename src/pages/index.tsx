export default function Home() {
  return;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/create-tournament",
      permanent: false,
    },
  };
}
