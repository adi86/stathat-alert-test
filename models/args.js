'use strict';

module.exports = function(){
    var appArgs = {};
    return {
        generateArgs: function(){
            process.argv.forEach(function (value, index) {
                appArgs[index] =  value;
            });
        },

        getArg: function(id){
            return id in appArgs? appArgs[id] : '';
        },

        getAllArgs: function(){
          return appArgs;
        },

        filterArg: function () {
            return this.getArg('2') === 'list' ? 'stat_name' : 'name';
        },

        filter: function (data) {
            for(var i in data) {
                if(data[i][this.filterArg()].indexOf(appArgs['3']) > -1)
                    console.log(data[i]);
            }
        }
    }
}