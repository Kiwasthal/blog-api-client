import moment from 'moment';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LogInToComment from '../../components/LogInToComment';
import CreateCommentForm from '../../components/CreateCommentForm';
import Comment from '../../components/Comment';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04 * i,
    },
  }),
};

const spanVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const Post = ({ post, comments, userAuth }) => {
  const titleTxt = post.title.split(' ');
  const { query, push } = useRouter();
  const [currentComments, setCurrentComments] = useState(comments);
  const [regenerating, setRegenerating] = useState(true);

  useEffect(() => {
    (async () => {
      if (regenerating) {
        const res = await fetch(
          `http://localhost:3000/api/posts/${query.postId}/comments`
        );

        const data = await res.json();
        setCurrentComments(data);
        setRegenerating(false);
      }
    })();
  }, [currentComments, regenerating]);

  return (
    <div className="page">
      <div className="flex flex-col items-center ">
        <div className="shadow-lg pb-12 px-4 mt-8 flex flex-col  items-center justify-center lg:w-3/4 md:w-4/5 border-l-2 border-r-2 border-gray-900">
          <div className="flex flex-col items-center mb-6">
            <motion.div
              className="text-6xl font-extrabold text-gray-900"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {titleTxt.map((word, i) => (
                <motion.span
                  key={i}
                  className="text-gray-900 mr-3"
                  variants={spanVariants}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
            <h3 className="mt-1 text-sm text-gray-600">
              <em>{`Added on ${moment(post.timestamp).format('LL')}`}</em>
            </h3>
          </div>

          <p>{post.content}</p>
          <p className="text-lg text-gray-500 font-bold mt-8">
            Author{' '}
            <span className="text-gray-900 font-extrabold">
              <em>: {post.user.username}</em>
            </span>
          </p>
        </div>
        <div className="shadow-lg pb-12 px-4 mt-8 flex flex-col   justify-center lg:w-3/4 md:w-4/5 border-l-2 border-r-2 border-gray-900">
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
                <Comment key={comment._id} comment={comment} index={index} />
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

  const responseNext = await fetch(
    `http://localhost:3000/api/posts/${params.postId}/comments`
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
