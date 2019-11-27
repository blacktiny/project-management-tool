import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'

class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{'Dashboard'}</h3>
          </Col>
        </Row>
        <Row>
          
        </Row>
      </Container>
    )
  }
}

export default Dashboard
