var simpleGit = require('simple-git')();

simpleGit.branch((err,branches) => {
	console.log(branches);
});

// create a deploy directory in memory

// checkout gh-pages branch, if it exists
// pull down from origin/gh-pages
// delete everything in the dir (except for node_modules, this script, etc)

// copy the deploy directory into the dir

// commit, then push to origin/gh-pages
