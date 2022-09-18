import api from '../../Services/api'

import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface district {
  id?: Number;
  id_city: String;
  district: String;
}

interface city {
  id: Number;
  city_name: String;
  state: String;
  foundation_date: String;
}

export function ListDistrict() {
  const [data, setData] = useState<district[]>([])

  const [id_city, setIdCity] = useState('')
  const [district, setDistrict] = useState('')
  const [listCities, setListCities] = useState<city[]>([])

  useEffect(() => {
    loadDataTable()
  }, [])

  async function loadDataTable() {
    const responseCities = await api.get('/cities/listIndex')
    setListCities(responseCities.data.result)

    const response = await api.get('/district/listndex')
    setData(response.data.result)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

      const data: district = {
        "id_city": id_city,
        "district": district,
      }

      await api.post('/district/store', data)

      setIdCity('')
      setDistrict('')

      loadDataTable()

      alert('Bairro cadastrado com sucesso!')

    } catch (ex: unknown) {
      console.log(ex)
      if (ex instanceof AxiosError) {
        alert(`ERRO: ${ex?.response?.data.mensagem}`)
      }
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="mt-5">
      <Form.Label htmlFor="district">Cidade:</Form.Label>
        <Form.Select aria-label="Default select example" value={id_city} onChange={event => setIdCity(event.target.value)}>
          <option>Selecione uma cidade</option>
          {listCities.map((item: city, index: number) => (
            <option key={index} value={String(item.id)}>{item.city_name}</option>
          ))}
        </Form.Select>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="district">Bairro:</Form.Label>
          <Form.Control id="district" placeholder="Digite o nome do Bairro" value={district} onChange={event => setDistrict(event.target.value)} />
        </Form.Group>
        <Button type="submit">Cadastar</Button>
      </Form>

      <Table>
        <thead>
          <tr>
            <th>Bairros</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: district, index: number) => (
            <tr key={index}>
              <td>{item.district}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListDistrict;