var FacebookStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {
    
  describe('with profile URL option', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        profileURL: 'https://graph.facebook.com/me?fields=id,username'
      },
      function() {});
  
      // mock
      strategy._oauth2.get = function(url, accessToken, callback) {
        if (url != 'https://graph.facebook.com/me?fields=id,username') { return callback(new Error('incorrect url argument')); }
        if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }
      
        var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
        callback(null, body, undefined);
      }
    
    describe('loading profile', function() {
      var profile;
    
      before(function(done) {
        strategy.userProfile('token', function(err, p) {
          if (err) { return done(err); }
          profile = p;
          done();
        });
      });
    
      it('should parse profile', function() {
        expect(profile.provider).to.equal('facebook');
        expect(profile.id).to.equal('500308595');
        expect(profile.username).to.equal('jaredhanson');
      });
    });
  });
  
  describe('with profile fields mapped from portable contacts schema', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        profileFields: ['id', 'username', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos']
      },
      function() {});
  
      // mock
      strategy._oauth2.get = function(url, accessToken, callback) {
        if (url != 'https://graph.facebook.com/me?fields=id,username,name,last_name,first_name,middle_name,gender,link,email,picture') { return callback(new Error('incorrect url argument')); }
        if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }
      
        var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
        callback(null, body, undefined);
      }
    
    describe('loading profile', function() {
      var profile;
    
      before(function(done) {
        strategy.userProfile('token', function(err, p) {
          if (err) { return done(err); }
          profile = p;
          done();
        });
      });
    
      it('should parse profile', function() {
        expect(profile.provider).to.equal('facebook');
        expect(profile.id).to.equal('500308595');
        expect(profile.username).to.equal('jaredhanson');
      });
    });
  });
  
});