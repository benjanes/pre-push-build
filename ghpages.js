var fs = require('fs');
var simpleGit = require('simple-git')();

var commitHash, file;

// create a deploy dir in memory
fs.readFile('./indexTpl.html', 'utf8', (err, data) => {
	const updateGHPages = writeToGHPages(commitHash, data);

	simpleGit
		.branch((err,branches) => {
			commitHash = branches.branches.master.commit;


			if (!~branches.all.indexOf('gh-pages')) {
				simpleGit.checkoutLocalBranch('gh-pages', updateGHPages);
			} else {
				simpleGit
					.checkout('gh-pages')
					.pull('origin', 'gh-pages', updateGHPages);
			}
		})

		// .checkout('gh-pages', () => {
			
		// })
		// only if gh-pages exists in remote, pull it
		// .pull('origin', 'gh-pages');

})

function writeToGHPages(commitHash, file) {
	return () => {
		fs.writeFile('./index.html', file, () => {

			simpleGit
				.add('.')
				.commit('Redeploy for commit '/* + commitHash*/ + ' to master')
				.push('origin', 'gh-pages', { '--no-verify': null });
			
		});
	}
}


	// push to origin/gh-pages
	// checkout master
	// if you don't do anything, does it exit with a push?
