const { error } = require("console")
const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModels')

//@description Get all Contacts
//@route GET /api/contacts
//@access private

//const  errorHandler = require('../middleware/errorHandler')


const getContacts = asyncHandler(async(req, res) => {
   
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})

//@description Get single Contact
//@route GET /api/contacts/:id
//@access private

const getContact  = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){

        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

//@description Create single Contact
//@route POST /api/contacts/
//@access private

const createContact = asyncHandler(async(req, res) => {
    const {name, email, phone}= req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    
    
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    

    res.status(201).json({message: contact})
})

//@description update single Contact
//@route PATCH /api/contacts/:id
//@access private

const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
   
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("You don't have permission to access other user contacts")
    }
    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updateContact)
})

//@description delete single Contact
//@route  DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("You don't have permission to access other user contacts")
    }
    await Contact.deleteOne({_id: req.params.id})
    res.status(200).json(contact)
})


module.exports = {getContact, getContacts, createContact, updateContact, deleteContact}