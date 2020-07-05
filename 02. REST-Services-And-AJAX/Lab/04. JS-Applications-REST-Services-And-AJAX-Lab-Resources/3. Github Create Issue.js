var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'api.github.com',
  'path': '/repos/testnakov/test-nakov-repo/issues',
  'headers': {
    'Authorization': 'Basic xxx',
    'Content-Type': 'text/plain'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData =  "{\r\n    \"title\":\"Sample issue I have created\",\r\n    \"body\":\"Minor bug\",\r\n    \"labels\":[\"bug\", \"minor\"]\r\n}";

req.write(postData);

req.end();


let response = {
    "url": "https://api.github.com/repos/testnakov/test-nakov-repo/issues/978",
    "repository_url": "https://api.github.com/repos/testnakov/test-nakov-repo",
    "labels_url": "https://api.github.com/repos/testnakov/test-nakov-repo/issues/978/labels{/name}",
    "comments_url": "https://api.github.com/repos/testnakov/test-nakov-repo/issues/978/comments",
    "events_url": "https://api.github.com/repos/testnakov/test-nakov-repo/issues/978/events",
    "html_url": "https://github.com/testnakov/test-nakov-repo/issues/978",
    "id": 650929982,
    "node_id": "MDU6SXNzdWU2NTA5Mjk5ODI=",
    "number": 978,
    "title": "Sample issue I have created",
    "user": {
        "login": "VLD62",
        "id": 16885806,
        "node_id": "MDQ6VXNlcjE2ODg1ODA2",
        "avatar_url": "https://avatars3.githubusercontent.com/u/16885806?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/VLD62",
        "html_url": "https://github.com/VLD62",
        "followers_url": "https://api.github.com/users/VLD62/followers",
        "following_url": "https://api.github.com/users/VLD62/following{/other_user}",
        "gists_url": "https://api.github.com/users/VLD62/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/VLD62/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/VLD62/subscriptions",
        "organizations_url": "https://api.github.com/users/VLD62/orgs",
        "repos_url": "https://api.github.com/users/VLD62/repos",
        "events_url": "https://api.github.com/users/VLD62/events{/privacy}",
        "received_events_url": "https://api.github.com/users/VLD62/received_events",
        "type": "User",
        "site_admin": false
    },
    "labels": [],
    "state": "open",
    "locked": false,
    "assignee": null,
    "assignees": [],
    "milestone": null,
    "comments": 0,
    "created_at": "2020-07-04T17:44:59Z",
    "updated_at": "2020-07-04T17:44:59Z",
    "closed_at": null,
    "author_association": "NONE",
    "active_lock_reason": null,
    "body": "Minor bug",
    "closed_by": null
}