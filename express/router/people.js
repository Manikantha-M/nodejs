const express = require('express');
const router = express.Router();
let { people } = require('../data');


router.get('/', (req, res) => {
    res.status(200).json({success: true, data: people})
});

router.post('/', (req, res)=>{
    console.log(req.body)
    res.status(200).json({success:true, person:req.body.name});
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = people.find(p => p.id == parseInt(id));
    if(!user) res.status(200).json({success: false, msg: 'User not found'});
    else {
        user.name = name;
        res.status(200).json({success: true, data: people})
    }
})

router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    const user = people.find(p => p.id == parseInt(id));
    if(!user) res.status(200).json({success: false, msg: 'User not found'});
    else {
        people.splice(people.findIndex(p => p.id == parseInt(id)), 1);
        res.status(200).json({success: true, data: people})
    }
})

module.exports = router;