import mongoose from "mongoose";


const PaymentSchema = new mongoose.Schema({
    invoiceId: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
},{ timestamps: true });

export const Payment = mongoose.model('Payment', PaymentSchema);
