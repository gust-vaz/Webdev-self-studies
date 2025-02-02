const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController');

// Define routes and bind them to controller actions, using email as identifier
router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:email', customerController.getCustomerByEmail);
router.put('/:email', customerController.updateCustomer);
router.delete('/:email', customerController.deleteCustomer);

module.exports = router;
