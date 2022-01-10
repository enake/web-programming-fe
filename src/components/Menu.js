import { Link } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";

const Menu = (props, state) => {
  const { context } = props;
  const { userObject } = context;

  let isLoggedIn = false;
  if (userObject.user.token)
    isLoggedIn = true

  return (

    <Container>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          Conta APP
        </Link>
        <Nav>
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/about" className="nav-link px-2 link-secondary">
                About
              </Link>
            </li>
          </ul>

          {!isLoggedIn &&
            <Nav>
              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <Link to="/signup" className="nav-link px-2 link-secondary">
                    Sign Up
                  </Link>
                </li>
              </ul><div className="text-end">
                <Link to="/login">
                  <button type="button" className="btn btn-outline-primary me-4">
                    Log In
                  </button>
                </Link>
              </div>
            </Nav>
          }

          {isLoggedIn &&
            <Nav>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/files" className="nav-link px-2 link-secondary">
                  Files
                </Link>
              </li>
            </ul>
            <div className="text-end">
              <Link to="#">
                <button type="button" onClick={userObject.logout} className="btn btn-outline-primary me-4">
                  Log Out
                </button>
              </Link>
            </div>
            </Nav>
          }
        </Nav>
      </header>
    </Container>
  );
};

export default Menu;
