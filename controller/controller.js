contact = require("../model/model.js");

exports.index = function(req,res){
    contact.get(function(err,contacts){
        if (err){   
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status:"success",
            message:"contacts retrieve succesfully",
            data: contacts
        });
    });
};

exports.update = function(req,res){
    contact.findById(req.params.contact_id,function(err,req){
        if(err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;

        contact.save(function(err){
            if(err)
                res.json(err);
            res.json({
                message: "Contact info updated",
                data: contact
            });
        });
    });
};

exports.delete = function(req,res){
    contact.remove({
        _id: req.params.contact_id
    }, function(err,contact){
        if(err)
            res.send(err);
    res.json({
        status: "success",
        message: "contact deleted"
       
        });;
    });
};

exports.new = function(req,res){
    var Contact = new contact();
    Contact.name = req.body.name ? req.body.name : contact.name;
    Contact.surname = req.body.surname;
    Contact.email = req.body.email;
    Contact.phone = req.body.phone;
    Contact.password = req.body.password;

    Contact.save(function(err){
        if(err)
            res.json(err);
        res.json({
            message: "New contact created",
            data: contact
        });
    });
};

exports.view = function(req,res){
    contact.findById(req.params.contact_id, function(err,contact){
        if(err)
            res.json(err);
        res.json({
            message: "Contact details loading",
            data: message
        });
    });
};
