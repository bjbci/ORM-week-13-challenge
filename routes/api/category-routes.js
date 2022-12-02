const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  
  Category.findAll({
    include:{
    model:Product,
  attributes:["id","product_name","price","stock","category_id"],
}
  })
  .then(dbCategoryData=>res.json(dbCategoryData))
  .catch(err=>{
   
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    include:{
        id:req.params.id
    },
    include:{
      model:Product,
      attributes:["id","product_name","price","stock","category_id"],
  },
})
  .then(dbCategoryData=>res.json(dbCategoryData))
  .catch(err=>{
    console.log(err)
    res.status(500).json(err)
  })
});


router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name:req.body.category_name
  })
  .then(dbCategoryData=>{
    res.join({message: `${dbCategoryData.category_name} created in db`})
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name:req.body.category_name
  },
  {
    where:{
        id:req.params.id
    }
  })
  .then(dbCategoryData=>{
    res.json({message:`${dbCategoryData} category updated`})
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json(err)
  })
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
    Category.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(dbCategoryData=>{
res.json({ message: `${dbCategoryData} category deleted`})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports = router;
