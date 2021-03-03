import { React, useState, useEffect } from 'react'
import axios from 'axios'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Switch from '@material-ui/core/Switch';

import './App.css';
import Product from './components/Product'

function App() {
  let abaixoDeDezUrl = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5bbd6fdd-abae-411d-96cc-1a5d76d3803b/abaixo-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210302T143819Z&X-Amz-Expires=86400&X-Amz-Signature=2d5c466fe76b4060873661f95bf1481c201939205dbd80fc5a7260f89f8b7b49&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22abaixo-10-reais.json%22'
  let acimaDeDezUrl = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/11b895d0-bc64-4f3a-bfa9-7c652be8d415/acima-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210302T163708Z&X-Amz-Expires=86400&X-Amz-Signature=297112925541b87f082ad43cf8a99ab3e695e4ca4bb94891ea722118ca31818c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22acima-10-reais.json%22'
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [desconto, setDesconto] = useState(0)
  const [url, setUrl] = useState(acimaDeDezUrl)
  const [interruptorButton, setInterruptorButton] = useState({
    checked: true
  })

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setProducts(res.data)
        let total = (res.data.totalizers[0].value / 100)
        let desconto = (res.data.totalizers[1].value / 100)
        setTotal(total)
        setDesconto(desconto)
      })
      .catch(err => console.log(err))

  }, [interruptorButton, url])

  const handleChange = (event) => {
    setInterruptorButton({ ...interruptorButton, [event.target.name]: event.target.checked });
    if (event.target.checked)
      setUrl(acimaDeDezUrl)
    else
      setUrl(abaixoDeDezUrl)

  };

  return (
    <div className="container">
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <FormControlLabel
          control={<Switch checked={interruptorButton.checked} color="primary" onChange={handleChange} name="checked" />}
          label="Frete grátis?"
        />
      </div>
      <div className="App">
        <div className="header-container">
          <ShoppingCartIcon />
          <div>
            <h2 className="header">Meu Carrinho</h2>
          </div>
        </div>
        {products?.items?.map((product, key) => {
          return (
            <Product key={key} imageUrl={product.imageUrl} name={product.name}
              price={product.price} sellingPrice={product.sellingPrice} />
          )
        })
        }
        <div className="total">
          <h2 style={{ width: '13vw', marginLeft: '25px', textAlign: '-moz-left' }}>Total</h2>
          <h3 className="total-price">R$ {(total + desconto).toFixed(2).toString().replace('.', ',')}</h3>
          {(total + desconto).toFixed(2) > 10 &&
            <div className="frete-gratis" >
              <p className="frete-gratis-text">
                Parabéns, sua compra tem frete grátis !
              </p>
            </div>
          }
        </div>
        <div style={{ borderTop: '2px solid rgb(238, 238, 238)' }}>
          <button className="button">
            <h3>Finalizar compra</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
