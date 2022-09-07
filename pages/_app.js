import '../styles/globals.css';
import '../styles/transition.css';
import Transition from '../components/Transition';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Transition>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Transition>
  );
}

export default MyApp;
