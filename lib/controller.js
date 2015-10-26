'use strict';

function languageController($scope, bLanguage)
{
  $scope.setLocale = bLanguage.setLocale;
  $scope.getCurrentLocale = bLanguage.getCurrentLocale;
}

module.exports = languageController;
