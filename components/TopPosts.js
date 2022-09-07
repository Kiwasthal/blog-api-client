import Link from 'next/link';

const TopPosts = ({ posts }) => {
  return (
    <>
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

export default TopPosts;
