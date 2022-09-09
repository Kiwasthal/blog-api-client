import { useRouter } from 'next/router';
import { motion, useAnimation } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CreateCommentForm = ({ userAuth, regenerate }) => {
  const { query } = useRouter();
  const controls = useAnimation();

  const initialValues = {
    comment: '',
  };

  const validationSchema = Yup.object({
    comment: Yup.string().required('Your comment is empty!'),
  });

  return (
    <div className="w-2/3 md:w-4/5 ">
      {userAuth && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          onSubmit={async (
            values,
            { setFieldError, resetForm, setSubmitting }
          ) => {
            const formData = JSON.stringify(values);
            const token = localStorage.getItem('token');
            const bearer = `Bearer ${token}`;
            const param = query.postId;

            try {
              const request = await fetch(
                `http://localhost:3000/api/posts/${param}/comments`,
                {
                  method: 'POST',
                  body: formData,
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: bearer,
                  },
                }
              );
              const data = await request.json();
              if (request.status === 200) {
                resetForm();
                regenerate(true);
              } else setFieldError('comment', data.errors[0].msg);
              setSubmitting(false);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <motion.div initial="hidden" animate={controls}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-xl font-bold mb-2"
                    htmlFor="comment"
                  >
                    Write a comment
                  </label>
                  <Field name="comment">
                    {({ field, meta }) => {
                      return (
                        <div
                          className={
                            meta.error && meta.touched
                              ? 'flex items-center border-b border-red-700 py-1'
                              : 'flex items-center border-b border-gray-700 py-1'
                          }
                        >
                          <input
                            id="comment"
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Add a comment"
                            {...field}
                          />
                          <button
                            className="flex-shrink-0 bg-gray-700 hover:bg-gray-900 border-gray-700 hover:border-gray-900 text-sm border-4 text-white py-1 px-2 rounded"
                            type="submit"
                          >
                            Comment
                          </button>
                        </div>
                      );
                    }}
                  </Field>
                  <ErrorMessage name="comment">
                    {errorMsg => (
                      <p
                        className="text-red-500 text-xs italic mt-1"
                        name="comment"
                      >
                        {errorMsg}
                      </p>
                    )}
                  </ErrorMessage>
                </div>
              </motion.div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default CreateCommentForm;
