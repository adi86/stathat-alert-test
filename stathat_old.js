var request = require('request-json'),
    client = request.createClient('https://www.stathat.com/x/EokLCoNCJ16sPoXlkewi/'),
    //client = request.createClient('https://www.stathat.com/x/DxM4FE2O3zeOb3Wi6NmR/'),
    args = {};

function getArg(id) {
    return id in args ? args[id] : '';
}

function generateData() {
    switch(getArg('4')) {
        case 'data':
            var data = {
                "stat_id"     : getArg("3"),
                "kind"        : getArg("4"),
                "time_window" : getArg("5")
            }
            return data;
            break;

        case "value":
            var data = {
                "stat_id"     : getArg("3"),
                "kind"        : getArg("4"),
                "time_window" : getArg("5"),
                "operator"    : getArg("6")+" "+getArg("7"),
                "threshold"   : parseFloat(getArg("8"))
                        }
                        console.log(data);
            return data;
            break;

        case "delta":
            var data = {
                "stat_id"     : getArg("3"),
                "kind"        : getArg("4"),
                "time_window" : getArg("5"),
                "percentage"  : parseFloat(getArg("6")),
                "operator"    : getArg("7")+" "+getArg("8"),
                "time_delta"  : (getArg("9"))
                        }
            return data;
            break;

        default:
            var data = {}
            break;
    }
}

function filterArg() {
    return getArg('2') === 'list' ? 'stat_name' : 'name';
}

function filter(data) {
    for(var i in data) {
        if(data[i][filterArg()].indexOf(args['3']) > -1)
            console.log(data[i]);
    }
}

function getList() {
    client.get('alerts', function (err, res, body) {
        return '3' in args ? filter(body) : console.log(body) ;
    });
}

function getSingle() {
    client.get('alerts/'+getArg('3'), function (err, res, body) {
        return console.log(body);
    });
}

function deleteItem() {
    client.del('alerts/'+getArg('3'), function (err, res, body) {
        return console.log(body);
    });
}

function createItem() {
    client.post('alerts', generateData(), function (err, res, body) {
        return console.log(body);
    });
}

function listStats() {
    client.get('statlist', function (err, res, body) {
        return '3' in args ? filter(body) : console.log(body);
    });
}

function printHelp() {
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

process.argv.forEach(function (value, index) {
    args[index] =  value;
});

switch(getArg('2')) {
    case 'list':
        getList();
        break;
    case 'statlist':
        listStats();
        break;
    case 'detail':
        getSingle();
        break;
    case 'delete':
        deleteItem();
        break;
    case 'create':
        createItem();
        break;
    case 'help':
        printHelp();
        break;
    default:
        console.log('Availible commands: help, statlist, list, detail, delete, create. Run help for more information.');
        break;
}
