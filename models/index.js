//import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category    //CATAGORY(products) belongsto
Product.belongsTo(Category,{
    foreignKey:'category_id'
})

// Categories have many Products   //CATAGORY(products)(products)(products) hasmany
Category.hasMany(Product,{
    foreignKey:'category_id'
})

// Products belongToMany Tags (through ProductTag)   //MANYTAGS(products) belongsto
Product.belongsToMany(Tag,{
    through:ProductTag,
    foreignKey:'product_id'
})

// Tags belongToMany Products (through ProductTag)   //PRODUCTS(manytags) belongsto
Tag.belongsToMany(Product,{
    through:ProductTag,
    foreignKey:'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
