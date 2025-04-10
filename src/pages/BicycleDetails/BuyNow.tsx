import { useNavigate } from 'react-router-dom';
import { usePlaceOrderMutation } from '@/redux/features/order/orderApi';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BuyNowButtonProps {
  title: string;
  productId: string;
  quantity: number;
  email: string;
  price: number;
}

const BuyNow = ({ productId, title, email, quantity, price }: BuyNowButtonProps) => {
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

      const response = await createOrder(orderData).unwrap();

      toast.success('Order placed successfully!');

      navigate('/checkout', { state: { order: response } });
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
