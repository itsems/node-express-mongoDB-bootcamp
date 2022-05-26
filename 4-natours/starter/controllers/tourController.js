const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  console.log('check body has name and price property', req.body);
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

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

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'ok',
    // data: {
    //   tour: newTour
    // }
  });
};

exports.updateTour = (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: 'ok',
    data: {
      tour: '<Updataed tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  console.log(req.params);
  res.status(204).json({
    status: 'ok',
    data: null,
  });
};
