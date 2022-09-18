import api from '../../Services/api'

import { useState, useEffect, HtmlHTMLAttributes } from 'react'

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface reportItem {
  id?: Number;
  city_name: String;
  state: String;
  foundation_date: String;
  id_city?: Number;
  district?: String;
}

export function ListReport() {
  const [data, setData] = useState<reportItem[]>([])

  const [city_name, setCityName] = useState('')
  const [district, setDistrict] = useState('')
  const [start_date, setStartDate] = useState('')
  const [end_date, setEndDate] = useState('')

  useEffect(() => {
    loadDataTable()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    loadDataTable()
  }

  async function loadDataTable() {
    const params = {
      city_name: city_name || null,
      district: district || null,
      start_date: start_date || null,
      end_date: end_date || null
    }

    const response = await api.get('/report/listndex', { params })
    setData(response.data.result)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="mt-5">
        <Row>
          <Col xs={12} sm={6} md={3} lg={2} xl={2}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="city_name">Nome:</Form.Label>
              <Form.Control id="city_name" placeholder="Cidade" value={city_name} onChange={event => setCityName(event.target.value)} />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={3} lg={2} xl={2}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="district">Bairro:</Form.Label>
              <Form.Control id="district" placeholder="Bairro" value={district} onChange={event => setDistrict(event.target.value)} />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={3} lg={2} xl={2}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="start_date">Data de início:</Form.Label>
              <Form.Control id="start_date" placeholder="Digite a data de início" type="date" value={start_date} onChange={event => setStartDate(event.target.value)} />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={3} lg={2} xl={2}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="end_date">Data Final:</Form.Label>
              <Form.Control id="end_date" placeholder="Digite a data final" type="date" value={end_date} onChange={event => setEndDate(event.target.value)} />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={3} lg={2} xl={2}>
            <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
              <Button type="submit">Pesquisar:</Button>
            </div>
          </Col>
        </Row>
      </Form>

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Estado</th>
            <th>Data de fundação</th>
            <th>Bairro</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: reportItem, index: number) => (
            <tr key={index}>
              <td>{item.city_name}</td>
              <td>{item.state}</td>
              <td>{item.foundation_date}</td>
              <td>{item.district}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListReport;