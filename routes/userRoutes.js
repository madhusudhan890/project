const addressController = require("../controllers/addressControllers")

//here iam taking all the APIs in an object of array..where i call all apis at a time
const Routes = [
    {
        method:"POST",
        url:"/ping",
        handler:addressController.ping
    }, 
    {
        method:"POST",
        url:"/addContact",
        handler:addressController.addContact
    },
    {
        method:"GET",
        url:"/getContact",
        handler:addressController.getContact
    },
    {
        method:"GET",
        url:"/getAllContacts/:page/:limit",
        handler:addressController.getAllContacts
    },
    {
        method:"PUT",
        url:"/updateContact",
        handler:addressController.updateContact
    },
    {
        method:"DELETE",
        url:"/deleteContact",
        handler:addressController.deleteContact
    },
    {
        method:"GET",
        url:"/getToken",
        handler:addressController.getToken
    }
]

module.exports = Routes






