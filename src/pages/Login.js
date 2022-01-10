import LoginForm from '../components/LoginForm'
import { Container, Row, Col } from 'react-bootstrap'
import Meta from '../components/Meta'
import Header from '../components/Header'
import { UserContext } from '../context/UserContext'

const LoginPage = () => {
  // page content
  const pageTitle = 'Login'
  const pageDescription = 'please use your email and password to log'

  return (
    <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} description={pageDescription} />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={{ span: 5 }}>
            <UserContext.Consumer>
            {value => <LoginForm context={value}></LoginForm>}
            </UserContext.Consumer>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginPage