console.log('E-Commerce API');
const port = process.env.PORT || 3000;
// Connect DB
// const {connectToDatabase} = require('./db/connect');

// const startServer = async()=>{
//     try {
//         const connection = await connectToDatabase(process.env.MONGO_URI);
//         if(connection){
//           console.log('connected to the database');
//           app.listen(port, console.log(`server is listening on port ${port}`));
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
// startServer();