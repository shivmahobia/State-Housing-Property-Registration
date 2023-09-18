const { validationResult } = require('express-validator');

const response = async(req,res) => {
     console.log(req.body);
    // return;
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
         return res.status(400).json({ errors:errors.array() });
        }

        res.status(200).send({ success:true, data: req.body,
            image: `http://localhost:5000/${req.files.image[0].filename}`,
            signature: `http://localhost:5000/${req.files.signature[0].filename}`,
            identity: `http://localhost:5000/${req.files.identity[0].filename}`, 
            address: `http://localhost:5000/${req.files.address[0].filename}`, 
            income: `http://localhost:5000/${req.files.income[0].filename}`, 
            caste: `http://localhost:5000/${req.files.caste[0].filename}`, 
        });

    } catch (error) {
        res.status(400).send({ success:false, msg:error.message });
    }

}


module.exports = {
    response
}

