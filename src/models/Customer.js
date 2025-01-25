const db = require('../server/config/db');

class Customer {
    constructor({ id, name, email, age, created_at }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.created_at = created_at;
    }

    static async create({ name, email, age }) {
        try {
            // Check if a customer already exists with the given email
            const existingCustomer = await db('customers').where({ email }).first();
            if (existingCustomer) {
                throw new Error('Customer with this email already exists');
            }
    
            // Insert the new customer into the database and return all columns
            const [insertedCustomer] = await db('customers')
                .insert({ name, email, age })
                .returning('*');  // This will return the entire inserted row
    
            // Create and return a new Customer instance with the inserted data
            return new Customer({
                id: insertedCustomer.id,  // Extract the id from the inserted row
                email: insertedCustomer.email,
                name: insertedCustomer.name,
                age: insertedCustomer.age,
                created_at: insertedCustomer.created_at // The created_at is already set by the DB
            });
        } catch (err) {
            console.error('Error creating customer:', err);
            throw err;  // Rethrow the error to be handled in the controller
        }
    }
    

    static async findByEmail(email) {
        try {
            const customer = await db('customers').where({ email }).first();
            return customer ? new Customer(customer) : null;
        } catch (err) {
            console.error('Error finding customer by email:', err);
        }
    }

    static async findAll() {
        try {
            const customers = await db('customers').select();
            return customers.map(customer => new Customer(customer));
        } catch (err) {
            console.error('Error finding all customers:', err);
        }
    }

    static async update(email, updates) {
        try {
            await db('customers').where({ email }).update(updates);
            const updatedCustomer = await db('customers').where({ email }).first();
            return new Customer(updatedCustomer);
        } catch (err) {
            console.error('Error updating customer:', err);
        }
    }

    static async delete(email) {
        try {
            await db('customers').where({ email }).del();
        } catch (err) {
            console.error('Error deleting customer:', err);
        }
    }
}

module.exports = Customer;