import mysql from 'mysql'
import express, { response } from 'express'
import cors from 'cors'
// import session from 'express-session'
const app=express()
app.use(express.json())
app.use(cors())
// app.use(session({
//      secret:"demo",
//      resave:false,
//      saveUninitialized:true,
//      cookie:  {httpOnly: true }
// }))
// app.use(function(req,res,next){

// res.set("Cache-Control","no-store")
// next()



// })
const db=mysql.createConnection({
     host:"localhost",
     user:"root",
     password:"",
     database:"annee"
})
db.connect((err)=>{
     if(err){
          console.log("Failed")
     }
     else{
          console.log("connected successfully")
     }
})




app.get("/logout",(req,res)=>{
     req.session.destroy((err)=>{
          if(err) return res.status(404).json("error")
           return res.status(200).json("logged out")
     })
})
app.post('/addproduct',(req,res)=>{
     const {pname}=req.body;
     const sql="INSERT INTO products (pname) VALUES(?)";
     db.query(sql,[pname],(err,result)=>{
          if(err) return res.status(404).json("Failed")
         return res.status(200).json(result)

     })
})
app.get('/selectproducts',(req,res)=>{
     const sql="SELECT * FROM products";
     db.query(sql,(err,result)=>{
if(err) return res.status(404).json("failed")
 return res.status(200).json(result)
     })
})


app.delete('/deleteproducts/:pid',(req,res)=>{
     const {pid}=req.params;
     const sql="DELETE FROM products where pid=?";
     db.query(sql,[pid],(err,result)=>{
if(err) return res.status(404).json("failed")
 return res.status(200).json(result)
     })
})


// app.put('updateproducts/:pid',(req,res)=>{
//      const {pid}=req.params;
//      const {pname}=req.body;
//      const sql="UPDATE products set pname=? where pid=?";
//      db.query(sql,[pname,pid],(err,result)=>{
// if(err) return res.status(404).json("failed")
//  return res.status(200).json(result)
//      })
// })
app.put('/updateproducts/:pid', (req, res) => {
    const { pid } = req.params;
    const { pname } = req.body;
    const sql = "UPDATE products SET pname = ? WHERE pid = ?";
    db.query(sql, [pname, pid], (err, result) => {
        if (err) return res.status(404).json("failed");
        return res.status(200).json(result);
    });
});


app.get('/selectupd/:pid',(req,res)=>{
     const {pid}=req.params;
     const sql="SELECT * FROM products where pid=?";
     db.query(sql,[pid],(err,result)=>{
if(err) return res.status(404).json("failed")
 return res.status(200).json(result[0])
     })
})




/////////////////////stockin table ///////////////////////////



app.post('/addstockin',(req,res)=>{
     const {pid,date,quantity,unitprice}=req.body;
     const sql="INSERT INTO stockin (pid,date,quantity,unitprice) VALUES(?,?,?,?)";
     db.query(sql,[pid,date,quantity,unitprice],(err,result)=>{
          if(err) return res.status(404).json("Failed")
         return res.status(200).json(result)

     })
})
app.get('/selectstockin',(req,res)=>{
     const sql="SELECT * FROM stockin";
     db.query(sql,(err,result)=>{
if(err) return res.status(404).json("failed")
 return res.status(200).json(result)
     })
})


app.delete('/deletestockin/:pid',(req,res)=>{
     const {pid}=req.params;
     const sql="DELETE FROM stockin where pid=?";
     db.query(sql,[pid],(err,result)=>{
if(err) return res.status(404).json("failed")
 return res.status(200).json(result)
     })
})


// app.put('updateproducts/:pid',(req,res)=>{
//      const {pid}=req.params;
//      const {pname}=req.body;
//      const sql="UPDATE products set pname=? where pid=?";
//      db.query(sql,[pname,pid],(err,result)=>{
// if(err) return res.status(404).json("failed")
//  return res.status(200).json(result)
//      })
// })
// pid				
// 	2	date	date			
// 	3	quantity	int(255)			
// 	4	unit price	int(255)			
// 	5	total price

app.put('/updatestockin/:pid', (req, res) => {
    const { pid } = req.params;
    const { date, quantity, unitprice } = req.body;

    const sql = "UPDATE stockin SET date = ?, quantity = ?, unitprice = ? WHERE pid = ?";
    db.query(sql, [date, quantity, unitprice, pid], (err, result) => {
        if (err) return res.status(404).json("failed");
        return res.status(200).json(result);
    });
});




