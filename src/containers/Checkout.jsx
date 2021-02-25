import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppContext from '../context/AppContext';
import '../styles/components/Checkout.css';

const Checkout = () => {
  const { state, removeFromCart } = useContext(AppContext);
  const { cart } = state;

  const handleRemove = (product) => () => {
    removeFromCart(product);
  };

  const handleSumTotal = () => {
    const reducer = (acucumulator, currentValue) =>
      acucumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <>
    <Helmet>
      <title>Lista de Pedidos - Platzi Conf Merch</title>
    </Helmet>
      <div className="Checkout">
        <div className="Checkoit-content">
          {cart.length > 0 ? (
            <h3>Lista de Pedidos</h3>
          ) : (
            <h3>Sin Pedidos...</h3>
          )}
          {cart.map((item) => (
            <div className="Checkout-item" key={item.id}>
              <div className="Checkout-item">
                <div className="Checkout-element">
                  <h4>{item.title}</h4>
                  <span>${item.price}</span>
                </div>
                <button type="button" onClick={handleRemove(item)}>
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="Checkout-sidebar">
            <h3>{`Precio Total $${handleSumTotal()}`}</h3>
            <Link to="/checkout/information">
              <button type="button">Continuar Pedido</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
