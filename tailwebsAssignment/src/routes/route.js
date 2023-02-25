const express =require('express')
const router=express.Router()
const studentModel= require('../models/studentModel')
const jwt =require('jsonwebtoken')





router.get('/',function(req,res){
    res.send({data:"hello world"})
})

router.post('/addStudent',async function(req,res){
    try{
        const name= req.body.name
        const subject=req.body.subject
        const mark=req.body.mark
        console.log(subject,name,mark)
        if(!['Math','Physics','Chemistry','English'].includes(subject)) return res.status(400).send({status:false,message:"you can not create with this sub"})
    
        const student= await studentModel.findOne({name:name})
        if(student){
            let subj=student.subject
            if(subj[subject]==0){
    
                subj[subject]=mark
            }
            else{
                subj[subject]=Number(subj[subject])+Number(mark)
            }
            await studentModel.findOneAndUpdate({name:name},{subject:subj})
            return res.status(200).send({status:true,message:"student added successfully"})
        }
        else{
            let data={
                name:name,
                subject:{}
            }
            data.subject[subject]=mark
            await studentModel.create(data)
            return res.status(201).send({status:true,message:"student created successfully"})
        }
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }

})

router.post('/login',async function(req,res){
    try{
        const name=req.body.name
        const password=req.body.password
    
        if(name=="tarun21" && password=="123456789"){
            const token= jwt.sign({name:name},"tailwebs")
            return res.status(200).send({status:true,message:"success",token:token})
    
        }
        else{
            return res.status(400).send({status:false,message:"invaild name or password"})
        }
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
})


// authentication
const authentication =function(req,res,next){
    const token=req.headers['x-api-key']
    if(!token) return res.status(401).send({status:false,message:"token is missing"})
    jwt.verify(token,"tailwebs",function(err,decoded){
        if(decoded) next()
        else return res.status(401).send({status:false,message:err})
    })
}

router.get('/getStudents',authentication,async function(req,res){
    const data=await studentModel.find({isDeleted:false}).sort({name:1})

    return res.status(200).send({status:true,data:data})
})


router.put('/edit',async function(req,res){
    try{
        const data=req.body
        console.log(data)
    
        const student = await studentModel.findOne({name:data.name})
        if(!student) return res.status(400).send({status:false,message:"give only authorised name"})
        let updateData=student.subject
        updateData[data.subject]=data.mark
        console.log(updateData)
        await studentModel.findOneAndUpdate({name:data.name},{$set:{subject:updateData}})
        res.status(200).send({status:true,message:"updated successfully"})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }

})

router.delete('/delete',async function(req,res){
    const name=req.body.name
    await studentModel.findOneAndUpdate({name:name},{isDeleted:true})
    res.status(200).send({status:true,message:"deleted successfully"})
})





module.exports=router