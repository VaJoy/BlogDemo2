var undertaker = require('undertaker');
ut = new undertaker();

ut._setTask('taskA', function(){console.log('A')});
ut._setTask('taskB', function(){console.log('B')});


var tree = ut.tree();
console.log(tree);
console.log('deep tree================');
tree = ut.tree({ deep: true });
console.log(tree);
