const express= require("express");


const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', async (req,res, next)=>{
   try{
      const account = await db.select('*').from("accounts")
      res.json(account)
   }
   catch(err){
      next(err)
   }
})

router.get('/:id', async(req,res, next)=>{
   try{
      const account = await db.first("*").from('accounts').where('id', req.params.id)
      res.json(account)

}
catch(err){
   next(err)
}
})

router.post('/', async (req, res, next)=>{
   const account ={
      name: req.body.name,
      budget: req.body.budget,
   }
   console.log(account)
   
   try{
      const [id] = await db("accounts").insert(account);
      const newAccount = await db('accounts').where("id", id).first();
      res.json(newAccount)
   }
   catch(err){
      next(err)
   }
})
router.put('/:id', async(req, res, next)=>{
   const account={
      name: req.body.name,
         budget: req.body.budget
   }
   try{
      await db('accounts').where("id", req.params.id).update(account);
      const oldAccount = await db("accounts").where('id',req.params.id).first()
      res.json(oldAccount)
   }
   catch(error){
      next(error)
   }
})

router.delete('/:id', async(req,res,next)=>{
   try{
      await db("accounts").where("id", req.params.id).del()
      res.status(204).end()


   }
   catch(error){
      next(error)
   }
})


module.exports = router;
