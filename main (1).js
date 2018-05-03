//Script Rajoutant un footer sur le fichier choisi
//Requirement : npm install readline,line-reader, byline, readline, inquie

'use strict';
var fs = require('fs'),
    byline = require('byline');
var lineReader = require('line-reader');
Promise = require('bluebird');
var util  = require('util');
const readline = require('readline');
var source = "==================Footer Script==================";
var base = "==================Footer Script==================";
var filePtr = [source];
var i = 1;
var a = 0;
var fileBuffer = {}
var buffer = new Buffer(4096)
var inquirer = require('inquirer');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ce script a besoin d\'un footer utiliser un footer personel ? (vide si non) : \n', (source) => {
rl.question('Ce script a besoin d\'un fichier oû ajouter le footer.\nFile path : ', (target) => {
var eachLine = Promise.promisify(lineReader.eachLine);
eachLine(target, function(line) {
  filePtr[i] = line;
  i++;
  a++;
}).then(function() {
}).catch(function(err) {
  console.error(err);
});
var logger = fs.createWriteStream(target, {
  flags: 'a'
})
logger.write(source +'\n')
if (source == 0)
    logger.write(base +'\n')
      console.log('Le fichier avec le footer est sauvegarder dans le fichier', target);
      inquirer();
    });
  });

  function inquirer() {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'What do you think about it ?',
        name: 'sondage',
        choices: [
          new inquirer.Separator(' = Choices = '),
          {
            name: 'It\'s Good'
          },
          {
            name: 'Need to be more functional..'
          }
        ],
        validate: function(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one answer';
          }
          return true;
        }
      }
    ])
    .then(answers => {
        console.log("Thanks you.")
    });
  }
