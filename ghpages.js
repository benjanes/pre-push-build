var fs = require('fs');
var simpleGit = require('simple-git')();

var commitHash;

// create a deploy dir in memory
fs.readFile('./index.html', 'utf8', (err, data) => {
	console.log(data);
	simpleGit
		.branch((err,branches) => {
			commitHash = branches.branches.master.commit;

			if (!~branches.all.indexOf('gh-pages')) {
				simpleGit.checkoutLocalBranch('gh-pages');
			} else {
				simpleGit.checkout('gh-pages');
			}
		})
		// only if gh-pages exists in remote, pull it
		.pull('origin', 'gh-pages');

	fs.writeFile('./index.html', data, () => {
		simpleGit
			.add('./*')
			.commit('Redeploy for commit ' + commitHash + ' to master')
			.push('origin', 'gh-pages', { '--no-verify': null });
		
	})
})


	// push to origin/gh-pages
	// checkout master
	// if you don't do anything, does it exit with a push?
