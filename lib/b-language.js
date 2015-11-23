'use strict';

var MODULE_NAME = 'b-language';

var angular = require('angular'),
    angularTranslate = require('angular-translate'),
    languageService = require('./service'),
    languageController = require('./controller');


var translateProvider;

var app = angular.module(MODULE_NAME, [angularTranslate]);

app.constant('LANGUAGE_PATH', '/languages.csv');
app.constant('LANGUAGE_DEFAULT', '');
app.constant('LANGUAGE_OBJECT_NAME', 'languages');

app.config(['$translateProvider',
  function($translateProvider)
  {
    translateProvider = $translateProvider;
  }]);
app.service('bLanguage', ['$rootScope', '$http', '$q', '$timeout', '$translate', 'LANGUAGE_PATH', 'LANGUAGE_OBJECT_NAME', 'LANGUAGE_DEFAULT', languageService]);

app.controller('language', ['$scope', 'bLanguage', languageController]);

app.run(['$rootScope', '$http', 'bLanguage', 'LANGUAGE_DEFAULT',
  function($rootScope, $http, bLanguage, LANGUAGE_DEFAULT)
  {
    bLanguage.getLanguages()
      .then(function(languages)
      {

        Object.keys(languages).forEach(function(key)
        {
          translateProvider.translations(key, languages[key]);
        });

        var defLang = sessionStorage.getItem('bLanguage.current') || window.navigator.userLanguage || window.navigator.language;

        bLanguage.setLocale(defLang);
      });
  }]);



module.exports = MODULE_NAME;
