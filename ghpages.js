var fs = require('fs');
var simpleGit = require('simple-git')();

var commitHash, file;

// create a deploy dir in memory
fs.readFile('./indexTpl.html', 'utf8', (err, data) => {
	simpleGit
		.branch((err,branches) => {
			const updateGHPages = writeToGHPages(branches.branches.master.commit, data);

			if (!~branches.all.indexOf('gh-pages')) {
				simpleGit.checkoutLocalBranch('gh-pages', updateGHPages);
			} else {
				simpleGit
					.checkout('gh-pages')
					.pull('origin', 'gh-pages', updateGHPages);
			}
		});
})

function writeToGHPages(commitHash, file) {
	return () => {
		fs.writeFile('./index.html', file, () => {

			simpleGit
				.add('.')
				.commit('Redeploy for commit ' + commitHash + ' to master')
				.push('origin', 'gh-pages', { '--no-verify': null })
				.checkout('master');
		});
	}
}
