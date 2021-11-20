import react, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Label,
  Input,
  FormGroup,
  Form,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

const Home: NextPage = () => {
  const { handleSubmit, control } = useForm();
  const cardStyle = { width: '18rem' };
  const [valorFinal, setValorFinal] = useState<any>();
  const [valorParcela, setValorParcela] = useState<any>();
  const [valorComissao, setValorComissao] = useState<any>();

  const Cartoes = [
    { value: 35, label: 'Elo (Outros)' },
    { value: 30, label: 'Visa' },
    { value: 26, label: 'Mastercard' },
  ];
  const Parcelas = [
    { value: 1, label: '1 Parcela' },
    { value: 2, label: '2 Parcelas' },
    { value: 3, label: '3 Parcelas' },
    { value: 4, label: '4 Parcelas' },
    { value: 5, label: '5 Parcelas' },
    { value: 6, label: '6 Parcelas' },
    { value: 7, label: '7 Parcelas' },
    { value: 8, label: '8 Parcelas' },
    { value: 9, label: '9 Parcelas' },
    { value: 10, label: '10 Parcelas' },
    { value: 11, label: '11 Parcelas' },
    { value: 12, label: '12 Parcelas' },
  ];

  function SubmitForm(data: any) {
    const { Valor, Bandeira, Parcelas } = data;
    let juros = Bandeira?.value ? Bandeira?.value : 35;
    let parcela = Parcelas?.value ? Parcelas?.value : 12;
    console.log('juros', juros, 'parcelas', parcela);
    let valorFinal: any = (Valor * (1 + juros / 100)).toFixed(2);
    let valorParcela: any = (valorFinal / parcela).toFixed(2);
    let valorComissao: any = (valorFinal * ((0.3 / 100) * 12)).toFixed(2);
    setValorFinal(valorFinal);
    setValorParcela(valorParcela);
    setValorComissao(valorComissao);
  }
  return (
    <div className='d-flex justify-content-center flex-column'>
      <Head>
        <title>Boletos Zuccosat</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='d-flex justify-content-center flex-column'>
        <Row>
          <Col xs='1' sm=' 1'></Col>
          <Col xs='10'>
            <Card>
              <Form onSubmit={handleSubmit(SubmitForm)} className='p-2'>
                <FormGroup>
                  <Label for='exampleEmail'>Valor</Label>
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <Input
                        required
                        value={value}
                        onChange={onChange}
                        placeholder='Valor'
                      />
                    )}
                    control={control}
                    name='Valor'
                  />

                  <Label for='exampleEmail'>Bandeira</Label>
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <Select
                        value={value}
                        onChange={onChange}
                        defaultValue={{ value: '35%', label: 'Elo (Outros)' }}
                        options={Cartoes}
                      />
                    )}
                    control={control}
                    name='Bandeira'
                  />

                  <Label for='exampleEmail'>Parcelas</Label>
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <Select
                        value={value}
                        onChange={onChange}
                        defaultValue={{ value: 12, label: '12 Parcelas' }}
                        options={Parcelas}
                      />
                    )}
                    control={control}
                    name='Parcelas'
                  />
                </FormGroup>
                <Button color='primary' type='submit'>
                  Calcular
                </Button>
              </Form>
              {valorFinal && valorParcela && valorComissao && (
                <CardBody>
                  <div className='d-flex justify-content-center flex-column '>
                    <div className='d-flex justify-content-center'>
                      <div className='d-flex justify-content-center flex-column '>
                        <div className='d-flex justify-content-center'>
                          <Label for='exampleEmail'>Valor Final</Label>
                        </div>
                        <div className='d-flex justify-content-center'>
                          {valorFinal ? (
                            <CardText>{valorFinal} R$</CardText>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <div className='d-flex justify-content-center flex-column pt-5'>
                        <div className='d-flex justify-content-center'>
                          <Label for='exampleEmail'>Valor Parcelado</Label>
                        </div>
                        <div className='d-flex justify-content-center'>
                          {valorParcela ? (
                            <CardText>{valorParcela} R$</CardText>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <div className='d-flex justify-content-center flex-column pt-5'>
                        <div>
                          <Label for='exampleEmail'>Comissao</Label>
                        </div>
                        <div className='d-flex justify-content-center'>
                          {valorComissao ? (
                            <CardText>{valorComissao} R$</CardText>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              )}
            </Card>
          </Col>
          <Col sm='1'></Col>
        </Row>
      </main>
    </div>
  );
};

export default Home;
