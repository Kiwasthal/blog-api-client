import Link from 'next/link';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import moment from 'moment';

const titleVariants = {
  hidden: { opacity: 0, y: '-10vh' },
  visible: {
    opacity: 1,
    y: '0',
    transition: { duration: 1, type: 'spring', delay: 0.5 },
  },
};

const borderVariants = {
  hidden: { opacity: 0 },
  visible: {
    transition: { duration: 1 },
    opacity: 1,
  },
};

const singlePostVariants = {
  hidden: i => ({
    x: i % 2 === 0 ? '-10vh' : '10vh',
    y: '10vh',
    opacity: 0,
  }),
  visible: i => ({
    opacity: 1,
    x: '0',
    y: '0',
    transition: {
      duration: 0.5,
      delay: i * 0.4,
    },
  }),
};

const SinglePost = ({ post, index, animate }) => {
  const placeHolder = post.content.slice(0, 50) + '...';
  const addedDate = moment(post.timestamp).format('LL');

  return (
    <motion.div
      className="card hover:shadow-lg"
      animate={animate}
      variants={singlePostVariants}
      initial="hidden"
      custom={index}
    >
      <div className="m-4 flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-2xl tracking-wide font-bold font-main text-gray-800">
            {post.title}
          </span>
          <span className="text-sm text-gray-500">Added : {addedDate}</span>
        </div>

        <div className="flex flex-col items-end">
          <span className="block text-gray-500 text-sm">
            Author : {post.user.username}
          </span>
          <div className="flex gap-2  items-center">
            <span className="text-xl text-gray-900 font-extrabold">
              {post.comments.length}
            </span>
            <svg
              className="w-6 h-6"
              fill="#111827"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <hr />
      <p className="text-lg font-semibold p-4 w-30">{placeHolder}</p>

      <Link href={`/posts/${post._id}`} passHref>
        <button className="text-sm rounded-lg absolute bottom-3 right-2  mr-3 mb-2 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4  font-secondary tracking-wide">
          READ
        </button>
      </Link>
    </motion.div>
  );
};

const TopPosts = ({ posts }) => {
  const topRow = posts.slice(0, 3);
  const bottomRow = posts.slice(3, 5);
  const titleControls = useAnimation();
  const topPostsControls = useAnimation();
  const [titleRef, titleInView] = useInView();
  const [topPostsRef, topPostsInView] = useInView();

  useEffect(() => {
    if (titleInView) titleControls.start('visible');
  }, [titleControls, titleInView]);

  useEffect(() => {
    if (topPostsInView) topPostsControls.start('visible');
  }, [topPostsControls, topPostsInView]);

  return (
    <AnimatePresence>
      <div
        className="flex items-center flex-col p-2 pr-12 pl-12"
        ref={titleRef}
      >
        <motion.div
          className="flex items-center my-4 before:flex-1 before:border-2 before:border-gray-900 before:mt-0.5 after:flex-1 after:border-2 after:border-gray-900 after:mt-0.5 w-full mt-12"
          animate={titleControls}
          initial="hidden"
          variants={borderVariants}
        >
          <motion.h1
            className="text-7xl font-bold text-gray-900 px-2  "
            animate={titleControls}
            initial="hidden"
            variants={titleVariants}
          >
            Top Posts
          </motion.h1>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-5 lg:justify-evenly pb-5 w-full">
          {topRow.map((post, i) => (
            <SinglePost
              key={post._id}
              post={post}
              animate={topPostsControls}
              index={i}
            />
          ))}
        </div>
        <span ref={topPostsRef}></span>
        <div className="grid lg:grid-cols-2 gap-5 lg:justify-center pb-12  lg:w-3/4 md:w-full">
          {bottomRow.map((post, i) => (
            <SinglePost
              key={post._id}
              post={post}
              animate={topPostsControls}
              index={i + 2.6}
            />
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default TopPosts;
