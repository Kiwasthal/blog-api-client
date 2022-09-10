import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LogInToComment from '../../components/LogInToComment';
import CreateCommentForm from '../../components/CreateCommentForm';
import Comment from '../../components/Comment';
import SinglePost from '../../components/SinglePost';

const Post = ({ post, comments, userAuth }) => {
  const { query, push } = useRouter();
  const [currentComments, setCurrentComments] = useState(comments);
  const [regenerating, setRegenerating] = useState(true);

  useEffect(() => {
    (async () => {
      if (regenerating) {
        const res = await fetch(
          `https://kiwasthal-blog-server.herokuapp.com/api/posts/${query.postId}/comments`
        );

        const data = await res.json();
        setCurrentComments(data);
        setRegenerating(false);
      }
    })();
  }, [currentComments, regenerating, query.postId]);

  return (
    <div className="page">
      <div className="flex flex-col items-center">
        <SinglePost post={post} userAuth={userAuth} />
        <div className="shadow-lg pb-12 px-4 mt-8 flex flex-col   justify-center lg:w-3/4 md:w-4/5 border-l-4 border-r-4 border-gray-700 mb-4">
          <section className="mt-4 flex flex-col items-center mb-6 ">
            <div className="flex items-center my-4 before:flex-1 before:border-2 before:border-gray-900 before:mt-0.5 after:flex-1 after:border-2 after:border-gray-900 after:mt-0.5 w-2/3 md:w-4/5 mb-6 ">
              <h1 className="text-5xl font-bold text-gray-900 px-2  ">
                Comments
              </h1>
            </div>
            <LogInToComment userAuth={userAuth} />
            <CreateCommentForm
              userAuth={userAuth}
              regenerate={setRegenerating}
            />

            {currentComments && currentComments.length ? (
              currentComments.map((comment, index) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  index={index}
                  userAuth={userAuth}
                />
              ))
            ) : (
              <div className="text-gray-900  text-xl mt-6">
                There are no comments
              </div>
            )}
            <div className="flex justify-center mt-6">
              <svg
                className="w-12 h-12 cursor-pointer hover:animate-bounce "
                fill="#0f172a"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => push('/')}
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  const response = await fetch(
    `https://kiwasthal-blog-server.herokuapp.com/api/posts`
  );
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
    `https://kiwasthal-blog-server.herokuapp.com/api/posts/${params.postId}`
  );

  const responseNext = await fetch(
    `https://kiwasthal-blog-server.herokuapp.com/api/posts/${params.postId}/comments`
  );

  const data = await response.json();
  const comments = await responseNext.json();
  let post = data.post[0];

  return {
    props: {
      post,
      comments,
    },
    revalidate: 10,
  };
}
