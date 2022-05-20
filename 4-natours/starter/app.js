const fs = require('fs')
const express = require('express');
const morgan = require('morgan')

const app = express();

// 1) middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('middleware');
  next();
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// 2) route handles
const getAllTours = (req, res) => {
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

const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not yet'
  })
}

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not yet'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not yet'
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not yet'
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not yet'
  })
}


// routes

const tourRouter = express.Router();
const userRouter = express.Router();


tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
  
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser)

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) start server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})
