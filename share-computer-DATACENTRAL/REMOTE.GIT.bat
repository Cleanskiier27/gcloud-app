[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
[remote "origin"]
	url = https://github.com/Cleanskiier27/glc.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[remote "bigtree"]
	url = git@main-instance-159147526315-ssh.us-central1.sourcemanager.dev:source-root-7076/source-root.git
	fetch = +refs/heads/*:refs/remotes/bigtree/*
[remote "master"]
	url = https://github.com/Cleanskiier27/gcloud.git
	fetch = +refs/heads/*:refs/remotes/master/*
[remote "twins"]
	url = https://github.com/Cleanskiier27/remote.git
	fetch = +refs/heads/*:refs/remotes/twins/*
[branch "main"]
	remote = twins
	vscode-merge-base = origin/main
	merge = refs/heads/main
