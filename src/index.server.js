const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/admin.auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

//environment variable or you can say constants
env.config();

// mongodb connection
// mongodb+srv://eduards:Asdzxc@mern-e-commerce.zcqdq.mongodb.net/mern-practice?retryWrites=true&w=majority

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@e-commerce.josvr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}
).then(() => {
    console.log('Database connected!!!');
});
//для чтения данных HTTP POST мы должны использовать модуль узла «express.json». express.json - это часть промежуточного программного обеспечения Express, которое читает входные данные формы и сохраняет их как объект javascript, доступный через req.body
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server has been started on port ${process.env.PORT}`);
});