import Link from 'next/link';

const LogInToComment = ({ userAuth }) => {
  return (
    <div>
      {!userAuth && (
        <div>
          <div>
            <span>Login or register to leave a comment</span>
          </div>
          <div>
            <Link href="/login">
              <button>Login</button>
            </Link>
            <Link href="/register">
              <button>Register</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogInToComment;
