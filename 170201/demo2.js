var undertaker = require('undertaker');
ut = new undertaker();

ut.task('taskA', function(cb){console.log('A'); cb()});
ut.task('taskB', function(cb){console.log('B'); cb()});
ut.task('taskC', function(cb){console.log('C'); cb()});
ut.task('taskD', function(cb){console.log('D'); cb()});
ut.task('taskE', function(cb){console.log('E'); cb()});

ut.task('taskC', ut.series('taskA', 'taskB'));
ut.task('taskE', ut.parallel('taskC', 'taskD'));

var tree = ut.tree();
console.log(tree);