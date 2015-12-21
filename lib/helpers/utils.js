'use strict';

var BabyParse = require('babyparse');

module.exports = {
  generateLanguageObject : generateLanguageObject,
  i18nScript : i18nScript
};

function parseMarkdown(str)
{
  return str.replace(/\*\*([^\*]+)\*\*/g,'<strong>$1</strong>') //bold
            .replace(/\*([^\*]+)\*/g,'<em>$1</em>') //italy
            .replace(/\n/g,'<br>') //enter
            .replace(/\[([^\]]+)\]\(([^\)]+)\)/g,'<a target="_blank" href="$2">$1</a>') //link
}

function generateLanguageObject(csv)
{
  var json = BabyParse.parse(csv).data;
  var languages = {};
  var headers = [];

  json[0].forEach(function(header, i)
  {
    if(i == 0 || !header.trim())
    {
      return;
    }

    languages[header] = {};
    headers.push(header);
  });

  for(var i = 1; i < json.length; i++)
  {
    if(!json[i][0].trim())
    {
      continue;
    }

    for(var j = 0; j < headers.length; j++)
    {
      languages[headers[j]][json[i][0]] = parseMarkdown(json[i][j + 1]);
    }
  }

  return languages;
}

function i18nScript(lang)
{
  var imported = document.createElement('script');
  var fileImport = 'angular-locale_' + lang.toLowerCase().replace(/_/g, '-') + '.js';
  imported.src = 'https://code.angularjs.org/1.2.10/i18n/' + fileImport;
  imported.onload = function()
  {
    document.head.removeChild(imported);
  };
  document.head.appendChild(imported);
}
