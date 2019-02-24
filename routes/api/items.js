const express = require('express');
const router = express.Router();

// Item Model 
const Item = require('../../models/item');

// @route       GET api/items
// desc         GET All Items
// @access      Public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

// @route       POST api/items
// desc post    Create an Item
// @access      Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
        .then(item => res.json(item));
});

// @route       DELETE api/items
// desc post    Delete an Item
// @access      Public
router.delete('/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, item) => {
        if (err) {
            res.status(404).json({success: false})
        } else {
            res.json({success: true})
        }
    })

});

module.exports = router; 