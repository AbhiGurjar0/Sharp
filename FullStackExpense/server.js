const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const Expense = require('./models/expense');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/expenses', expenseRoutes);

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error syncing DB', err));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

