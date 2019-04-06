var express = require('express');
var app = express();
var path = require('path');
const pug = require('pug');

app.engine('pug', require('pug').__express);

app.use(express.static(__dirname));

//Running at http://localhost:7000
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/implicit/callback', function (req, res) {
    res.sendFile(path.join(__dirname + '/token_validation.html'));
  })
  
  
  const OktaJwtVerifier = require('@okta/jwt-verifier');
  
  const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-258192.okta.com/oauth2/default', // required
    clientId: '0oaeo23jug7EFIw1c356' // required
  });
  
  
  app.get('/idToken/validate', function (req, res) {
    var idTokenString = req.query.id_token;
    var isIdTokenValidated = false;
    var accessTokenString = req.query.access_token;
  
  
    oktaJwtVerifier.verifyAccessToken(idTokenString)
      .then(jwt => {
        // the token is valid (per definition of 'valid' above)
        console.log(jwt.claims);
        isIdTokenValidated = true;
        res.send('    Id Token Validated !!')
      })
      .catch(err => {
        // a validation failed, inspect the error
        console.error('Error in validating the token');
        res.send('    Id Token Validation Failed !!!')
      });
  
    var queryParam = req.query.id_token;
  
  
  
    // res.send({'status':'success'+req})
  
    // pug.renderFile(html);
  })
  
  
  // resource server 
  app.get('/accessToken/validate', function (req, res) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    const accessToken = match[1];
  
  
    console.log('auth Header' + authHeader);
  
    return oktaJwtVerifier.verifyAccessToken(accessToken)
      .then((jwt) => {
        req.jwt = jwt;
        res.send('<p>Access token is validated</p>')
      })
      .catch((err) => {
        res.send('<p>Access token is denied</p>')
      });
  
  })
  



app.listen(7000);