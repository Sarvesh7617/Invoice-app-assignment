import { useState } from 'react';
import axiosInstance from '../helper/axiosHelper';

const Header = ({ invoice, onInvoiceUpdated }) => {
  const [loading, setLoading] = useState(false);

  const handleArchiveRestore = async () => {
    try {
      setLoading(true);
      if (invoice.isArchived) {
        await axiosInstance.post("/invoices/restore", { invoiceId: invoice._id });
        alert('Invoice restored');
      } else {
        await axiosInstance.post("/invoices/archive", { invoiceId: invoice._id });
        alert('Invoice archived');
      }
      onInvoiceUpdated(); // Refresh invoice data
      setLoading(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
      <h2 className="text-xl font-semibold text-gray-800">
        Invoice: {invoice.invoiceNumber}
      </h2>
      <p className="text-gray-700">
        <span className="font-medium">Customer:</span> {invoice.customerName}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Status:</span>{' '}
        <span
          className={`font-semibold ${
            invoice.status === 'PAID'
              ? 'text-green-600'
              : 'text-orange-500'
          }`}
        >
          {invoice.status}
        </span>
        {invoice.isArchived && (
          <span className="text-red-600 ml-3 font-medium">(Archived)</span>
        )}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Issue Date:</span>{' '}
        {new Date(invoice.issueDate).toLocaleDateString()}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Due Date:</span>{' '}
        {new Date(invoice.dueDate).toLocaleDateString()}
      </p>

      <button
        onClick={handleArchiveRestore}
        disabled={loading}
        className={`mt-3 px-4 py-2 rounded-md text-white font-medium transition-colors
          ${invoice.isArchived ? 'bg-green-600 hover:bg-green-70 hover:cursor-pointer' : 'bg-red-600 hover:bg-red-700 hover:cursor-pointer'}
          disabled:opacity-50`}
      >
        {invoice.isArchived ? 'Restore Invoice' : 'Archive Invoice'}
      </button>
    </div>
  );
};

export default Header;