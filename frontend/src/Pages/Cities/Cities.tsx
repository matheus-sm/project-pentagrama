import api from '../../Services/api'

import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface cities {
  id?: Number;
  city_name: String;
  state: String;
  foundation_date: String;
}

export function ListCities() {
  const [data, setData] = useState<cities[]>([])
  const [city_name, setCityName] = useState('')
  const [state, setState] = useState('')
  const [foundation_date, setFoundationDate] = useState('')

  useEffect(() => {
    loadDataTable()
  }, [])

  async function loadDataTable() {
    const response = await api.get('/cities/listIndex')
    setData(response.data.result)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

      const data: cities = {
        "city_name": city_name,
        "state": state,
        "foundation_date": foundation_date
      }

      await api.post('/cities/store', data)

      setCityName('')
      setState('')
      setFoundationDate('')

      loadDataTable()

      alert('Cidade cadastrada com sucesso!')

    } catch (ex: unknown) {
      if (ex instanceof AxiosError) {
        alert(`ERRO: ${ex?.response?.data.mensagem}`)
      }
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="mt-5">
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Nome:</Form.Label>
          <Form.Control id="name" placeholder="Digite seu nome" value={city_name} onChange={event => setCityName(event.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="state">Estado:</Form.Label>
          <Form.Control id="state" placeholder="Digite seu nome" value={state} onChange={event => setState(event.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="foundation_data">Data fundação:</Form.Label>
          <Form.Control id="foundation_data" placeholder="Digite seu nome" type="date" value={foundation_date} onChange={event => setFoundationDate(event.target.value)} />
        </Form.Group>
        <Button type="submit">Cadastar</Button>
      </Form>

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Estado</th>
            <th>Data de fundação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: cities, index: number) => (
            <tr key={index}>
              <td>{item.city_name}</td>
              <td>{item.state}</td>
              <td>{item.foundation_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListCities;