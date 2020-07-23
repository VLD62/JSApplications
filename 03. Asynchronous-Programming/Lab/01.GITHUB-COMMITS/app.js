function loadCommits() {

    const elements = {
        username() { return document.getElementById('username')},
        repo() { return document.getElementById('repo')},
        commit() { return document.getElementById('commits')}
    }

    const url = `https://api.github.com/repos/${elements.username().value}/${elements.repo().value}/commits`

 
}