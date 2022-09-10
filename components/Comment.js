import moment from 'moment';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const Comment = ({ comment, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const commentVariants = {
    hidden: index => ({
      x: index % 2 === 1 ? 100 : -100,
      opacity: 0,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: 0.5,
      },
    },
  };

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <motion.div
      className="p-2  border-gray-700  border-l-4 w-2/3 md:w-4/5 mb-2 shadow-md mt-4"
      variants={commentVariants}
      animate={controls}
      initial="hidden"
      custom={index}
    >
      <div className="flex justify-between px-2 pt-1">
        <span className="font-bold text-gray-900 text-lg">
          {comment.user.username} :
        </span>
        <span>
          <em className="text-sm font-semibold text-gray-500">
            {moment(comment.timestamp).format('LLL')}
          </em>
        </span>
      </div>
      <p className="px-2 text-gray-600 py-2 font-medium">{comment.comment}</p>
      <hr />
      <div className="flex justify-end p-2 gap-2  mt-1">
        <span className="text-gray-900  font-extrabold">
          Likes : {comment.likes.length}
        </span>
        <svg
          className="w-6 h-5 hover:shadow-2xl cursor-pointer hover:scale-150 transition-transform ease-out"
          fill="#111827"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
        </svg>
        <span ref={ref}></span>
      </div>
    </motion.div>
  );
};

export default Comment;
