const Post = ({ post }) => {
  return (
    <div className="page">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>{post.user.username}</p>
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  const response = await fetch(`http://localhost:3000/api/posts`);
  const postsList = await response.json();

  const paths = postsList.map(post => ({
    params: { postId: post._id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `http://localhost:3000/api/posts/${params.postId}`
  );
  const data = await response.json();
  let post = data.post[0];

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}
