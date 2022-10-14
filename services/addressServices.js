const Address = require("../models/addressModel") 
const jwt = require("jsonwebtoken")


//adding contact in mongodb based on Schema
exports.addContact = async (data,accessToken) => {  //addContact api
    try {
        let contact = new Address({
            accessToken:accessToken,
            firstName:data.firstname,
            secondName:data.secondName,
            phone:data.phone,
            address:[{
                houseNo:data.address[0].houseNo,
                street:data.address[0].street,
                district:data.address[0].district,
                state:data.address[0].state
            }]
        })
        contact.save()
        return {status:"success",message:"added contact successfully"}
    } catch (error) {
        console.log(error,"erroe")
      return{status:"failure","message":"failed to add contact"}  
    }
}

//getContact api tp get single contact based on phone number 
exports.getContact = async(data) => {
    try {
        let contact = await Address.findOne({phone:data.phone}) //here for sameple purpose i put phone number as unique for users
        return {status:"success",message:contact}
    } catch (error) {
        return{status:"failure","message":"failed to get contact"}  
    }
}

//getAll Contacts api is used to fetch the all contacts based on phone number

exports.getAllContacts = async (page,limit,phone) => {
    try {
        //here i added pagination to all contacts ..so we can decide how many we want to send at one time
        let contacts = await Address.find({}).limit(limit * 1).skip((page -1 )*limit).lean().sort({"_id":-1})  //and i am taking in descending order of saved contatcs
        return {status:"success",message:contacts}
    } catch (error) {
        return{status:"failure","message":"failed to get contacts"}  
    }
}
///here, based on phone number we updating the details of user
exports.updateContact = async (profileData,phone) => {
    try {
        let contact = await Address.updateOne({phone:phone},profileData)
        return {status:"success",message:contact}
    } catch (error) {
        return{status:"failure","message":"failed to update contact"}  
    }
}

//based on phone number,deleating the contact from database
exports.deleteContact = async (phone) => {
    try {
        let contact = await Address.deleteOne({phone:phone})
        return {status:"success",message:contact}
    } catch (error) {
        return{status:"failure","message":"failed to update contact"}  
    }
}

//here is the main thing creating JWT token when we are creating a new token
exports.createJwtToken = async(phone) => {
    try {
        let sub = phone
        let timeNow = Math.floor(new Date().getTime()/1000) + 60000000
        //here sub is user data ...secret is the private key ..and expires is the time iam to the life expectancy of accessToken
        let jwtToken = jwt.sign({sub},"secret",{
            expiresIn:timeNow
        });
        return {status:"success",message:jwtToken}
    } catch (error) {
        console.log(error,"erorr")
        return{status:"failure","message":"failed to update contact"}  
    }
}


//here i am doing authentication every time user try to fwtch some details...
exports.verifyJwtToken = async(accessToken,phone) => {
    try {
        let sub = accessToken
        let decode = jwt.verify(accessToken,"secret"); //taking phone number and decoding accesstoken and crosschecking the phone numbers are matched /not
        if(parseInt(phone) === decode.sub){
            return{"status":"success",message:"accesstoken valid"}
        }else{
            return{"status":"failure",message:"accesstoken invalid"}
        }
    } catch (error) {
        console.log(error,"erorr")
        return{status:"failure","message":"failed to update contact"}  
    }
}

////here based on phone and id i am sending the JWT token to the certified user
exports.getToken = async(phone,id)=> {
    try {
        let filter = {accessToken:1,_id:0}
        let contact = await Address.findOne({phone:phone,_id:id},filter)
        return{"status":"success",message:contact}
    } catch (error) {
        console.log(error,"erorr")
        return{status:"failure","message":"failed to update contact"} 
    }
}
