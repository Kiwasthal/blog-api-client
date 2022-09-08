import LoginForm from '../components/Login';

const Login = ({ updateUserAuth, userAuth, username }) => {
  console.log(username);
  return (
    <LoginForm
      updateUserAuth={updateUserAuth}
      userAuth={userAuth}
      username={username}
    />
  );
};

export default Login;
