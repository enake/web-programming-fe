import Header from '../components/Header'
import Meta from '../components/Meta'
import SignupForm from '../components/Signup'
import { Container, Row, Col } from 'react-bootstrap'

const SignupPage = () => {
  // page content
  const pageTitle = 'Sign Up'
  const pageDescription = 'Wellcome to conta app'

  return (
    <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} description={pageDescription} />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={{ span: 5 }}>
            <SignupForm></SignupForm>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignupPage