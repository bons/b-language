'use strict';

var MODULE_NAME = 'b-language';

var angular = require('angular'),
    angularTranslate = require('angular-translate'),
    angularDynamicLocale = require('angular-dynamic-locale');

angular .module(MODULE_NAME, [angularTranslate, angularDynamicLocale])
        .service('bLanguage', ['$translateProvider', function($translateProvider)
        {
          var self = this;

          self.config = function(options)
          {
            options.path = options.path || {
                prefix: 'resources/locale-',// path to translations files
                suffix: '.json'// suffix, currently- extension of the translations
            };

            options.languages = options.languages instanceof Array && options.languages ||
                                options.languages && [options.languages] ||
                                ['en_US'];

            options.preferredLanguage = options.languages.indexOf(options.preferredLanguage) !== -1 && options.preferredLanguage ||
                                        options.languages[0];

            $translateProvider.useMissingTranslationHandlerLog();

            $translateProvider.useStaticFilesLoader(options.path)
                                .then(function(data)
                                {

                                });
            $translateProvider.preferredLanguage(options.preferredLanguage);// is applied on first load
            $translateProvider.useLocalStorage();// saves selected language to localStorage
          }

        });

module.exports = MODULE_NAME;
