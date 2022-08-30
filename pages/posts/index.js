import Link from 'next/link';

const Posts = ({ posts }) => {
  return (
    <>
      <h1>Posts List</h1>
      {posts.map(post => (
        <div key={post.id} className="p-4">
          <Link href={`posts/${post.id}`} passHref>
            <p>
              {post.id} - {post.title}
            </p>
          </Link>
          <hr />
        </div>
      ))}
    </>
  );
};

export default Posts;

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  return {
    props: {
      posts: data.slice(0, 3),
    },
  };
}
