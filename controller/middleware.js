//middleware
module.exports.ensureLogin = function (req, res, next) { 
    if (!req.session.user.userName) {
      res.redirect("/login");
    } else {
      next();
    }
}

module.exports.checkAdmin = function (req, res, next) {
    if (req.session.user.userName === "admin") {
        next();
    } else {
        res.redirect("/noaccess");
    }
}

module.exports.ensureAccess = function(req, res, next) {
  if(isAccessable(req.session.email)) {
      next();
  } else {
      res.render('home', {
          layout: 'noAccess'
      })
  }
}