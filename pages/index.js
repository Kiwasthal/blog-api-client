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
  let response = await fetch(
    'https://kiwasthal-blog-server.herokuapp.com/api/posts'
  );
  const allPostsData = await response.json();

  response = await fetch(
    'https://kiwasthal-blog-server.herokuapp.com/api/posts/top'
  );
  const topPostsData = await response.json();

  return {
    props: {
      posts: allPostsData,
      topPosts: topPostsData,
    },
    rebalidate: 2,
  };
}

export default Home;
