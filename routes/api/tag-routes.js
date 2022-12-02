const router = require('express').Router();
const { restart } = require('nodemon');
const { Tag, Product,ProductTag} = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data  //[Product]
  Tag.findAll({attributes:[Product]})
  .then(dbTagData=>res.json(dbTagData))
  .catch(err=>{
    console.log(err)
    res.status(500).json(err)
  })
});




router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data  //[Product]
  Tag.findOne({
    where:{
        id:req.params.id
    },
include:[Product]
  })
  .then(dbTagData=>res.json(dbTagData))
  .catch(err=>{
    console.log(err)
    res.status(400).json(err)
  })
});




router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name:req.body.tag_name
  })
  .then(dbTagData=>{
    res.json({message:`${dbTagData.tag_name} added to db`})
  })
  .catch(err=>{
    res.status(400).json(err)
  })
});



router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    {where:req.params.id}
  })
  .then((dbTagData=>{
    res.json({message:`${dbTagData} updated`})
  })
  .catch(err=>{
    console.log(err)
    res.status(400).json(err)
  })
});



router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{id:req.params.id },
  })
  .then(dbTagData=>{
   if(!dbTagData){
    res.status(500).json({message:"deleted"})
    return
   }
   res.json(dbTagData)
  })
  .catch((err=>{
    console.log(err)
  res.status(500).json(err)
})
})
module.exports = router;
