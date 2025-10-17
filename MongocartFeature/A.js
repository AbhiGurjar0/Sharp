const express  =  require('express');
const app  =  express();
const userRouter  =  require('./Routes/user');


app.set('view engine', 'ejs');

app.get('/', userRouter);

app.listen(3000, () => {
    console.log('Mongocart Feature server is running on port 3000');
}); 