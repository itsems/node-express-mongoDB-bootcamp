const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    console.log('req.query', req.query);

    // Build Query
    // 1) Filtering
    const queryObj = {...req.query};
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    const query = Tour.find(JSON.parse(queryStr));
    console.log(JSON.parse(queryStr));

    // Execute Query
    const tours = await query;
  
    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // Send Response
    res.status(200).json({
      status: 'ok',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)

    res.status(200).json({
      status: 'ok',
      data: { tour }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }

  // const tour = tours.find(el => el.id === id)

  // res.status(200).json({
  //   status: 'ok',
  //   // results: tours.length,
  //   data: {
  //     tour
  //   }
  // })
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'updateTour ok',
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json({
      status: 'delete Tour ok'
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }
};
