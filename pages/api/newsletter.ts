import { MongoClient } from "mongodb";

export default async function handler(req: any, res: any) {
    if (req.method === "POST") {
        const userEmail = req.body.email
        if (!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "invalid email" })
            return
        }
        const url = 'mongodb://localhost:27017';
        let db;
        console.log("before connection..");
        
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, 
            //@ts-ignore
            (err, client) => {
              if (err) {                
                return console.log("err" , err)
              }
            }
        )
        db = client.db('Elena-test');
        const result = await db.collection('email').insertOne({email : userEmail})
        console.log("after connection..");
        
        res.status(201).json({ message: "Signed Up!!" })
    }

}