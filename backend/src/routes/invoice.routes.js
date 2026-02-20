import {Router} from 'express';
import { addPayments, archiveInvoices, createInvoices, getInvoiceDetails, restoreInvoices } from '../controllers/invoice.controller.js';



const router=Router()


router.route('/:id').get(getInvoiceDetails);
router.route('/').post(createInvoices);
router.route('/:id/payments').post(addPayments);
router.route('/archive').post(archiveInvoices);
router.route('/restore').post(restoreInvoices);


export default router;