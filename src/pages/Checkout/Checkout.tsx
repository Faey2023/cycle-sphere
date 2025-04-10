import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGetSingleBicycleQuery } from '@/redux/api/productApi';
import { Bicycle, TOrder } from '@/types';

const Checkout = () => {
  const location = useLocation();
  const orderState = location.state?.order;
  const order: TOrder = orderState?.data;
  const orderedProductId = order?.product;

  // caught ordered product using id from productApi
  const { data, isLoading } = useGetSingleBicycleQuery(orderedProductId);
  const orderedProductData: Bicycle = data?.data;

  console.log(order);
  console.log('Order order order!', order?.product, orderedProductData, isLoading);

  if (!order) {
    return <p className="p-6">No order found. Please try again.</p>;
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <h2 className="mb-4 text-2xl font-semibold">Confirm Your Order</h2>
      <div className="rounded-lg border p-4 shadow">
        <p>
          <strong>Product Name:</strong> {orderedProductData.name}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p>
          <strong>Price:</strong> ${order.totalPrice}
        </p>
      </div>

      <Button className="mt-4 w-full">Proceed to Payment</Button>
    </div>
  );
};
export default Checkout;
