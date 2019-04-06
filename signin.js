

var config = {
    logo: './images.png',
    baseUrl: 'https://dev-258192.okta.com',
    clientId: '0oaeo23jug7EFIw1c356',
    redirectUri: 'http://localhost:7000/implicit/callback',
    authParams: {
      issuer: 'default',
      responseType: ['id_token','token'],
      display: 'page'
    }
  }


var signIn = new OktaSignIn(config);
  
  if (!signIn.token.hasTokensInUrl()) {
    console.log('  leela tokens');
    signIn.renderEl({el: '#widget-container'},
      function() {},
      function(err) { console.err(err) });
  }
  
  else {
    signIn.token.parseTokensFromUrl(
       
      function success(res) {
        console.log('  leela tokens111');
        // Add the token to tokenManager to automatically renew the token when needed
        signIn.tokenManager.add('id_token', res[0]);
        signIn.tokenManager.add('access_token', res[1]);
        console.log('  leela tokens'+signIn.tokenManager.get(res));
      },
      function error(err) {
        console.log('  leela tokens222');
        console.log('handle error', err);
      }
    );
  }
  function callMessagesApi() {
    var accessToken = signIn.tokenManager.get('access_token');
    console.log('  leela tokens333'+accessToken);
  
    if (!accessToken) {
      // This means that the user is not logged in
      return;
    }
  
    // Make a request using jQuery
    $.ajax({
      // Your API or resource server:
      url: 'http://localhost:7000/api/messages',
      headers: {
        Authorization: 'Bearer ' + accessToken.accessToken
      },
      success: function(response) {
        // Received messages!
        console.log('Messages', response);
      },
      error: function(response) {
        console.log("Landed in error::"+response);  
        console.error(response);
      }
    });
  }
  function error(err) {
    var errorEl = document.createElement('div');
    errorEl.textContent = 'Error! ' + err.message;
    document.body.insertBefore(
      errorEl,
      document.body.firstChild
    );
  }