import Link from 'next/link';

const Posts = ({ posts }) => {
  return (
    <div className="page">
      <h1>Posts List</h1>
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
    </div>
  );
};

export default Posts;

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/posts');
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
  };
}
