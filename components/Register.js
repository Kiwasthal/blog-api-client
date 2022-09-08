import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Formik } from 'formik';

const Register = ({ updateUserAuth }) => {
  const router = useRouter();
  // const [logErr, setLogErr] = useState(false);
  // const [errMsg, setErrMsg] = useState('');

  // const submitForm = async (data, e) => {
  //   const formData = JSON.stringify(data);

  //   try {
  //     const request = await fetch('http://localhost:3000/api/login', {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const resJson = await request.json();
  //     if (request.stats === 200) {
  //       await updateUserAuth(true);
  //       localStorage.setItem('token', resJson.token);
  //       localStorage.setItem('userAuth', true);
  //       localStorage.setItem('username', myJson.body.username);
  //       localStorage.setItem('id', myJson.body._id);
  //       router.back();
  //     } else {
  //       setErrMsg(resJson.info.message);
  //       setLogErr(true);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="w-full mt-5  flex  flex-col items-center">
      <motion.div
        className="flex items-center my-4 before:flex-1 before:border-2 before:border-gray-900 before:mt-0.5 after:flex-1 after:border-2 after:border-gray-900 after:mt-0.5 w-2/3 md:w-4/5 mt-12"
        initial="hidden"
      >
        <motion.h1
          className="text-5xl font-bold text-gray-900 px-2  "
          initial="hidden"
        >
          Register
        </motion.h1>
      </motion.div>
      <Formik
        initialValues={{ username: '', password: '', confirmpass: '' }}
        validate={values => {
          const errors = {};
          if (!values.username) errors.username = 'Required';
          else if (values.password !== values.confirmpass)
            errors.password = 'Passwords do not match';

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const formData = JSON.stringify(values);
          try {
            const request = await fetch('http://localhost:3000/api/register', {
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const resJson = await request.json();
            if (request.stats === 200) {
              await updateUserAuth(true);
              localStorage.setItem('token', resJson.token);
              localStorage.setItem('userAuth', true);
              localStorage.setItem('username', myJson.body.username);
              localStorage.setItem('id', myJson.body._id);
              router.back();
            } else {
              setErrMsg(resJson.info.message);
              setLogErr(true);
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="bg-white shadow-md rounded w-1/2 lg:w-2/5 pt-6 pb-8 mb-4 p-8">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
              />
              <p className="text-red-500 text-xs italic"></p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="******************"
              />
              <p className="text-red-500 text-xs italic"></p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="******************"
              />
              <p className="text-red-500 text-xs italic"></p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Register
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
