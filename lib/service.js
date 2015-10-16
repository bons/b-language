'use strict';
var utils = require('./helpers/utils');

function LanguageService($rootScope, $http, $q, $timeout, $translate, tmhDynamicLocale, LANGUAGE_PATH)
{
  var self = this,
      languages = {},
      currentLocale = $translate.proposedLanguage();

  $rootScope.$on('$translateChangeSuccess', function(evt, data)
  {
    utils.i18nScript(data.language);
    $rootScope.language = languages[data.language];
    document.documentElement.setAttribute('lang', data.language);
  });

  self.setLocale = function(locale)
  {
    currentLocale = locale;
    sessionStorage.setItem('bLanguage.current', currentLocale);
    $translate.use(locale);
  };

  self.getCurrentLocale = function()
  {
    return currentLocale;
  };

  self.getLanguages = function()
  {
    var lang = sessionStorage.getItem('bLanguage');

    if(lang)
    {
      languages =  JSON.parse(lang);

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
