import { useNavigate } from 'react-router-dom';
import { usePlaceOrderMutation } from '@/redux/features/order/orderApi';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

interface BuyNowButtonProps {
  title: string;
  productId: string;
  quantity: number;
  email: string;
  price: number;
}

const BuyNow = ({ productId, title, quantity, price }: BuyNowButtonProps) => {
  const navigate = useNavigate();
  const [createOrder, { isLoading }] = usePlaceOrderMutation();

  const handleBuyNow = async () => {
    try {
      const orderData = {
        product: productId,
        title: title,
        email: 'testuser@example.com',
        // email: email,
        quantity,
        totalPrice: quantity * price,
      };

      const res = await createOrder(orderData).unwrap();

      toast.success('Order placed successfully!');

      navigate('/checkout', {
        state: {
          order: res,
          paymentUrl: res.payment.checkout_url,
        },
      });
    } catch (error) {
      console.error('Order failed:', error);
      toast.error('Failed to place order');
    }
  };

  return (
    <Button className="flex-1" onClick={handleBuyNow} disabled={isLoading}>
      Buy Now
    </Button>
  );
};

export default BuyNow;
