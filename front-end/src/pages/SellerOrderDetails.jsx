import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api, { setToken } from '../axios/config';
import Loading from '../components/Loading';

export default function SellerOrderDetails() {
  const { id } = useParams();
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('');
  const [saleDate, setSaleDate] = useState('');

  useEffect(() => {
    const getSaleDetails = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      setToken(token);
      try {
        const { data } = await api.get(`/seller/orders/${id}`);
        setTotal(data.sale.totalPrice);
        setStatus(data.sale.status);
        setSaleDate(data.sale.saleDate);
        setSales(data.products);
      } catch (error) {
        console.error(error);
      }
    };
    getSaleDetails();
  }, []);

  if (sales.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div>
        <span
          data-testid={
            `seller_order_details__element-order-details-label-order-${id}`
          }
        >
          {`Pedido: ${id}`}
        </span>
      </div>
      <span
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {' '}
        {saleDate}
      </span>
      <span
        data-
        testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {' '}
        {status}
        {' '}
      </span>
      <button
        data-testid="seller_order_details__button-preparing-check"
        type="button"
      >
        {' '}
        Preparar Pedido
      </button>
      <button
        data-testid="seller_order_details__button-dispatch-check"
        type="button"
      >
        {' '}
        Saiu para entrega
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descriçao</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(({ quantity, name, price }, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `seller_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-name-${index}`
                }
              >
                {name}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index}`
                }
              >
                {quantity}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index}`
                }
              >
                {price.replace('.', ',')}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index}`
                }
              >
                {`${(quantity * price).toFixed(2).replace('.', ',')}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        data-testid="seller_order_details__element-order-total-price"
      >
        {total.replace('.', ',')}
      </div>
    </div>
  );
}
