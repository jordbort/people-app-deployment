const express = require(`express`)
const router = express.Router()

// Models
const {People} = require(`../models`)
console.log(People)
// Routes

router.get(`/:id`, async (request, response) => {
    try {
        const foundPerson = await People.findById(request.params.id)
        console.log(`Showing person:`, foundPerson.name, request.params.id)
        response.status(200).json(foundPerson)
    }
    catch(err) {
        response.status(400).json({error: err.message})
    }
    // response.status(200).json({message: `people show route`, id: request.params.id})
})
router.get(`/`, async (request, response) => {
    try {
        const allPeople = await People.find({})
        console.log(`People in database:`, allPeople.length)
        response.status(200).json(allPeople)
    }
    catch(err) {
        response.status(400).json({error: err.message})
    }
})

router.post(`/`, async (request, response) => {
    try {
        const newPerson = await People.create(request.body)
        console.log(`Added:`, newPerson.name)
        response.status(201).json(newPerson)
    }
    catch(err) {
        response.status(400).json({error: err.message})
    }
})

router.put(`/:id`, async (request, response) => {
    try {
        const updatedPerson = await People.findByIdAndUpdate(request.params.id, request.body, {new: true})
        console.log(`Updated person:`, updatedPerson.name, request.params.id)
        response.status(200).json(updatedPerson)
    }
    catch(err) {
        response.status(400).json({error: err.message})
    }
    // response.status(201).json({message: `people update/put route`})
})

router.delete(`/:id`, async (request, response) => {
    try {
        const deletedPerson = await People.findByIdAndDelete(request.params.id)
        // console.log(deletedPerson.name)
        response.status(201).json(deletedPerson)
        // response.redirect(`/people`)
    }
    catch(err) {
        response.status(400).json({error: err.message})
    }
    // response.status(200).json({message: `people destroy/delete route`})
})

module.exports = router