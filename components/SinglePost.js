import { motion } from 'framer-motion';
import moment, { suppressDeprecationWarnings } from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

const SinglePost = ({ post, userAuth }) => {
  const { query } = useRouter();
  const titleTxt = post.title.split(' ');
  const [likeClicked, setLikedClicked] = useState(false);
  const [fakeLike, setFakeLike] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [warning, setWarning] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(userAuth);
  const [msg, setMsg] = useState('');

  const CheckLiked = () => {
    if (post.likes.includes(post.id)) setLiked(true);
    else setLikedClicked(false);
  };

  const CheckedUserLogged = () => {
    if (userAuth) {
      setWarning(false);
      setMsg('');
    } else setIsAuthorized(userAuth);
  };

  useEffect(() => {
    const id = localStorage.getItem('id');
    CheckLiked(id);
    CheckedUserLogged();
  }, [userAuth]);

  const likePost = async e => {
    if (!isAuthorized) {
      setMsg('Log in to like this post');
      setWarning(true);
      return;
    }
    setLikedClicked(!likeClicked);

    const postid = JSON.stringify({ postid: post._id });
    const token = localStorage.getItem('token');
    const bearer = `Bearer ${token}`;

    try {
      const request = await fetch(
        `http://localhost:3000/api/posts/${query.postId}`,
        {
          method: 'PUT',
          body: postid,
          headers: {
            'Content-Type': 'application/json',
            Authorization: bearer,
          },
        }
      );
      const data = await request.json();
      console.log(data);
      if (request.status === 200 && data.result.matchedCount) setFakeLike(true);
      else if (request.status === 200 && !data.result.matchedCount)
        setAlreadyLiked(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shadow-lg pb-6 px-4 mt-8 flex flex-col  items-center justify-center lg:w-3/4 md:w-4/5 border-l-4 border-r-4 border-gray-700">
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
      <hr />

      <div className="flex justify-between items-center  mt-8 gap-2 w-2/3 md:w-4/5 mb-2">
        <p className="text-lg text-gray-500 font-bold">
          Author{' '}
          <span className="text-gray-900 font-extrabold">
            <em>: {post.user.username}</em>
          </span>
        </p>
        <div className="flex gap-1 items-center">
          <div className="flex gap-2 ">
            <span className="text-gray-900  font-extrabold text-lg">
              Likes : {fakeLike ? post.likes.length + 1 : post.likes.length}
            </span>
            <svg
              className="w-6 h-6 hover:shadow-2xl cursor-pointer hover:scale-150 transition-transform ease-out"
              fill="#111827"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={likePost}
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
            </svg>
          </div>
          {warning && !userAuth && (
            <span className="text-sm text-red-500">{msg}</span>
          )}
          {fakeLike && (
            <span className="text-blue-500 text-sm">Thanks for Liking!</span>
          )}
          {alreadyLiked && !fakeLike && (
            <span className="text-blue-500 text-sm">
              You have already liked this post!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
