import Link from 'next/link';

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-gray-400">
        Hello World
      </h1>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
    </>
  );
};

export default Home;
