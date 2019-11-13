var express = require("express");
var app = express();
app.param("username", function(request, response, next, username) {
  if (!request.user) {
    request.user = { username: username };
  } else {
    request.user.username = username;
  }
  return next();
});
app.param("username", function(request, response, next, username) {
  if (!request.user) {
    request.user = { followers: [username] };
  } else {
    request.user.followers = [username];
  }
  return next();
});
app.get("/user/:username", function(request, response) {
  if (request.user) {
    request.user.role = "USER";
  }
  response.end("Got request for user " + JSON.stringify(request.user));
});
app.get("/admin/:username", function(request, response) {
  if (request.user) {
    request.user.role = "ADMIN";
  }
  response.end("Got request for user " + JSON.stringify(request.user));
});

app.listen(3000);
