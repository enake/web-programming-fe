// components
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";

const Layout = ({ children }) => {
  return (
    <>
      <UserContext.Consumer>
        {state => <Menu context={state} />}
      </UserContext.Consumer>
      <main>{children}</main>
      <Footer />

    </>
  );
};

export default Layout;
