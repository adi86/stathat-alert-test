var client = require('../libs/client')().createClient(),
    args = require ('../models/args')();

args.generateArgs();

module.exports = function (){
    return {
        generateData: function(arg){
            var dataObj = {
                'data': {
                    "stat_id"     : args.getArg("3"),
                    "kind"        : args.getArg("4"),
                    "time_window" : args.getArg("5")
                },

                'value':{
                    "stat_id"     : args.getArg("3"),
                    "kind"        : args.getArg("4"),
                    "time_window" : args.getArg("5"),
                    "operator"    : args.getArg("6")+" "+args.getArg("7"),
                    "threshold"   : parseFloat(args.getArg("8"))
                },

                delta: {
                    "stat_id"     : args.getArg("3"),
                    "kind"        : args.getArg("4"),
                    "time_window" : args.getArg("5"),
                    "percentage"  : parseFloat(args.getArg("6")),
                    "operator"    : args.getArg("7")+" "+args.getArg("8"),
                    "time_delta"  : (args.getArg("9"))
                }
            }

            return dataObj[arg] ? dataObj[arg] : {};
        },
        getList: function() {
            client.get('alerts', function (err, res, body) {
                return '3' in args.getAllArgs() ? args.filter(body) : console.log(body) ;
            });
        },

        getSingle: function(alert) {
            client.get('alerts/'+alert, function (err, res, body) {
                return console.log(body);
            });
        },

        deleteItem: function (alert) {
            client.del('alerts/'+alert, function (err, res, body) {
                return console.log(body);
            });
        },

        createItem: function (kind) {
            client.post('alerts', this.generateData(kind), function (err, res, body) {
                return console.log(body);
            });
        },

        listStats: function () {
            client.get('statlist', function (err, res, body) {
                return '3' in args.getAllArgs() ? args.filter(body) : console.log(body);
            });
        },

        printHelp: function () {
            var str = "\nAvailible commands: \n \
                help - shows this help string \n \
                statlist [filter] - lists [filtered] stats \n \
                list [filter] - lists [filtered] alerts \n \
                detail id - shows details of actual alert\n \
                delete id - deletes alert \n \
                create [stat_id \"data\" time_window]\n \
                       [stat_id \"value\" time_window threshold operator]\n \
                       [stat_id \"delta\" time_window percentage operator time_delta] - creates alert\n\n\
                More info: https://github.com/triptease/stathat#stathat-nodejs-client\n";

            console.log(str);

        }
    }
}