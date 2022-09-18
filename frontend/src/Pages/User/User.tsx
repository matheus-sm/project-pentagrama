import api from '../../Services/api'

import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface user {
  id?: Number;
  name: String;
  email: String;
  password: String;
}

export function ListUser() {
  const [data, setData] = useState<user[]>([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    loadDataTable()
  }, [])

  async function loadDataTable() {
    const response = await api.get('/user/listIndex')
    setData(response.data.result)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

      const data: user = {
        "name": name,
        "email": email,
        "password": password
      }

      await api.post('/user/store', data)

      setName('')
      setEmail('')
      setPassword('')

      loadDataTable()

      alert('Usuário cadastrado com sucesso!')

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
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Nome de Usuário</Form.Label>
          <Form.Control id="name" placeholder="Digite o nome de usuário" value={name} onChange={event => setName(event.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">E-mail</Form.Label>
          <Form.Control id="email" placeholder="Digite seu e-mail" type="email" value={email} onChange={event => setEmail(event.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Senha</Form.Label>
          <Form.Control id="password" placeholder="Digite sua senha" type="password" value={password} onChange={event => setPassword(event.target.value)} />
        </Form.Group>
        <Button type="submit">Cadastar</Button>
      </Form>

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: user, index: number) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListUser;