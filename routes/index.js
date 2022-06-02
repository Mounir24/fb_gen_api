const express = require('express');
const router = express.Router();
const { v4 } = require('uuid');

// IMPORT MODELS 
const Portfolios = require('../models/portfolio.model');

// INDEX ROUTES (CLIENT) 
/*--- GET ROUTE  ---*/
router.get('/get_profile/:id', async (req, res, next) => {
  const profile_id = req.params.id;
  try {
    await Portfolios.findOne({ profile_id: profile_id }).select('-_id').exec((err, PROFILE) => {
      if (err) return console.error(err.message);
      // CHECK IF PROFILE ID EXIST
      if (PROFILE) {
        console.log(PROFILE);
        return res.status(200).json({ status: 200, payload: PROFILE });
      }
    })
  } catch (err) {
    console.log(err.message);
    next(err)
  }
  //return res.status(200).json({ status: 200, data: 'API working 100%' + profile_id });
});

/*--- POST ROUTE ---*/
router.post('/create_profile', async (req, res, next) => {
  const { fullName, avatar, client_id, email, phone, template_color, template_type, website } = req.body;
  console.log(req.body)
  // CHECK IF THE REQUEST BODY NOT EMPTY
  if (!req.body || req.body == null || req.body == undefined) {
    console.log('Request Empty')
    const error = new Error("Request Empty Cannot Process it :(");
    error.status = 400;
    return next(error);
  }

  // CREATE PORTFOLIO BASED-ON THE SCHEMA 
  const newPortfolio = new Portfolios({
    fullName: fullName,
    avatar: avatar,
    client_id: client_id,
    email: email,
    phone: phone,
    template_color: template_color,
    template_type: template_type,
    website: website,
    profile_id: v4()
  })

  try {
    await newPortfolio.save((err, payload) => {
      if (err) return console.log(err.message);

      console.log(payload);
      return res.status(201).json({ success: true, status: 201, payload });
    })
  } catch (err) {
    console.log(err.message);
    next(err)
  }
  //return res.status(201).json({ status: 201, data: client_info });
})

module.exports = router;
