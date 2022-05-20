const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'ok',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours 
    }
  })
}

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; // conver string to number
  const tour = tours.find(el => el.id === id)

  // if(id > tours.length) {
  if(!tour) {
    return res.status(404).json({ 
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: 'ok',
    // results: tours.length,
    data: {
      tour 
    }
  })
}

exports.createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1 ].id + 1;
  const newTour = Object.assign({id: newId}, req.body)

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'ok',
      data: {
        tour: newTour
      }
    })
  })
}

exports.updateTour = (req, res) => {
  console.log(req.params);
  
  if(req.params.id * 1 > tours.length) {
      return res.status(404).json({ 
        status: 'fail',
        message: 'Invalid ID'
      })
    }

  res.status(200).json({
    status: 'ok',
    data: { 
      tour: '<Updataed tour here...>'
    }
  })
}

exports.deleteTour = (req, res) => {
  console.log(req.params);

  if(req.params.id * 1 > tours.length) {
      return res.status(404).json({ 
        status: 'fail',
        message: 'Invalid ID'
      })
    }

  res.status(204).json({
    status: 'ok',
    data: null
  })
}

