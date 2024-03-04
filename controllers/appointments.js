const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Massage = require('../models/Massageshop');

//@desc     Get all appointments
//@route    GET /api/v1/appointments
//@access   Public
exports.getAppointments = async(req,res,next)=>{
    let query;
    //General users cam see only their appointment!
    if(req.user.role !== 'admin'){
        query=Appointment.find({user:req.user.id}).populate({
            path:'user , massageshop',
            select:'name email tel'
        });
        //console.log(query);
        
    }
    else{//If you are an admin,you can see all!
        if(req.params.id){
            console.log(req.params.id);
            query = Appointment.find({ user:req.params.id}).populate({
                path:'Massageshop',
                select:'name province tel'
            });
        }
        else{
            query=Appointment.find().populate({
                path:'Massageshop',
                select:'name province tel'
            });
        }

    }
    try{
        const appointments = await query;
        res.status(200).json({
            success:true,
            count:appointments.length,
            data: appointments
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot find Appointment"
        });
    }
};

//@desc     Get single appointment
//@route    GET /api/v1/appointment/:id
//@access   Public
exports.getAppointment=async(req,res,next)=>{
    try{
        const appointment=await Appointment.findById(req.params.id).populate({
            path: 'Massageshop',
            select: 'name description tel'
        });
        if(!appointment){
            return res.status(404).json({success:false,message:`No appointment with the id of ${req.params.id}`})
        }
        res.status(200).json({
            success:true,
            data: appointment
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot find Appointment"
        });
    }
};

//@desc     Add appointment
//@route    POST /api/v1/hospitals/:hospitalId/appointment
//@access   Private
exports.addAppointment=async(req,res,next)=>{
    try{
        req.body.Massageshop=req.params.hospitalId;
        const hospital=await Hospital.findById(req.params.hospitalId);
        if(!hospital){
            return res.status(404).json({
                success:false,
                message:`No Massageshop with the id of ${req.params.hospitalId}`
            });
        }
        //add user Id to req.body
        req.body.user = req.user.id;
        //Check for existed appointment
        const existedAppointments = await Appointment.find({user:req.user.id});

        //If the user is not an admin, they can only create 3 appointment.
        if(existedAppointments.length >=3 && req.user.role !== 'admin'){
            return res.status(400).json({
                success:false,
                message:`The user with ID ${req.user.id} has already made 3 appointments`
            });
        }
        
        const appointment = await Appointment.create(req.body);
        res.status(200).json({
            success:true,
            data: appointment
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot create Appointment"
        });
    }
};

//@desc     Update appointment
//@route    PUT /api/v1/appointments/:id
//@access   Private
exports.updateAppointment=async(req,res,next)=>{
    try{
        localhost:appointmentID
        let appointment = await Appointment.findById(req.params.id);
        if(!appointment){
            return res.status(404).json({
                success:false,
                message:`No appointment with the id of ${req.params.id}`
            });
        }
        //Make sure user is the appointment owner
        if(appointment.user.toString()!==req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({
                success:false,
                message:`User ${req.user.id} is not authorized to update this appointment`
            });
        }

        appointment = await Appointment.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({
            success:true,
            data:appointment
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot update Appointment"
        });
    }
};

//@desc     Delete appointment
//@route    DELETE /api/v1/appointments/:id
//@access   Private
exports.deleteAppointment=async(req,res,next)=>{
    try{
        const appointment=await Appointment.findById(req.params.id);
        if(!appointment){
            return res.status(404).json({
                success:false,
                message:`No appointment with the id of ${req.params.id}`
            });
        }
        //Make sure user is the appointment owner
        if(appointment.user.toString()!==req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({
                success:false,
                message:`User ${req.user.id} is not authorized to delete this bootcamp`
            });
        }
        await appointment.deleteOne();
        res.status(200).json({
            success:true,
            data: {}
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot delete Appointment"
        });
    }
};