const express = require('express')
const router = express.Router()

const {getContact, getContacts, createContact, updateContact, deleteContact} = require('../controllers/contactControllers')
const validateToken = require('../middleware/tokenValidateHandler')

router.use(validateToken)//making all contact routes as protected routes
router.get('/', getContacts)

router.get('/:id', getContact)

router.post('/', createContact)

router.patch('/:id', updateContact)

router.delete('/:id', deleteContact)

//router.route("/").get(getContacts).post(createContact)
//router.route("/:id").patch(updateContact).delete(deleteContact)







module.exports = router