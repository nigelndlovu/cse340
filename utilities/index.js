const invModel = require("../models/inventory-model")
const Util = {}
//const jwt = require("jsonwebtoken")
//require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  console.log(data)
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

Util.buildDetailView = async function (data2) {
  let view
  if (data2.inv_id > 0) {
    view = '<ul>'
    data2.forEach(vehicle2 => {
      view += '<li>'
      view +=  '<a href="../../inv/detail/'+ vehicle2.inv_id 
      + '" title="View ' + vehicle2.inv_make + ' '+ vehicle2.inv_model 
      + 'details"><img src="' + vehicle2.inv_image 
      +'" alt="Image of '+ vehicle2.inv_make + ' ' + vehicle2.inv_model 
      +' on CSE Motors" /></a>'
      view += '<div>'
      view += '<hr />'
      view += '<h2>'
      view += '<a href="../../inv/detail/' + vehicle2.inv_id +'" title="View ' 
      + vehicle2.inv_make + ' ' + vehicle2.inv_model + ' details">' 
      + vehicle2.inv_make + ' ' + vehicle2.inv_model + '</a>'
      view += '</h2>'
      view += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle2.inv_price) + '</span>'
      view += '</div>'
      view += '</div>'
    })
    view += '</ul>'
  } else {
    view += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return view
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
**************************************** */
/*Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }*/

/* ****************************************
 *  Check Login
 * ************************************ */
/*Util.checkLoginData = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }*/

module.exports = Util