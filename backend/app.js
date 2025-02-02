const express = require('express');
const db = require('./server/config/db.js');
const customerRoute = require('./routes/CustomerRoute.js');
const port = process.env.PORT || 3000;
const app = express();

const initializeTable = async () => {
    try {
        const exists = await db.schema.hasTable('customers');
        if (!exists) {
            await db.schema.createTable('customers', (table) => {
                table.increments('id').primary();
                table.string('name').notNullable();
                table.string('email').notNullable().unique();
                table.integer('age').notNullable();
                table.timestamp('created_at').defaultTo(db.fn.now());
            });
            console.log('Table "customers" created');
        }
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

initializeTable().then(() => {
    app.listen(port, () => console.log(`app available on http://localhost:${port}`));
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/customers', customerRoute);
app.get("/", (req, res) => {
    res.send("Hello from Node API Server Updated");
});