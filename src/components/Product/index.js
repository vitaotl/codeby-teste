import React from 'react';
import './Product.css'
// import { Container } from './styles';

function Product({ imageUrl, name, price, sellingPrice }) {
  return (
    <div className="product">

      <img src={imageUrl} alt={name} className="productImage" />
      <div className="productInfo">
        <div className="productName">
          {name}
        </div>
        <div className="productPrice">
          <div  className="normalPrice">
            RS {((price / 100).toFixed(2)).toString().replace('.', ',')}
          </div>
          <div>
            RS {((sellingPrice / 100).toFixed(2)).toString().replace('.', ',')}
          </div>
        </div>
        {/* <div className="productSellingPrice">
        </div> */}
      </div>
    </div>
  );
}

export default Product;