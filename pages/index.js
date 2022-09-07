import Link from 'next/link';
import IndexImage from '../components/MainImage';

const Home = ({ posts }) => {
  return (
    <>
      <IndexImage />

      <Link href={`/posts`}>
        <p>Posts</p>
      </Link>

      {posts.map(post => (
        <div key={post._id} className="p-4">
          <Link href={`/posts/${post._id}`} passHref>
            <p>
              {post._id} - {post.title}
            </p>
          </Link>
          <hr />
        </div>
      ))}
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/posts');
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
  };
}

export default Home;
