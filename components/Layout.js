import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, userAuth, updateUserAuth, username }) => {
  return (
    <div className="page flex flex-col">
      <Navbar
        userAuth={userAuth}
        updateUserAuth={updateUserAuth}
        username={username}
      />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
