const InscriptionQuote = require('./../models/inscriptionQuoteModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.getAllInscriptionQuote = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
  if(decoded.role == 'admin'){
      const inscriptionQuote = await InscriptionQuote.find()
      .select('-inscription -discount')
      .populate('staff');
      
      // SEND RESPONSE
    
     res.status(200).json({
        status: 'success',
        results: inscriptionQuote.length,
        data: {
            inscriptionQuote
        }
    });
  }
  else{
    const inscriptionQuote = await InscriptionQuote.find({staff:decoded.id})
        .select('-inscription -discount')
        .populate('staff');
      // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: inscriptionQuote.length,
        data: {
            inscriptionQuote
        }
      });
  }
    
    // const features = new APIFeatures(Quote.find().populate('monument')
    //                                              .populate('installation')
    //                                              .populate('additionalInstallation')
    //                                              .populate('inscription')
    //                                              .populate('foundation')
    //                                              .populate('additionalFoundation')
    //                                              .populate('accessories'), req.query)
    //   .filter()
    //   .sort()
    //   .limitFields()
    //   .paginate();
   // const quote = await features.query;
    
    
});

exports.createInscriptionQuote = catchAsync(async (req, res, next) => {
  const newQuote = await InscriptionQuote.create(req.body);
  let totalPrice =  0;
  
  const result = await InscriptionQuote.findById(newQuote._id)
    .populate('inscription.inscriptionId')
    .populate('staff');
  if (result.inscription) {
    result.inscription.forEach(inscrp => {
      if(inscrp.inscriptionId._id == "5ff507ef56ba30a52bd76c8b"){
        if(inscrp.inscriptionNumber > 300){
          totalPrice = totalPrice + 495 + inscrp.inscriptionId.price * (inscrp.inscriptionNumber - 300)
        }
        else
          totalPrice = totalPrice + 495
      }else{
      totalPrice = totalPrice + inscrp.inscriptionId.price * inscrp.inscriptionNumber;}
      console.log(totalPrice)
    })
  }
  if (result.extraFee) {
    totalPrice = totalPrice + result.extraFee;
    console.log(totalPrice)
  }
  if (result.permitFee) {
    totalPrice = totalPrice + result.permitFee;
    console.log('lkalala',totalPrice)
  }
    
  console.log("beforeUpdate", totalPrice);

  await InscriptionQuote.findByIdAndUpdate(newQuote._id, {
    'totalPrice': totalPrice
  });
  
  res.status(201).json({
    status: 'success',
    data: {
      quoteId: newQuote._id
    }
  })
  
  
});


exports.getInscriptionQuote = catchAsync(async (req, res, next) => {
  const result = await InscriptionQuote.findById(req.params.id)
  .populate('inscription.inscriptionId')
  .populate('staff');

res.status(200).json({
  status: 'success',
  data: {
    totalPrice: result.totalPrice.toFixed(2),
    quote: result
  }
});
});

exports.updateInscriptionQuote = catchAsync(async (req, res, next) => {
    const inscriptionQuote = await InscriptionQuote.findByIdAndUpdate(req.params.id, req.body);
  
    if (!inscriptionQuote) {
      return next(new AppError('No monument found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        inscriptionQuote
      }
    });
  });

exports.checkPhone = catchAsync(async (req, res, next) => {
  const inscriptionQuote =await InscriptionQuote.findOne({phone:req.params.id}).populate('staff');

  if(!inscriptionQuote){
    res.status(200).json({
      status:"new"
    })
  }
  else{
    res.status(200).json({
      status:"old",
      data:inscriptionQuote.staff
  })
  }
});
