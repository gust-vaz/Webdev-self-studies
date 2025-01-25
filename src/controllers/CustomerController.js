const Customer = require('../models/Customer');  // Importing the model

// Create a new customer
async function createCustomer(req, res) {
    try {
        const { name, email, age } = req.body;
        const customer = await Customer.create({ name, email, age });
        res.status(201).json(customer);  // Send the created customer back in the response
    } catch (err) {
        if (err.message === 'Customer with this email already exists') {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Failed to create customer', error: err.message });
        }
    }
}

// Get all customers
async function getAllCustomers(req, res) {
    try {
        const customers = await Customer.findAll();  // Retrieve all customers from the model
        res.status(200).json(customers);  // Send the list of customers as the response
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch customers', error: err.message });
    }
}

// Get a customer by email
async function getCustomerByEmail(req, res) {
    try {
        const email = req.params.email;  // Get the email from the request parameters
        const customer = await Customer.findByEmail(email);  // Call the model method
        if (customer) {
            res.status(200).json(customer);  // Send the customer data as the response
        } else {
            res.status(404).json({ message: 'Customer not found' });  // Handle case where customer is not found
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch customer', error: err.message });
    }
}

// Update a customer by email
async function updateCustomer(req, res) {
    try {
        const email = req.params.email;  // Get the email from the request parameters
        const updates = req.body;  // Get the updates from the request body
        const updatedCustomer = await Customer.update(email, updates);  // Call the model method
        if (updatedCustomer) {
            res.status(200).json(updatedCustomer);  // Send the updated customer data as the response
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to update customer', error: err.message });
    }
}

// Delete a customer by email
async function deleteCustomer(req, res) {
    try {
        const email = req.params.email;  // Get the email from the request parameters
        await Customer.delete(email);  // Call the model method
        res.status(204).end();  // Send a success response with no content
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete customer', error: err.message });
    }
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerByEmail,
    updateCustomer,
    deleteCustomer
};