app.get('/selectupdstockin/:pid',(req,res)=>{
     const {pid}=req.params;
     const sql="SELECT * FROM stockin where pid=?";
     db.query(sql,[pid],(err,result)=>{
if(err) return res.status(404).json("failed")
 return res.status(200).json(result[0])
     })
})

/////////////////////STOCKOUT //////////////////////////////////////

app.post('/addstockout',(req,res)=>{
     const {pid,date,quantity}=req.body;
     const sql="INSERT INTO stockout (pid,date,quantity) VALUES(?,?,?)";
     db.query(sql,[pid,date,quantity],(err,result)=>{
          if(err) return res.status(404).json("Failed")
         return res.status(200).json(result)

     })
})
app.get('/selectstockout',(req,res)=>{
     const sql="SELECT * FROM stockout";
     db.query(sql,(err,result)=>{
if(err) return res.status(404).json("failed")
 return res.status(200).json(result)
     })
})


app.delete('/deletestockout/:pid',(req,res)=>{
     const {pid}=req.params;
     const sql="DELETE FROM stockout where pid=?";
     db.query(sql,[pid],(err,result)=>{
if(err) return res.status(404).json("failed")
 return res.status(200).json(result)
     })
})


// app.put('updateproducts/:pid',(req,res)=>{
//      const {pid}=req.params;
//      const {pname}=req.body;
//      const sql="UPDATE products set pname=? where pid=?";
//      db.query(sql,[pname,pid],(err,result)=>{
// if(err) return res.status(404).json("failed")
//  return res.status(200).json(result)
//      })
// })
// pid				
// 	2	date	date			
// 	3	quantity	int(255)			
// 	4	unit price	int(255)			
// 	5	total price

app.put('/updatestockout/:pid', (req, res) => {
    const { pid } = req.params;
    const { date, quantity } = req.body;

    const sql = "UPDATE stockout SET date = ?, quantity = ? WHERE pid = ?";
    db.query(sql, [date, quantity,  pid], (err, result) => {
        if (err) return res.status(404).json("failed");
        return res.status(200).json(result);
    });
});

app.get('/selectupdstockout/:pid',(req,res)=>{
     const {pid}=req.params;
     const sql="SELECT * FROM stockout where pid=?";
     db.query(sql,[pid],(err,result)=>{
if(err) return res.status(404).json("failed")
 return res.status(200).json(result[0])
     })
})


/////////////////////////ADMIN LOGIN //////////////////////////////




app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const sql = "SELECT * FROM admin WHERE name = ? AND password = ?";
    
    db.query(sql, [name, password], (err, result) => {
        if (err) {
            return res.status(500).json("Failed to connect to the database");
        }
        
        if (result.length === 0) {
            return res.status(404).json("Invalid credentials");
        }
        
        return res.status(200).json(`Welcome ${name}`);
    });
});

app.post('/create',(req,res)=>{
     
     const {name,password}=req.body;
     const sql="INSERT INTO admin(name,password) values(?,?)";
     db.query(sql,[name,password],(err,result)=>{
          if(err) return res.status(404).json("Failed")
          return res.status(200).json(result)
     })
})
app.get("/report", (req, res) => {
    const sql = `
    SELECT 
        products.pid,
        products.pname,
        COALESCE(SUM(stockin.stockinquantity), 0) AS stockinquantity,
        COALESCE(SUM(stockout.stockoutquantity), 0) AS stockoutquantity,
        COALESCE(SUM(stockin.stockinquantity) - SUM(stockout.stockoutquantity), 0) AS available,
        COALESCE(SUM(stockin.stockinquantity * stockin.unitprice), 0) AS totalprice,
        CASE 
            WHEN COALESCE(SUM(stockin.stockinquantity) - SUM(stockout.stockoutquantity), 0) > 0 THEN 'In Stock'
            ELSE 'Out of Stock'
        END AS status
    FROM products  
    LEFT JOIN stockin ON stockin.pid = products.pid
    LEFT JOIN stockout ON stockout.pid = products.pid
    GROUP BY products.pid, products.pname;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Failed to fetch report data:", err);
            return res.status(500).json("Failed to fetch report data");
        }
        res.status(200).json(result);
    });
});


app.listen(3000,()=>{
     console.log("Running on http://localhost:3000")
})