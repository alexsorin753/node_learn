// thid is the node.js module object 
// module {
//     id: '.',
//     path: '/absolute/path/to',
//     exports: {},
//     filename: '/absolute/path/to/entry.js',
//     loaded: false,
//     children: [],
//     paths:
//      [ '/absolute/path/to/node_modules',
//        '/absolute/path/node_modules',
//        '/absolute/node_modules',
//        '/node_modules' ] }

// "exports" is a shortcut for "module.exports"; that means exports = module.exports;
// be aware that if you assign another value to "exports" it is no longer bound to "module.exports";



const car = {
    brand: 'Ford',
    model: 'Fiesta'
}

// exports.thousand_random = () => {
// module.exports.thousand_random = () => {
exports.thousand_random =  function() {
    return Math.round( Math.random() * 1000);
}
exports.car = car;

// this is how node.js module looks after adding the above code to "module.exports" object
// module {
//     id: '.',
//     path: '/absolute/path/to',
//     exports: {  thousand_random: [Function (anonymous)],
//                  car: { brand: 'Ford', model: 'Fiesta' } },
//     filename: '/absolute/path/to/entry.js',
//     loaded: false,
//     children: [],
//     paths:
//      [ '/absolute/path/to/node_modules',
//        '/absolute/path/node_modules',
//        '/absolute/node_modules',
//        '/node_modules' ] }

exports = {} // now "exports" can no longer be use for exporting because [exports != module.exports]