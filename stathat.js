var data = require('./models/data.js')(),
    args = require('./models/args.js')();



args.generateArgs();

switch(args.getArg('2')) {
    case 'list':
        data.getList();
        break;
    case 'statlist':
        data.listStats();
        break;
    case 'detail':
        data.getSingle(args.getArg('3'));
        break;
    case 'delete':
        data.deleteItem(args.getArg('3'));
        break;
    case 'create':
        data.createItem(args.getArg('4'));
        break;
    case 'help':
        data.printHelp();
        break;
    default:
        console.log('Availible commands: help, statlist, list, detail, delete, create. Run help for more information.');
        break;
}