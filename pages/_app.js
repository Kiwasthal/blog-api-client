import '../styles/globals.css';
import '../styles/transition.css';
import Transition from '../components/Transition';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState(null);
  const [userAuth, setUserAuth] = useState(null);
  const [mounted, setMounted] = useState(false);
  console.log(userAuth);

  useEffect(() => {
    const user = localStorage.getItem('userAuth');
    const init = JSON.parse(user);
    setUserAuth(init || false);
    setMounted(true);
  }, []);

  useEffect(() => {
    let getUser = () => {
      if (mounted) localStorage.setItem('userAuth', JSON.stringify(userAuth));
      if (userAuth) setUsername(localStorage.getItem('username'));
    };

    getUser();

    return () => setMounted(false);
  }, [userAuth, mounted]);

  return (
    <Transition>
      <Layout
        userAuth={userAuth}
        updateUserAuth={setUserAuth}
        username={username}
      >
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
