'use strict';

var MODULE_NAME = 'b-language';

var angular = require('angular'),
    angularTranslate = require('angular-translate'),
    angularDynamicLocale = require('angular-dynamic-locale'),
    languageService = require('./service');


var translateProvider;

var app = angular.module(MODULE_NAME, [angularTranslate, angularDynamicLocale]);

app.constant('LANGUAGE_PATH', '/languages.csv');
app.constant('LANGUAGE_DEFAULT', 'en_US');

app.config(['$translateProvider',
  function($translateProvider)
  {
    translateProvider = $translateProvider;
  }]);
app.service('bLanguage', ['$rootScope', '$http', '$q', '$translate', 'tmhDynamicLocale', 'LANGUAGE_PATH', languageService]);

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

        bLanguage.setLocale(LANGUAGE_DEFAULT);
      });
  }]);



module.exports = MODULE_NAME;
