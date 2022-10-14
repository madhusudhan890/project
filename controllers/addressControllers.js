const Address = require("../models/addressModel")
const addressServices = require("../services/addressServices")

exports.ping  = async (req) => {
    return {"status":"success"}
}


///everytime before saving the user details,we are creating JWT token and sending them to services to save 
exports.addContact = async (req) => {
   
    try {
        const phone = req.body.phone
        const data = req.body
        let res = await addressServices.createJwtToken(phone) //sending user data to creatToken function to generate jwt 
        if(res.status =="success"){
            let response = await addressServices.addContact(data,res.message) //send data to services along with JWT token 
            if(response.status == "success"){
                return {status:"success",message:response.message}
            }else {
                return {status:"failure",message:response.message}
            }
        }else{
            return {"status":"failure","message":"failure in contact services"}
        }
       
    } catch (error) {
        return {"status":"failure","message":"failure in contact services"}
    }
}
// exports.addBulkContacts = async (req) => {
   
//     try {
//         const phone = req.body.phone
//         const data = req.body
//         let res = await addressServices.createJwtToken(phone)
//         if(res.status =="success"){
//             let response = await addressServices.addContact(data,res.message)
//             if(response.status == "success"){
//                 return {status:"success",message:response.message}
//             }else {
//                 return {status:"failure",message:response.message}
//             }
//         }else{
//             return {"status":"failure","message":"failure in contact services"}
//         }
       
//     } catch (error) {
//         return {"status":"failure","message":"failure in contact services"}
//     }
// }

exports.getContact = async (req) => {
   
    try {
        const data = req.query
        let res = await addressServices.verifyJwtToken(data.accessToken,data.phone) //everytime i try to fetch any new thing iam cross checking the JWT token 
                                                                                   //to cross verify the user existance
        if(res.status == "success"){
            let response = await addressServices.getContact(data)  //after user is valid then sending the data to the user
            if(response.status == "success"){
                return {status:"success",message:response.message}
            }else {
                return {status:"failure",message:response.message}
        }
        }else{
            return {status:"failure",message:res.message}
        }
        
    } catch (error) {
        console.log(error,"error")
        return {"status":"failure","message":"failure in contact services"}
    }
}

exports.getAllContacts = async (req) => {
   
    try {
        const page = req.params.page
        const limit = req.params.limit
        const phone = req.query.phone
        const accessToken = req.query.accessToken
        let res = await addressServices.verifyJwtToken(accessToken,phone) //same verifying the user existance
         if(res.status == "success"){
            let response = await addressServices.getAllContacts(page,limit,phone)
            if(response.status == "success"){
                return {status:"success",message:response.message}
            }else {
                return {status:"failure",message:response.message}
            }
         }else{
            return {status:"failure",message:res.message} 
         }
        
    } catch (error) {
        return {"status":"failure","message":"failure in contact services"}
    }
}

exports.updateContact = async (req) => {
    try {
        // let data = req.body
        // console.log(data)
        const profileData = {}
        const phone = req.query.phone
        const accessToken = req.query.accessToken
        for (const [key, value] of Object.entries(req.body)) {
            if(value != "")
                profileData[key] = value
        }
        let res = await addressServices.verifyJwtToken(accessToken,phone)
        if(res.status == "success"){
            let response = await addressServices.updateContact(profileData,req.query.phone) ///updating the contact based on user verification
            if(response.status == "success"){
                return {status:"success",message:response.message}
            }else {
                return {status:"failure",message:response.message}
            }
        }else {
            return {status:"failure",message:res.message} 
        }
       
    } catch (error) {
        console.log(error,"ee")
        return {"status":"failure","message":"failure in contact services"} 
    }
}


exports.deleteContact = async (req) => {
    try {     
        const phone = req.query.phone
        const accessToken = req.query.accessToken
        let res = await addressServices.verifyJwtToken(accessToken,phone)
        if(res.message == "success"){
            let response = await addressServices.deleteContact(req.query.phone) //delating the contact 
            if(response.status == "success"){
                return {status:"success",message:response.message}
            }else {
                return {status:"failure",message:response.message}
            }
        }else {
            return {status:"failure",message:res.message} 
        }  
        
    } catch (error) {
        console.log(error,"ee")
        return {"status":"failure","message":"failure in contact services"} 
    }
}

exports.getToken = async(req)=> {
    try {
        const phone = req.query.phone
        const id = req.query.id
        let res = await addressServices.getToken(phone,id) ///here fetching the JWT token to the user 
        if(res.status == "success"){
            return {status:"success",message:res.message}
        }else {
            return {status:"failure",message:res.message}
        }
    } catch (error) {
        console.log(error,"ee")
        return {"status":"failure","message":"failure in contact services"} 
    }
   
};
 
