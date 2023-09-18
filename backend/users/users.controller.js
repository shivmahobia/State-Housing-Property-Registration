const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize')
const userService = require('./user.service');


//user Documents
const user = express();
const bodyParser = require('body-parser');

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended:true }));

const multer = require('multer');
const path = require('path');

user.use(express.static('public'));


// routes
router.post('/login',authenticateSchema, authenticate);
router.post('/register', registerSchema, register);

router.post('/payment', PaymentSchema, payment);



router.post('/application-form', applicationformSchema, applicationForm);
router.post('/payments', paymentsSchema, paymentFunction);



router.put('/application-form/:id', applicationformUpdateSchema, applicationFormUpdate);

router.get('/project', getProject);
router.get('/project/:id',projectId)

router.get('/BookingDetails/:id',getBookingData)

router.get('/property', getProperty);
router.get('/property/:id',propertyId)
router.get('/propertyP_id/:id',propertyP_id)//P_id

router.get('/quarter', getQuarter);
router.get('/quarter/:id',quarterId) //p_ID
router.get('/quarter_Qid/:id',quarter_Qid) //Q_ID

router.post('/forgotPassword',forgotPasswordSchema,forgotPasswordAuthenticate);

router.get('/', getAll);
router.get('/:id', getById);

router.get('/upload',Upload);
router.get('/current', authorize(), getCurrent);


router.put('/:id', updateSchema, update);


router.put('/changePass/:id', updatePasswordSchema, Passupdate); //using


router.put('/Updatequarter/:id', BookingUpdateSchema, BookingUpdate);

router.put('/UpdateProperty/:id', PropertyUpdateSchema, BookedProperyUpdate);

router.put('/UpdateProject/:id', ProjectUpdateSchema, BookedProjectUpdate);

router.put('/UpdateAvaiblePropertyNo/:id', PropertyAvaibleUpdateSchema, UpdatePropertyNumber);




// router.put('/UpdatePassword/:email_id', UpdatePasswordSchema, UpdatePassword);
// router.put('/quarter/:id', BookingUpdateSchema, quarter_id);

router.delete('/:id', authorize(), _delete);

module.exports = router;




function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email_id: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}



function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}


function forgotPasswordSchema(req, res, next) {
    const schema = Joi.object({
        email_id: Joi.string().required()
    });
    validateRequest(req, next, schema);
}


