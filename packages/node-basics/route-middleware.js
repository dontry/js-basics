const routes = {  // define a route object
  GET: {
    '/users': function(req, res){
      res.end('tobi, loki, ferret');
    },
    '/user/:id': function(req, res, id){  
      res.end('user ' + id);
    }
  }, DELETE: {
    '/user/:id': function(req, res, id){
      res.end('deleted user ' + id);
    }
  }
};

￼￼￼￼￼￼￼connect()
  .use(router(routes))  
  .listen(3000);


module.exports = function route(obj) {
  return function(req, res, next) {
    if (!obj[req.method]) {
      //check if req.method is defined
      next();
      return;
    }

    var routes = obj[req.method]; // look up matched routes
    var url = parse(req.url);
    var paths = Object.keys(routes); // put matched path to an array
    for (var i = 0; i < paths.length; i++) {
      //traverse paths
      var path = paths[i];
      var fn = routes[path];
      path = path.replace(/\//g, "\\/").replace(/:(\w+)/g, "([^\\/]+)");
      var re = new RegExp("^" + path + "$"); //construct regex 
      var captures = url.pathname.match(re);
      if (captures) {
        // try mapping the path
        var args = [req, res].concat(captures.slice(1)); //
        fn.apply(null, args);
        return; //return when there is a matched path
      }
    }
    next();
  };
};
