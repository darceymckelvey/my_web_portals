import express from 'express';

import { sequelize } from '../backend/db/connect_db.mjs'

import authRoutes from '../backend/routes/auth.route.mjs'

import db from '../backend/models/user.model.mjs'

const PORT = process.env.PORT || 3000;

const app = express();

// more middleware to work with req, res body, header, JSON data
app.use(express.json());

app.use('/api/auth', authRoutes);

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`listening on localhost port ${PORT}`);
    });    
});
