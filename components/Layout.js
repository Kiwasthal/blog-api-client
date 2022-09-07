import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="page">
      <Navbar />
      <main>{children}</main>
      <footer>Hello</footer>
    </div>
  );
};

export default Layout;
