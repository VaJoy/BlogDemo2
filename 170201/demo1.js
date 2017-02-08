var ad = require('async-done');

ad(function(cb){
    console.log('first task starts!');
    cb(null, 'first task done!')
}, function(err, data){
    console.log(data)
});

ad(function(cb){
    console.log('second task starts!');
    setTimeout( cb.bind(this, null, 'second task done!'), 1000 )

}, function(err, data){
    console.log(data)
});

ad(function(cb){
    console.log('third task starts!');
    cb(null, 'third task done!')
}, function(err, data){
    console.log(data)
});
