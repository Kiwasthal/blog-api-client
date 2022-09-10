import Link from 'next/link';

const LogInToComment = ({ userAuth }) => {
  return (
    <div>
      {!userAuth && (
        <div className="flex flex-col bg-gray-900 rounded-lg px-8 py-4 shadow-xl mb-2 mt-4">
          <div>
            <span className="text-white font-bold text-xl">
              REGISTER OR LOGIN TO LEAVE A COMMENT & LIKE
            </span>
          </div>
          <div className="flex justify-center items-center mt-3">
            <Link href="/login">
              <button className="text-sm text-white rounded-lg  mr-3 mb-2 bg-gray-700 hover:bg-gray-500 font-bold py-2 px-4  font-secondary tracking-wide">
                LOGIN
              </button>
            </Link>
            <Link href="/register">
              <button className="text-sm text-white rounded-lg  mr-3 mb-2 bg-gray-700 hover:bg-gray-500 font-bold py-2 px-4  font-secondary tracking-wide">
                REGISTER
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogInToComment;
