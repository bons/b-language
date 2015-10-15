'use strict';
var utils = require('./helpers/utils');

function LanguageService($rootScope, $http, $translate, tmhDynamicLocale, LANGUAGE_PATH)
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
    return $http({
          method: 'GET',
          url: LANGUAGE_PATH
        })
        .then(function(r)
        {
          return utils.generateLanguageObject(r.data);
        });
  }
}


module.exports = LanguageService;
