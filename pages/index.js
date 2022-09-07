import AllPosts from '../components/AllPosts';
import IndexImage from '../components/MainImage';
import TopPosts from '../components/TopPosts';

const Home = ({ posts, topPosts }) => {
  return (
    <>
      <IndexImage />
      <TopPosts posts={topPosts} />
      <AllPosts posts={posts} />
    </>
  );
};

export async function getStaticProps() {
  let response = await fetch('http://localhost:3000/api/posts');
  const allPostsData = await response.json();

  response = await fetch('http://localhost:3000/api/posts/top');
  const topPostsData = await response.json();

  return {
    props: {
      posts: allPostsData,
      topPosts: topPostsData,
    },
  };
}

export default Home;
