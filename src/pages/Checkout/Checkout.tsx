const Checkout = () => {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Checkout Page</h1>
      <div className="space-y-4">
        <p>
          <strong>Order Summary</strong>
        </p>
        <div className="rounded-xl bg-gray-100 p-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <ul>
            <li>Item 1 - Price: $1200</li>
            <li>Item 2 - Price: $800</li>
          </ul>
          <div className="mt-4">
            <p>
              <strong>Total: </strong>$2000
            </p>
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full rounded-xl bg-blue-600 py-2 text-white">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
