import RegisterForm from '../components/Register';

const Register = ({ updateUserAuth, userAuth, username }) => {
  return (
    <RegisterForm
      updateUserAuth={updateUserAuth}
      userAuth={userAuth}
      username={username}
    />
  );
};

export default Register;
