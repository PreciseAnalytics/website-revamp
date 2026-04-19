import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: { destination: 'https://precise-analytics-ats.vercel.app', permanent: false },
});

export default function AdminIndex() {
  return null;
}
