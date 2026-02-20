import { Invoice } from "../model/invoice.model.js";
import { InvoiceLine } from "../model/invoiceLine.model.js";
import { Payment } from "../model/payment.model.js";


export const getInvoiceById = async (invoiceId) => {
  // 1. Get invoice
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) {
    throw new Error('Invoice not found');
  }

  // 2. Get line items
  const lines = await InvoiceLine.find({ invoiceId });

  // 3. Get payments
  const payments = await Payment.find({ invoiceId });

  // 4. Calculate total from lines
  const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);

  // 5. Calculate amountPaid from payments
  const amountPaid = payments.reduce((sum, pay) => sum + pay.amount, 0);

  // 6. Calculate balance
  const balanceDue = total - amountPaid;

  // 7. Update invoice values in DB (keep consistent)
  invoice.total = total;
  invoice.amountPaid = amountPaid;
  invoice.balanceDue = balanceDue;

  // 8. Update status if fully paid
  if (balanceDue === 0 && total > 0) {
    invoice.status = 'PAID';
  }

  await invoice.save();

  return {
    invoice,
    lines,
    payments,
  };
};


export const createInvoice = async (payload) => {
  const { invoiceNumber, customerName, issueDate, dueDate, lines } = payload;

  if (!lines || lines.length === 0)
    throw new Error('Invoice must contain at least one line item');

  // 1. Create invoice first
  const invoice = await Invoice.create({
    invoiceNumber,
    customerName,
    issueDate,
    dueDate,
  });

  // 2. Prepare docs and insertMany (bypasses pre('save') middleware)
  const docs = lines.map(item => ({
    invoiceId: invoice._id,
    description: item.description,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    lineTotal: item.quantity * item.unitPrice, // compute here because middleware is bypassed
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const createdLines = await InvoiceLine.insertMany(docs, { ordered: true });

  // 3. Calculate total and save invoice
  const total = createdLines.reduce((sum, l) => sum + (l.lineTotal || 0), 0);
  invoice.total = total;
  invoice.balanceDue = total;
  await invoice.save();

  return {
    invoice,
    lines: createdLines,
  };
};


export const addPayment = async (invoiceId, amount) => {
  console.log("addPayment params:", invoiceId, amount, typeof amount);
  amount=Number(amount)
  if (!amount || amount <= 0)
    throw new Error('Payment amount must be greater than zero');
  

  const invoice = await Invoice.findById(invoiceId);
  if (!invoice)
    throw new Error('Invoice not found');

  // Recalculate totals to ensure consistency
  const lines = await InvoiceLine.find({ invoiceId });
  const payments = await Payment.find({ invoiceId });

  const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const alreadyPaid = payments.reduce((sum, pay) => sum + pay.amount, 0);

  const balanceDue = total - alreadyPaid;

  if (amount > balanceDue)
    throw new Error('Payment exceeds remaining balance');


  // Create payment
  const payment = await Payment.create({
    invoiceId,
    amount,
  });

  const newAmountPaid = alreadyPaid + amount;
  const newBalance = total - newAmountPaid;

  invoice.total = total;
  invoice.amountPaid = newAmountPaid;
  invoice.balanceDue = newBalance;

  if (newBalance === 0)
    invoice.status = 'PAID';

  await invoice.save();

  return {
    invoice,
    payment,
  };
};




export const archiveInvoice = async (invoiceId) => {
  const invoice = await Invoice.findById(invoiceId);

  if (!invoice)
    throw new Error('Invoice not found');

  invoice.isArchived = true;
  await invoice.save();

  return invoice;
};

export const restoreInvoice = async (invoiceId) => {
  const invoice = await Invoice.findById(invoiceId);

  if (!invoice)
    throw new Error('Invoice not found');

  invoice.isArchived = false;
  await invoice.save();

  return invoice;
};