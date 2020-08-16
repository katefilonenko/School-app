const express = require('express');
const router = express.Router();

const Class = require('../models/index');

router.get('/', async (req, res) => {
    try{
        const classes = await Class.find();
        res.json(classes);
    }catch{
        res.json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const sclass = await Class.findById(req.params.id);
        res.send(sclass);
    }catch{
        res.json({ message: err });
    }
    
});

router.post('/', (req, res) => {
    const sclass = new Class({
        id: req.body.id,
        letter: req.body.letter,
        num: req.body.num
    });

    sclass.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message : err });
    });
});

router.put('/:id', async (req,res) => {
    try{
        const updatedClass = await Class.updateOne(
            {_id: req.params.id}, 
            {$set:{letter: req.body.letter, num: req.body.num}}
        );
        res.send(updatedClass);
    }catch{
        res.json({ message: err });
    }

});

router.delete('/:id', async (req,res) =>{
    try{
        const removedClass = await Class.remove({_id: req.params.id});
        res.send(removedClass);
    }catch{
        res.json({ message: err });
    }
});

module.exports = router;