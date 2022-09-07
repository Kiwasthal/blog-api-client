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
  return (
    <motion.div
      className="card hover:shadow-lg"
      animate={animate}
      variants={singlePostVariants}
      initial="hidden"
      custom={index}
    >
      <div className="m-4 flex justify-between items-end">
        <span className="text-xl tracking-wide font-bold font-main">
          {post.title}
        </span>
        <span className="block text-gray-500 text-sm">
          Author : {post.user.username}
        </span>
      </div>
    </motion.div>
  );
};

const TopPosts = ({ posts }) => {
  const topRow = posts.slice(0, 3);
  const bottomRow = posts.slice(3, 5);
  const controls = useAnimation();
  const postControls = useAnimation();
  const [ref, inView] = useInView();
  const [postsRef, postsInView] = useInView();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  useEffect(() => {
    if (postsInView) postControls.start('visible');
  }, [postControls, postsInView]);

  return (
    <AnimatePresence>
      <div className="flex items-center flex-col p-2 pr-12 pl-12" ref={ref}>
        <motion.div
          className="flex items-center my-4 before:flex-1 before:border-2 before:border-gray-900 before:mt-0.5 after:flex-1 after:border-2 after:border-gray-900 after:mt-0.5 w-full"
          animate={controls}
          initial="hidden"
          variants={borderVariants}
        >
          <motion.h1
            className="text-5xl font-bold text-gray-900 px-2 z-20"
            animate={controls}
            initial="hidden"
            variants={titleVariants}
          >
            Top Posts
          </motion.h1>
        </motion.div>
        <div
          className="grid lg:grid-cols-3 gap-5 lg:justify-evenly pb-5 w-full"
          ref={postsRef}
        >
          {topRow.map((post, i) => (
            <SinglePost
              key={post._id}
              post={post}
              animate={postControls}
              index={i}
            />
          ))}
        </div>
        <div
          className="grid lg:grid-cols-2 gap-5 lg:justify-center pb-12  lg:w-3/4 md:w-full"
          ref={postsRef}
        >
          {bottomRow.map((post, i) => (
            <SinglePost
              key={post._id}
              post={post}
              animate={postControls}
              index={i + 2.6}
            />
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

// <Link href={`/posts/${post._id}`} passHref>
//   <p>
//     {post._id} - {post.title}
//   </p>
// </Link>;
export default TopPosts;
