var fs = require('fs');
var simpleGit = require('simple-git')();

var commitHash;
var file;

// create a deploy dir in memory
fs.readFile('./indexTpl.html', 'utf8', (err, data) => {
	file = data;
	simpleGit
		// .branch((err,branches) => {
		// 	commitHash = branches.branches.master.commit;

		// 	if (!~branches.all.indexOf('gh-pages')) {
		// 		simpleGit.checkoutLocalBranch('gh-pages');
		// 	} else {
		// 		simpleGit.checkout('gh-pages');
		// 	}
		// })
		.checkout('gh-pages', () => {
			
			fs.writeFile('./index.html', file, () => {
				// console.log(file);

				simpleGit
					.add('.')
					.commit('Redeploy for commit '/* + commitHash*/ + ' to master')
					.push('origin', 'gh-pages', { '--no-verify': null });
				
			})
		})
		// only if gh-pages exists in remote, pull it
		// .pull('origin', 'gh-pages');

})


	// push to origin/gh-pages
	// checkout master
	// if you don't do anything, does it exit with a push?
