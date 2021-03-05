import { React, useState, useEffect } from 'react'
import axios from 'axios'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Switch from '@material-ui/core/Switch';

// import abaixoDeDez from './api/abaixoDeDez.json'
// import acimaDeDez from './api/acimaDeDez.json'
import './App.css';
import Product from './components/Product'

function App() {
  let abaixoDeDezUrl = './api/abaixoDeDez.json' 
  let acimaDeDezUrl = './api/acimaDeDez.json'
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
        setProducts(res)
        let total = (res.totalizers[0].value / 100)
        let desconto = (res.totalizers[1].value / 100)
        setTotal(total)
        setDesconto(desconto)
        console.log(res)
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
