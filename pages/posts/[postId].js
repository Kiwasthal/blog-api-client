import moment from 'moment';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LogInToComment from '../../components/LogInToComment';
import CreateCommentForm from '../../components/CreateCommentForm';

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
  const { query } = useRouter();
  const [currentComments, setCurrentComments] = useState(comments);

  useEffect(() => {
    let mounted = true;
    const fetchComments = async () => {
      const response = await fetch(
        `http://localhost:3000/api/posts/${query.id}/comments`
      );
      if (mounted) {
        const data = await response.json();
        setCurrentComments(data);
      }
    };
    fetchComments();
    return () => (mounted = false);
  }, [currentComments, query.id]);

  return (
    <div className="page">
      <div className="w-full flex flex-col items-center ">
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
          <section className="mt-12 flex flex-col items-center mb-6 ">
            <LogInToComment userAuth={userAuth} />
            <CreateCommentForm userAuth={userAuth} />
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
