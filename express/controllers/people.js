/*
Controllers
Controllers are functions in Express.js that handle incoming requests and responses. They are responsible for processing the request, interacting with the database, and generating the response.
*/

let {people} = require('../data');

const getPeople = (req, res) => {
    res.status(200).json({success: true, data: people})
}

const postPeople = (req, res)=>{
    console.log(req.body)
    res.status(200).json({success:true, person:req.body.name});
}

const putPerson = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = people.find(p => p.id == parseInt(id));
    if(!user) res.status(200).json({success: false, msg: 'User not found'});
    else {
        user.name = name;
        res.status(200).json({success: true, data: people})
    }
}

const deletePerson = (req, res)=>{
    const {id} = req.params;
    const user = people.find(p => p.id == parseInt(id));
    if(!user) res.status(200).json({success: false, msg: 'User not found'});
    else {
        people.splice(people.findIndex(p => p.id == parseInt(id)), 1);
        res.status(200).json({success: true, data: people})
    }
}

module.exports = {getPeople, postPeople, putPerson, deletePerson}