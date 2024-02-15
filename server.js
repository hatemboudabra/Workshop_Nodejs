const express = require('express')
const mongoose = require('./config/db');
const AdminApi=require('./routes/user');
const PostApi=require('./routes/post');
const { swaggerUi, specs } = require('./swagger');

let app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/admin',AdminApi)
app.use('/post',PostApi);

app.listen(3000,()=>{
    console.log('server work');
})