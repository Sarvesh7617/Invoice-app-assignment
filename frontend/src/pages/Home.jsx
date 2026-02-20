import { useState } from 'react';
import axiosInstance from '../helper/axiosHelper';
import { Outlet, useParams } from 'react-router-dom';

const Home = () => {
  const {id}=useParams();
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [total, setTotal] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!invoiceNumber || !customerName || !issueDate || !dueDate || !total) {
      setError('Please fill out all fields!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const newInvoice = {
      invoiceNumber, 
      customerName, 
      issueDate, 
      dueDate, 
      lines: [{
        description: "Service", 
        quantity: 1, 
        unitPrice: parseFloat(total) || 0  // 👈 YE CHANGE
      }]
    };

console.log("Payload being sent:", newInvoice);

    try {
      const createdInvoice = await axiosInstance.post("/invoices", newInvoice);
      setSuccess(
        createdInvoice.data?.id
          ? `Invoice created successfully! You can view it at /invoices/${createdInvoice.data.id}`
          : "Invoice created successfully!"
      );

      setError('');

      setInvoiceNumber('');
      setCustomerName('');
      setIssueDate('');
      setDueDate('');
      setTotal('');
    } 
    catch (err) {
      console.log("RESPONSE DATA:", err.response?.data); // backend ka message
      setError(err.response?.data?.message || err.message || "Something went wrong");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create New Invoice</h2>
        
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-2 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Issue Date</label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Total Amount</label>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating Invoice...' : 'Create Invoice'}
          </button>
        </form>
      </div>
      {id &&
        <div className='mt-5'>
          <h1 className='text-2xl font-bold text-center bg-red-400 p-2 rounded-md w-fit m-auto'>Invoice Detaile of {id}</h1>
          <Outlet />
        </div>
      }
    </>
  );
};

export default Home;