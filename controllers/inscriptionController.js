const Inscription = require('./../models/inscriptionModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getInscription = catchAsync(async (req, res, next) => {
    const inscription = await Inscription.findById(req.params.id);

    if (!inscription) {
      return next(new AppError('No inscription found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        inscription
      }
    });
});
  
exports.createInscription = catchAsync(async (req, res, next) => {
    const newInscription = await Inscription.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        inscription: newInscription
      }
    });
});


exports.updateInscription = catchAsync(async (req, res, next) => {
    const inscription = await Inscription.findByIdAndUpdate(req.params.id, req.body);
  
    if (!inscription) {
      return next(new AppError('No inscription found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        inscription
      }
    });
  });
  
exports.deleteInscription = catchAsync(async (req, res, next) => {
    const inscription = await Inscription.findByIdAndDelete(req.params.id);
  
    if (!inscription) {
      return next(new AppError('No inscription found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
});
  
exports.getAllInscription = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Inscription.find().sort({"name":1}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const inscription = await features.query;
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: inscription.length,
      data: {
        inscription
      }
    });
});