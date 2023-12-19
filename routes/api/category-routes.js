const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // DONE find all categories
  // DONE be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({ include: Product});
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // DONE find one category by its `id` value
  // DONE be sure to include its associated Products
  try {
    const categoryByID = await Category.findByPk(req.params.id, { include: Product});
    res.status(200).json(categoryByID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // DONE create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // DONE update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(req.body, {where: {id: req.params.id}});
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // Done delete a category by its `id` value
  try {
    const targetCategory = await Category.destroy({where: { id: req.params.id }});
    if (!targetCategory) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(targetCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
