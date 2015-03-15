'use strict';
var request = require('request-json');

module.exports = function (){

    return {

        createClient: function(){
           return request.createClient('https://www.stathat.com/x/EokLCoNCJ16sPoXlkewi/');
        }
    }

}