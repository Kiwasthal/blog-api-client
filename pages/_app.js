import '../styles/globals.css';
import '../styles/transition.css';
import Transition from '../components/Transition';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [userAuth, setUserAuth] = useState(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('userAuth');
      const init = JSON.parse(user);
      return init || false;
    }
  });

  useEffect(() => {
    let isMounted = true;
    let getUser = () => {
      if (isMounted) localStorage.setItem('userAuth', JSON.stringify(userAuth));
    };
    getUser();
    return () => (isMounted = false);
  }, [userAuth]);

  return (
    <Transition>
      <Layout userAuth={userAuth} updateUserAuth={setUserAuth}>
        <Component
          {...pageProps}
          userAuth={userAuth}
          updateUserAuth={setUserAuth}
        />
      </Layout>
    </Transition>
  );
}

export default MyApp;
