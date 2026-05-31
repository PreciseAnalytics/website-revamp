import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: { destination: 'https://ats.preciseanalytics.io', permanent: false },
});

export default function AdminATS() {
  return null;
}
