import axiosInstance from '../helper/axiosHelper';

const PaymentsSection = ({ invoice, payments, onInvoiceUpdated }) => {
  const handleAddPayment = async () => {
    if (invoice.isArchived) {
      alert('Cannot add payment to archived invoice');
      return;
    }

    const input = window.prompt(`Enter payment amount (Balance Due: ${invoice.balanceDue}):`);
    const amount = parseFloat(input);

    if (isNaN(amount) || amount <= 0) {
      alert('Invalid amount');
      return;
    }

    if (amount > invoice.balanceDue) {
      alert('Payment exceeds balance due');
      return;
    }

    try {
      await axiosInstance.post(`/invoices/${invoice._id}/payments`, { amount });
      alert('Payment added successfully');
      onInvoiceUpdated(); // refresh invoice
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add payment');
    }
  };

  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Payments</h3>

      <button
        onClick={handleAddPayment}
        disabled={invoice.isArchived}
        className={`mb-4 px-4 py-2 rounded-md text-white font-medium transition-colors
          ${invoice.isArchived ? 'bg-gray-400 hover:cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer'}
        `}
      >
        Add Payment
      </button>

      {payments.length === 0 ? (
        <p className="text-gray-600">No payments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr key={pay._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800 font-medium">₹{pay.amount}</td>
                  <td className="px-4 py-2 text-gray-800">
                    {new Date(pay.paymentDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentsSection;