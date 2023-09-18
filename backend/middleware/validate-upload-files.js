const { check } = require('express-validator');

exports.signUpValidation = [

     check('image').custom( (value, {req}) =>{
        if(req.files.image[0].mimetype === 'image/jpeg' 
        || req.files.image[0].mimetype === 'image/jpg'
        || req.files.image[0].mimetype === 'image/png'
        ){
            return true;
        }
        else{
            return false;
        }
     }).withMessage('Please upload an image Jpeg,jpg, PNG'),
    
     check('signature').custom( (value, {req}) =>{
        if(req.files.image[0].mimetype === 'image/jpeg'
        || req.files.image[0].mimetype === 'image/jpg' 
        || req.files.image[0].mimetype === 'image/png'
        ){
            return true;
        }
        else{
            return false;
        }
     }).withMessage('Please upload an image Jpeg,jpg PNG'),
   
     check('identity').custom( (value, {req}) =>{
        if(req.files.identity[0].mimetype === 'application/msword' || req.files.identity[0].mimetype === 'application/pdf'){
            return true;
        }
        else{
            return false;
        }
     }).withMessage('Please upload pdf or doc format'),
     check('address').custom( (value, {req}) =>{
        if(req.files.address[0].mimetype === 'application/msword' || req.files.address[0].mimetype === 'application/pdf'){
            return true;
        }
        else{
            return false;
        }
     }).withMessage('Please upload pdf or doc format'),
     check('income').custom( (value, {req}) =>{
        if(req.files.income[0].mimetype === 'application/msword' || req.files.income[0].mimetype === 'application/pdf'){
            return true;
        }
        else{
            return false;
        }
     }).withMessage('Please upload pdf or doc format'),
     check('caste').custom( (value, {req}) =>{
        if(req.files.caste[0].mimetype === 'application/msword' || req.files.caste[0].mimetype === 'application/pdf'){
            return true;
        }
        else{
            return false;
        }
     }).withMessage('Please upload pdf or doc format')

]