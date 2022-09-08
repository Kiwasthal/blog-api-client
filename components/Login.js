import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = ({ updateUserAuth }) => {
  const router = useRouter();
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = values => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('This field is required!')
      .min(3, 'Username must be at least 3 characters long!'),
    password: Yup.string()
      .required('This field is required!')
      .min(6, 'Password must be at least 6 characters long!'),
  });
  // onSubmit={async (values, { setSubmitting }) => {
  //   const formData = JSON.stringify(values);
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
  // }}

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
          Log In
        </motion.h1>
      </motion.div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        <Form className="bg-white shadow-md rounded w-1/2 lg:w-2/5 pt-6 pb-8 mb-4 p-8">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <Field name="username">
              {({ field, meta }) => (
                <input
                  id="username"
                  type="username"
                  placeholder="User Name"
                  {...field}
                  className={
                    meta.error && meta.touched
                      ? 'border-red-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      : 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  }
                />
              )}
            </Field>
            <ErrorMessage name="username">
              {errorMsg => (
                <p className="text-red-500 text-xs italic mt-1" name="password">
                  {errorMsg}
                </p>
              )}
            </ErrorMessage>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Field name="password">
              {({ field, meta }) => (
                <input
                  id="password"
                  type="password"
                  placeholder="******************"
                  {...field}
                  className={
                    meta.error && meta.touched
                      ? 'border-red-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      : 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  }
                />
              )}
            </Field>
            <ErrorMessage name="password">
              {errorMsg => (
                <p className="text-red-500 text-xs italic mt-1" name="password">
                  {errorMsg}
                </p>
              )}
            </ErrorMessage>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