function forgotPasswordAuthenticate(req, res, next) {
    userService.forgotPasswordAuthenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    
    const schema = Joi.object({
        username: Joi.string().required(),
        mobile_number: Joi.string().min(10).max(10).required(),
        email_id: Joi.string().required(),
        password: Joi.string().min(6).required(),
        // c_password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}


function PaymentSchema(req, res, next) {
    
    const schema = Joi.object({
        Application_id: Joi.number().required(),
        ApplicantName: Joi.string().required(),
        ApplicantPhone_number: Joi.string().min(10).max(10).required(),
        email: Joi.string().required(),
        project: Joi.string().required(),
        property: Joi.string().required(),
        Quarter: Joi.string().required(),
        Quarter_Price: Joi.number().required(),
        payment_id: Joi.string().required(),

    });
    validateRequest(req, next, schema);
}

function applicationformSchema(req, res, next) {
    const schema = Joi.object({
        ApplicantId: Joi.number().required(),
        Applicant_name: Joi.string().required(),
        FatherHusband_name: Joi.string().required(),
        DateOfBirth: Joi.string().required(),
        Applicant_age: Joi.string().required(),
        Mobile_number: Joi.string().min(10).max(10).required(),
        Email_id: Joi.string().required(),
        ContactHome_number:Joi.string().min(0).allow('').allow(null),
        ContactOffice_number:Joi.string().min(0).allow('').allow(null),
        Correspondence_address: Joi.string().required(),
        Permanent_address: Joi.string().required(),
        Profession: Joi.string().required(),
        AnnualIncomeSelf: Joi.string().required(),
        AnnualIncomeFamily: Joi.string().required(),
        BankName: Joi.string().required(),
        AccountNumber: Joi.string().required(),
        BranchName: Joi.string().required(),
        IfscCode: Joi.string().min(0).allow('').allow(null),
        GST_number: Joi.string().min(0).allow('').allow(null),
        Category: Joi.string().required(),
        Nominee_name: Joi.string().required(),
        Nominee_age: Joi.string().required(),
        Nominee_number: Joi.string().min(10).max(10).required(),
        Nominee_relation: Joi.string().required(),
        Nominee_address: Joi.string().required(),
        
    });
    validateRequest(req, next, schema);
}

function paymentsSchema(req, res, next) {
    const schema = Joi.object({

        Application_id: Joi.number().required(),
        ApplicantName: Joi.string().required(),
        ApplicantPhone_number: Joi.string().min(10).max(10).required(),
        email: Joi.string().required(),
        project: Joi.string().required(),
        property: Joi.string().required(),
        Quarter: Joi.string().required(),
        Quarter_Price: Joi.number().required(), 
        payment_id: Joi.string().required(),
        
    });
    validateRequest(req, next, schema);
}



function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function payment(req, res, next) {
    userService.paymentSchema(req.body)
        .then(() => res.json({ message: 'Payment successful' }))
        .catch(next);
}

function applicationForm(req, res, next) {
    userService.applicationFormcreate(req.body)
        .then(() => res.json({ message: 'Data Submitted successful' }))
        .catch(next);
}

function paymentFunction(req, res, next) {
    userService.paymentsService(req.body)
        .then(() => res.json({ message: 'Payment successful' }))
        .catch(next);
}



function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getProperty(req, res, next) {
    userService.getAllProperty()
        .then(users => res.json(users))
        .catch(next);
}
function getQuarter(req, res, next) {
    userService.getAllQuarter()
        .then(users => res.json(users))
        .catch(next);
}

function getProject(req, res, next) {
    userService.getProject()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function propertyId(req, res, next) {
    userService.propertyId(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function quarterId(req, res, next) {
    userService.quarterId(req.params.id) //p_id
        .then(user => res.json(user))
        .catch(next);
}

function propertyP_id(req, res, next) {
    userService.propertyP_id(req.params.id) //p_id
        .then(user => res.json(user))
        .catch(next);
}
function quarter_Qid(req, res, next) {
    userService.quarter_Qid(req.params.id) //p_id
        .then(user => res.json(user))
        .catch(next);
}


function projectId(req, res, next) {
    userService.projectId(req.params.id) 
        .then(user => res.json(user))
        .catch(next);
}

function getBookingData(req, res, next) {
    userService.BookingId(req.params.id) 
        .then(user => res.json(user))
        .catch(next);
}

function forgotPassword(req, res, next) {
    userService.forgotPassword(req.params.id) //p_id
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
       
        username: Joi.string().empty(''),
        email_id: Joi.string().empty(''),
        mobile_number: Joi.string().min(10).max(10).empty(''),
        password: Joi.string().min(6).empty(''),
        img_url: Joi.string().empty(''),
        ApplicantId: Joi.number().empty(''),
        
    });
    validateRequest(req, next, schema);
}


function updatePasswordSchema(req, res, next) {
    const schema = Joi.object({
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}




function BookingUpdateSchema(req, res, next) {
    const schema = Joi.object({
        Booking_flag: Joi.boolean().empty(''),
        
    });
    validateRequest(req, next, schema);
}

function PropertyUpdateSchema(req, res, next) {
    const schema = Joi.object({
        Property_flag: Joi.boolean().empty(''),
        
    });
    validateRequest(req, next, schema);
}

function ProjectUpdateSchema(req, res, next) {
    const schema = Joi.object({
        Project_flag: Joi.boolean().empty(''),
        
    });
    validateRequest(req, next, schema);
}

function PropertyAvaibleUpdateSchema(req, res, next) {
    const schema = Joi.object({
        Property_available: Joi.number().empty(''),
        
    });
    validateRequest(req, next, schema);
}

function UpdatePasswordSchema(req, res, next) {
    const schema = Joi.object({
        password: Joi.boolean().empty(''),
        
    });
    validateRequest(req, next, schema);
}

function applicationformUpdateSchema(req, res, next) {
    const schema = Joi.object({
        PhotoUrl: Joi.string().empty(''),
        SignatureUrl: Joi.string().empty(''),
        IdentityDocument: Joi.string().empty(''),
        IdentityDocumentNumber: Joi.string().empty(''),
        IdentityUrl: Joi.string().empty(''),
        AddressDocumentNumber: Joi.string().empty(''),
        AddressDocument: Joi.string().empty(''),
        AddressUrl: Joi.string().empty(''),
        IncomeUrl: Joi.string().empty(''),
        CasteUrl: Joi.string().empty(''),
        
        Project_Data: Joi.string().empty(''),
        Property_Data: Joi.string().empty(''),
        Quarter_Data: Joi.string().empty(''),
        Quarter_Price: Joi.string().empty(''),
        
    });
    validateRequest(req, next, schema);
}


function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}


function Passupdate(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}




function BookingUpdate(req, res, next) {
    userService.BookingUpdate(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function BookedProperyUpdate(req, res, next) {
    userService.BookedProperyFlag(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function BookedProjectUpdate(req, res, next) {
    userService.BookedProjectFlag(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function UpdatePropertyNumber(req, res, next) {
    userService.UpdatePropertynum(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function UpdatePassword(req, res, next) {
    userService.update_password(req.params.email_id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function applicationFormUpdate(req, res, next) {
    userService.applicationFormUpdate(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}


function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}


function Upload(req, res, next) {
    res.json({ message: 'This route is Upload route' });

}









const storage = multer.diskStorage(

{
    destination:function(req, file, cb){
        if(file.mimetype === 'image/jpeg' 
        || file.mimetype === 'image/png'){
            cb(null,path.join(__dirname,'../public/image'));
        }
        else{
            cb(null,path.join(__dirname,'../public/document'));
        }
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});

const upload = multer({storage: storage})

router.post('/upload',upload.single("image"),UploadImg);

function UploadImg(req, res) {
    res.json({ message: 'This route is Upload iiIMG route' });
    res.send("Image uploaded")

}





const fileFilter = (req,file,cb) => {
    if (file.fieldname === "image") {
        (file.mimetype === 'image/jpeg' 
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/png')
        ? cb(null,true)
        : cb(null,false);
    }
    
    else if (file.fieldname === "signature") {
        (file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/png')
        ? cb(null,true)
        : cb(null,false);
    }
   
    else if(file.fieldname === "identity"){
        (file.mimetype === 'application/msword' 
        || file.mimetype === 'application/pdf')
        ? cb(null,true)
        : cb(null,false);
    }
    else if(file.fieldname === "address"){
        (file.mimetype === 'application/msword' 
        || file.mimetype === 'application/pdf')
        ? cb(null,true)
        : cb(null,false);
    }
    else if(file.fieldname === "income"){
        (file.mimetype === 'application/msword' 
        || file.mimetype === 'application/pdf')
        ? cb(null,true)
        : cb(null,false);
    }
    else if(file.fieldname === "caste"){
        (file.mimetype === 'application/msword' 
        || file.mimetype === 'application/pdf')
        ? cb(null,true)
        : cb(null,false);
    }
}



const uploadd = multer({
    storage:storage,
    fileFilter:fileFilter
}).fields([{ name: 'identity', maxCount: 1 },{ name: 'address', maxCount: 1 },{ name: 'income', maxCount: 1 },{ name: 'caste', maxCount: 1 }, { name: 'image', maxCount: 1 },{ name: 'signature', maxCount: 1 }]);

const userController = require('../controllers/userController');

const { signUpValidation } = require('../middleware/validate-upload-files');

// router.post('/userDocuments',userController.register,uploadd , signUpValidation);
router.post('/userDocuments',uploadd , signUpValidation, userController.response);


