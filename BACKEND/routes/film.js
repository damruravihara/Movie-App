const filmRouter = require('express').Router();
const passport = require('passport');
const passportConfig = require('../passport');
const Film = require('../models/Film');

filmRouter.post('/addfilm',passport.authenticate('jwt',{session : false}),(req,res)=>{
  const {userId,userName,genres,name,description,trailer,filmimage,filmyear,state,duration} = req.body;
  let ts = Date.now();

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();

  const currentdate = (year + "-" + month + "-" + date);


  const newfilm = new Film({
    userId,
    userName,
    genres,
    name,
    description,
    trailer,
    filmimage,
    filmyear,
    state,
    duration,
    currentdate
  })

  newfilm.save().then(()=>{
    res.json("Film Added")
  }).catch((err)=>{
    console.log(err);
  })

});


filmRouter.get('/getfilm/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let filmid = req.params.id;
  // if(userId===req.user._id){
    Film.findById(filmid).then((film)=>{
      res.status(200).send({status:"Film fetched", film});
  
  }).catch((e)=>{
      res.status(500).send({status:"Error"});
  })
  // }
});

filmRouter.get('/allfilms',passport.authenticate('jwt',{session : false}),(req,res)=>{
  Film.find({userId : req.user._id}).then((film)=>{
    res.json(film.reverse());
  })
  .catch((err)=>{
    console.log(err);
  })

});

filmRouter.put('/filmupdate/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let filmID = req.params.id;

  

  const {userId,userName,genres,name,description,trailer,state,duration,filmimage,filmyear} = req.body;

  const updateFilm = {
    userId,
    userName,
    genres,
    name,
    description,
    trailer,
    filmimage,
    state,
    duration,
    filmyear
  }
    const update = Film.findByIdAndUpdate(filmID,updateFilm).then(() =>{
      res.status(200).send({status: "Film updated"})
  }).catch((err) =>{
      console.log(err);
      res.status(500).send({status: "Error with updating data",error: err.message})
  });
});

filmRouter.delete('/deletefilm/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let filmID = req.params.id;

  Film.findByIdAndDelete(filmID)
  .then(()=>{
    res.status(200).send({ status: "Film deleted" });
  })
  .catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  });
});

filmRouter.delete('/deleteall/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{

  Film.find({userId : req.params.id}).deleteMany().then(()=>{
    res.status(200).send({ status: "All Films deleted" });
  }).catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  }); 
});

module.exports = filmRouter;