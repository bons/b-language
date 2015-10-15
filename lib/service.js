'use strict';
var utils = require('./helpers/utils');

function LanguageService($rootScope, $http, $q, $translate, tmhDynamicLocale, LANGUAGE_PATH)
{
  var self = this,
      currentLocale = $translate.proposedLanguage();

  $rootScope.$on('$translateChangeSuccess', function(evt, data)
  {
    utils.i18nScript(data.language);
    document.documentElement.setAttribute('lang', data.language);
  });

  self.setLocale = function(locale)
  {
    currentLocale = locale;
    $translate.use(locale);
  };

  self.getCurrentLocale = function()
  {
    return currentLocale;
  };

  self.getLanguages = function()
  {
    var languages = sessionStorage.getItem('bLanguage');

    if(languages)
    {
      languages =  JSON.parse(languages);
      
      return $q(function(resolve)
      {
        $timeout(function()
        {
          resolve(languages);
        }, 0);
      });
    }

    return $http({
          method: 'GET',
          url: LANGUAGE_PATH
        })
        .then(function(r)
        {
          languages = utils.generateLanguageObject(r.data);
          sessionStorage.setItem('bLanguage',  JSON.stringify(languages));
          return languages;
        });
  }
}


module.exports = LanguageService;
