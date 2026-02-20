const InvoiceTable = ({ lines }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Quantity
            </th>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Unit Price
            </th>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Line Total
            </th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-800">{line.description}</td>
              <td className="px-4 py-2 text-gray-800">{line.quantity}</td>
              <td className="px-4 py-2 text-gray-800">₹{line.unitPrice}</td>
              <td className="px-4 py-2 text-gray-800 font-medium">₹{line.lineTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;