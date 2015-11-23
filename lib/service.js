'use strict';
var utils = require('./helpers/utils');

function LanguageService($rootScope, $http, $q, $timeout, $translate, LANGUAGE_PATH, LANGUAGE_OBJECT_NAME, LANGUAGE_DEFAULT)
{
  var self = this,
      languages = {},
      currentLocale = $translate.proposedLanguage();

  $rootScope.$on('$translateChangeSuccess', function(evt, data)
  {
    var lang = languages.hasOwnProperty(data.language) && data.language || LANGUAGE_DEFAULT;

    utils.i18nScript(lang);
    $rootScope[LANGUAGE_OBJECT_NAME] = languages[lang];
    document.documentElement.setAttribute('lang', lang);
  });

  self.setLocale = function(locale)
  {
    locale = locale.split('-')[0].trim();
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
          url: LANGUAGE_PATH,
          withLoader: 'page'
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
