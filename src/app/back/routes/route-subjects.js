const express = require('express');
const router = express.Router();

const Subject = require('../models/subject.model');


router.get('/', async (req, res) => {
    try{
        const subjects = await Subject.find();
        res.json(subjects);
    }catch{
        res.json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const subject = await Subject.findById(req.params.id);
        res.send(subject);
    }catch{
        res.json({ message: err });
    }
    
});

router.post('/', (req, res) => {
    const subject = new Subject({
        id: req.body.id,
        name: req.body.name
    });

    subject.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message : err });
    });
});

router.put('/:id', async (req,res) => {
    try{
        const updatedSubject = await Subject.updateOne(
            {_id: req.params.id}, 
            {$set:{name: req.body.name}}
        );
        res.send(updatedSubject);
    }catch{
        res.json({ message: err });
    }

});

router.delete('/:id', async (req,res) =>{
    try{
        const removedSubject = await Subject.remove({_id: req.params.id});
        res.send(removedSubject);
    }catch{
        res.json({ message: err });
    }
});


module.exports = router;