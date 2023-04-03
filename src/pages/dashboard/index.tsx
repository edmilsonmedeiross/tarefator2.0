import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';

function Dashboard() {
  return <div>Dashboard</div>;
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // console.log('getServersideProps');

  const session = await getSession({ req });
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      props: {},
    },
  };
};
