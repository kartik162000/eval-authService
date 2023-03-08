const express=require('express');
const app=express();
const port=process.env.port || 8000;
const cors=require('cors');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/user',require('./src/routes/authRoutes'));
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
}
);