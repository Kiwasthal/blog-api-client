import { useRouter } from 'next/router';
import { motion, useAnimation } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';

const titleVariants = {
  hidden: { opacity: 0, y: '-10vh' },
  visible: {
    opacity: 1,
    y: '0',
    transition: { duration: 1, type: 'spring', delay: 1 },
  },
};

const formVariants = {
  ...titleVariants,
  visible: {
    opacity: 1,
    y: '0',
    transition: { duration: 1, type: 'spring', delay: 1.3 },
  },
};

const borderVariants = {
  hidden: { opacity: 0 },
  visible: {
    transition: { duration: 1, delay: 0.5 },
    opacity: 1,
  },
};

const Register = () => {
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('This field is required!')
      .min(3, 'Username must be at least 3 characters long'),
    password: Yup.string()
      .required('This field is required!')
      .min(6, 'Password must be at least 6 characters long!'),
    confirmPassword: Yup.string()
      .required('This field is required!')
      .oneOf([Yup.ref('password')], 'Passwords do not match!'),
  });

  return (
    <div className="w-full mt-5  flex  flex-col items-center">
      <motion.div
        className="flex items-center my-4 before:flex-1 before:border-2 before:border-gray-900 before:mt-0.5 after:flex-1 after:border-2 after:border-gray-900 after:mt-0.5 w-2/3 md:w-4/5 mt-12"
        initial="hidden"
        animate={controls}
        variants={borderVariants}
      >
        <motion.h1
          className="text-5xl font-bold text-gray-900 px-2  "
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          Sign-Up
        </motion.h1>
      </motion.div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={async (values, { setFieldError, errors }) => {
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
            if (request.status === 200) router.replace('/login');
            else {
              resJson.errors[0].msg === 'Error: Username already exists'
                ? setFieldError('username', 'Username already exists')
                : console.log('unhandler error');
            }
          } catch (err) {}
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded w-1/2 lg:w-2/5 pt-6 pb-8 mb-4 p-8">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={formVariants}
            >
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
                      type="text"
                      placeholder="User Name"
                      {...field}
                      className={
                        meta.error && meta.touched
                          ? 'border-red-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          : 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-slate-400'
                      }
                    />
                  )}
                </Field>
                <ErrorMessage name="username">
                  {errorMsg => (
                    <p
                      className="text-red-500 text-xs italic mt-1"
                      name="password"
                    >
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
                          : 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-slate-400'
                      }
                    />
                  )}
                </Field>
                <ErrorMessage name="password">
                  {errorMsg => (
                    <p
                      className="text-red-500 text-xs italic mt-1"
                      name="password"
                    >
                      {errorMsg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <Field name="confirmPassword">
                  {({ field, meta }) => (
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="******************"
                      {...field}
                      className={
                        meta.error && meta.touched
                          ? 'border-red-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          : 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-slate-400'
                      }
                    />
                  )}
                </Field>
                <ErrorMessage name="confirmPassword">
                  {errorMsg => (
                    <p
                      className="text-red-500 text-xs italic mt-1"
                      name="confirmPassword"
                    >
                      {errorMsg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="flex items-center justify-between">
                {isSubmitting ? (
                  <button
                    disabled
                    type="button"
                    className=" bg-gray-900 hover:bg-gray-700  focus:outline-none  font-bold first-line:rounded-lg text-white px-5 py-2 text-sm text-center mr-2 rounded inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register
                  </button>
                )}
              </div>
            </motion.div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
