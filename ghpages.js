var simpleGit = require('simple-git')();

var commitHash;

// create a deploy dir in memory

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
	// .pull('origin', 'gh-pages', () => {
	// 	// delete files

	// 	// add files

	// })
	.add('.')
	.commit('Redeploy for commit ' + commitHash + ' to master')
	.push('origin', 'gh-pages');
	// push to origin/gh-pages
	// checkout master
	// if you don't do anything, does it exit with a push?
