function loadRepos() {
	const reposEl = document.getElementById("repos");
	const userEl = document.getElementById("username");

	const username = userEl.value;
	let url = `https://api.github.com/users/${username}/repos`;
	fetch(url)
	.then(res => res.json())
	.then(data => {
		data.forEach(element => {
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.href = element.html_url;
			a.innerHTML = element.full_name;
			li.appendChild(a);
			reposEl.appendChild(li);
		});
	});
}