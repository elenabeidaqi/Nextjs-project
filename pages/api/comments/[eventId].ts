function handler(req: any, res: any) {

    const eventId = req.query.eventId

    if (req.method === "POST") {
        const { email, name, text } = req.body
        if (!email.includes('@') || !email || !name || name.trim() === "", !text || text.trim() === "") {
            res.status(422).json({message : "Invalid Data!"})
            return
        }

       
        const newData ={
            id : new Date().toISOString(),
            email, 
            name,
            text,
            eventId 

        }

        console.log(name , email , text , newData);
        res.status(201).json({message : "created comment!" , comment : newData})

    }

     if (req.method === "GET") {
        const dummyData =[
            {id : "c1" , name : "elena" , email : "elena@gmail.com" , text : "kjsdijhsada255485hasd"},
            {id : "c2" , name : "elensdsda" , email : "elensdsa@gmail.com" , text : "kjsdijhsdasdadadhasd"},
            {id : "c3" , name : "eleasna" , email : "elsdsena@gmail.com" , text : "kjsdijhsadszxzhasd"}
        ]
        res.status(200).json({commentList : dummyData })
    }
}

export default handler