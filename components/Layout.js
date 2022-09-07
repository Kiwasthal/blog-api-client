const Layout = ({ children }) => {
  return (
    <div className="page">
      <nav>Hello</nav>
      <main>{children}</main>
      <footer>Hello</footer>
    </div>
  );
};

export default Layout;
