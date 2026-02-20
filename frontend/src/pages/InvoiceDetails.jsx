import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/InvoiceHeader";
import InvoiceTable from "../components/InvoiceTable";
import InvoiceTotal from '../components/InvoiceTotal';
import PaymentsSection from '../components/PaymentsSection';
import axiosInstance from '../helper/axiosHelper';

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/invoices/${id}`);
      setInvoiceData(res.data.data);
      setLoading(false);
    } 
    catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch invoice');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  if (loading) 
    return <div className="text-center text-lg font-medium py-10">Loading...</div>;
  if (error) 
    return <div className="text-center text-red-500 font-semibold py-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
      {/* Header Section */}
      <Header invoice={invoiceData.invoice} />

      {/* Invoice Table */}
      <div className="mt-6">
        <InvoiceTable lines={invoiceData.lines} />
      </div>

      {/* Total Section */}
      <div className="mt-6">
        <InvoiceTotal invoice={invoiceData.invoice} />
      </div>

      {/* Payments Section */}
      <div className="mt-6">
        <PaymentsSection 
          invoice={invoiceData.invoice} 
          payments={invoiceData.payments} 
          onPaymentAdded={fetchInvoice} 
        />
      </div>
    </div>
  );
};

export default InvoiceDetails;