const InvoiceTotal = ({ invoice }) => {
  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Invoice Summary</h3>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-medium">Total:</span>{' '}
          <span className="font-semibold text-gray-900">₹{invoice.total}</span>
        </p>
        <p>
          <span className="font-medium">Amount Paid:</span>{' '}
          <span className="font-semibold text-green-600">₹{invoice.amountPaid}</span>
        </p>
        <p>
          <span className="font-medium">Balance Due:</span>{' '}
          <span className="font-semibold text-red-600">₹{invoice.balanceDue}</span>
        </p>
      </div>
    </div>
  );
};

export default InvoiceTotal;
