import React from 'react';
import logo from './logo.svg';
import DataColumn from './DataColumn';
import './App.css';

const defaultInput = [
  {
    "sha": "37b2d2129e5ff5d79c0f4ef08b031fa257b0bf28",
    "node_id": "MDY6Q29tbWl0NTEwMTE0MTozN2IyZDIxMjllNWZmNWQ3OWMwZjRlZjA4YjAzMWZhMjU3YjBiZjI4",
    "commit": {
      "author": {
        "name": "William Langford",
        "email": "wlangfor@gmail.com",
        "date": "2019-07-31T16:20:51Z"
      },
      "committer": {
        "name": "GitHub",
        "email": "noreply@github.com",
        "date": "2019-07-31T16:20:51Z"
      },
      "message": "Merge pull request #1948 from eli-schwartz/no-pacman-sy\n\ndocs: fix seriously dangerous download instructions for Arch Linux",
      "tree": {
        "sha": "d18c86dc83e11a616ab14ba11d6543db0b2103ec",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/d18c86dc83e11a616ab14ba11d6543db0b2103ec"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/37b2d2129e5ff5d79c0f4ef08b031fa257b0bf28",
      "comment_count": 0,
      "verification": {
        "verified": true,
        "reason": "valid",
        "signature": "-----BEGIN PGP SIGNATURE-----\n\nwsBcBAABCAAQBQJdQb/jCRBK7hj4Ov3rIwAAdHIIAHQAhW4wc3SC3ZkWyXrYs8jr\nD5uyRAHKUudXPrIK/3qR+7k8UbP0jS8k+8wIyXO58AFsCo51WaKWAJSO0G38YNTZ\ndcGUN20gaFFzrudcAJPT0v5F4JlFHrpQVZ6VVSIOxSGvPUDI4JDID9fU0kiTZF4a\nyTAII03JBnEroQHb61N2qRU7Un/aK2RBzt0zJCSpsCK04U1Zt8YtNlxz/jmwmDrq\nMiSgQNxSpEkUaGgYN9TEyIJWZgcSeoo3WiHSc6K9X3XDkdPjOL0knqH/t904tePC\nVkz7RVzy6HDOo91OM78XrQpwBpkWhNCAA9Xt42Hxgt0WUbWLSoDR7ynCeGXIXN8=\n=/1CQ\n-----END PGP SIGNATURE-----\n",
        "payload": "tree d18c86dc83e11a616ab14ba11d6543db0b2103ec\nparent a97638713ad30653d424f136018098c4b0e5c71b\nparent 78774647e10414bcff2e1ea52074003dec024dfc\nauthor William Langford <wlangfor@gmail.com> 1564590051 -0400\ncommitter GitHub <noreply@github.com> 1564590051 -0400\n\nMerge pull request #1948 from eli-schwartz/no-pacman-sy\n\ndocs: fix seriously dangerous download instructions for Arch Linux"
      }
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/37b2d2129e5ff5d79c0f4ef08b031fa257b0bf28",
    "html_url": "https://github.com/stedolan/jq/commit/37b2d2129e5ff5d79c0f4ef08b031fa257b0bf28",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/37b2d2129e5ff5d79c0f4ef08b031fa257b0bf28/comments",
    "author": {
      "login": "wtlangford",
      "id": 3422295,
      "node_id": "MDQ6VXNlcjM0MjIyOTU=",
      "avatar_url": "https://avatars2.githubusercontent.com/u/3422295?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/wtlangford",
      "html_url": "https://github.com/wtlangford",
      "followers_url": "https://api.github.com/users/wtlangford/followers",
      "following_url": "https://api.github.com/users/wtlangford/following{/other_user}",
      "gists_url": "https://api.github.com/users/wtlangford/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/wtlangford/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/wtlangford/subscriptions",
      "organizations_url": "https://api.github.com/users/wtlangford/orgs",
      "repos_url": "https://api.github.com/users/wtlangford/repos",
      "events_url": "https://api.github.com/users/wtlangford/events{/privacy}",
      "received_events_url": "https://api.github.com/users/wtlangford/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "web-flow",
      "id": 19864447,
      "node_id": "MDQ6VXNlcjE5ODY0NDQ3",
      "avatar_url": "https://avatars3.githubusercontent.com/u/19864447?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/web-flow",
      "html_url": "https://github.com/web-flow",
      "followers_url": "https://api.github.com/users/web-flow/followers",
      "following_url": "https://api.github.com/users/web-flow/following{/other_user}",
      "gists_url": "https://api.github.com/users/web-flow/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/web-flow/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/web-flow/subscriptions",
      "organizations_url": "https://api.github.com/users/web-flow/orgs",
      "repos_url": "https://api.github.com/users/web-flow/repos",
      "events_url": "https://api.github.com/users/web-flow/events{/privacy}",
      "received_events_url": "https://api.github.com/users/web-flow/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "a97638713ad30653d424f136018098c4b0e5c71b",
        "url": "https://api.github.com/repos/stedolan/jq/commits/a97638713ad30653d424f136018098c4b0e5c71b",
        "html_url": "https://github.com/stedolan/jq/commit/a97638713ad30653d424f136018098c4b0e5c71b"
      },
      {
        "sha": "78774647e10414bcff2e1ea52074003dec024dfc",
        "url": "https://api.github.com/repos/stedolan/jq/commits/78774647e10414bcff2e1ea52074003dec024dfc",
        "html_url": "https://github.com/stedolan/jq/commit/78774647e10414bcff2e1ea52074003dec024dfc"
      }
    ]
  },
  {
    "sha": "78774647e10414bcff2e1ea52074003dec024dfc",
    "node_id": "MDY6Q29tbWl0NTEwMTE0MTo3ODc3NDY0N2UxMDQxNGJjZmYyZTFlYTUyMDc0MDAzZGVjMDI0ZGZj",
    "commit": {
      "author": {
        "name": "Eli Schwartz",
        "email": "eschwartz@archlinux.org",
        "date": "2019-07-21T18:40:47Z"
      },
      "committer": {
        "name": "Eli Schwartz",
        "email": "eschwartz@archlinux.org",
        "date": "2019-07-21T18:40:47Z"
      },
      "message": "docs: fix seriously dangerous download instructions for Arch Linux\n\nThe current instructions tell users to perform two actions:\n- update the package database\n- install the jq package\n\nThe only thing users need to or should be doing is actually installing\nthe jq package -- regardless of which version is being installed.\nGuidelines on how to perform system updates are massively out of scope.\n\nIn the case of partially performing a system update as a prerequisite\nfor installing jq, the official guidance from Arch Linux is not to do\nthis: partial updates are not supported, we refuse to support them, and\nanyone who does try to perform them anyway is assumed to know so much\nabout their system that they clearly do not ever need help from anyone\nelse (which is a good thing since they won't get it). The result is a\nfrankensteined system that can only ever be supported by the person who\nfrankensteined it to begin with. The only reason the package manager\neven allows it to occur in the first place is because other\ndistributions using pacman might have different LTS policies, and\nbecause it would prevent expert users from being in control of their\nsystem, as per the traditional Unix philosophy:\n\n\"Unix was not designed to stop you from doing stupid things, because\nthat would also stop you from doing clever things.\"\n\nConsequences of performing partial updates without understanding the\nramifications in extensive detail can include breaking the partially\nupdated application (jq), breaking any application that shares a mutual\ndependency with the partially updated application (which jq is *lucky*\nto only depend on the ever-backwards-compatible glibc), or breaking the\nentire operating system by leaving armed traps behind for the next time\na `pacman -S new-package` is executed and thereby breaks *its* cascading\ndependencies.\n\nSee:\nhttps://wiki.archlinux.org/index.php/System_maintenance#Partial_upgrades_are_unsupported",
      "tree": {
        "sha": "d18c86dc83e11a616ab14ba11d6543db0b2103ec",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/d18c86dc83e11a616ab14ba11d6543db0b2103ec"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/78774647e10414bcff2e1ea52074003dec024dfc",
      "comment_count": 0,
      "verification": {
        "verified": true,
        "reason": "valid",
        "signature": "-----BEGIN PGP SIGNATURE-----\n\niQJMBAABCgA2FiEEYEETBMCdNmKDQO7/zrFn77VyK9YFAl00scUYHGVzY2h3YXJ0\nekBhcmNobGludXgub3JnAAoJEM6xZ++1civW6acP/0nwQmWjPfFPH0hsBSboyVTz\ndvUcxpv/ayYaL17COPAya3Ipl3TqPlZCjYS2qSvwWi5+R4LBRN9FB7MSCfZxGA95\n2gMVLe7KA9/6D6+XeCA18SYtigmmJGOQFAwHTaeZuWQetFapP1YDMNZ4/hkPNN58\nSgosyBTHRaykhQeSY4KVo2z6A8E25cQEvqmKQpplZ3sqG3Lka+mjhvP6A3M82Nhp\nMwsUoLH1UYZZ/TnSBUl/OTwZz55z/k1qaCwmyumOhrdZVBF0eKB/MHXJf/NzZ4zH\nqMzIb5YONTv4zNBfpJZpH6FEvt10pn4TSDuhZ2ADR31/GgPiwDQfL3ItbkecSYzH\n31m0ns5B8w1emexpnAr87yzEhxDCkIWStfPup0JjzRkQdHlxJuKqa9trtNpXPxMh\n8bW3flzRawOEaHrs5v9M9vV9XPDXuelLvIcRmD2uPsrMlFv9vY0Q807vu4rGphat\nRynb3Ym5jDjpZk6rPoUmZl24nhTuY0oOPXcsdNYpWSndSNpwMQb2Dg7CXsa1wkXn\ncsYncQwZJEcG8ZBVS+4lZw19PYfMm/vZF2rpM4k98avIgwz/LNQDcfyfYgrSR5I2\nCvAvTG0g6s8BMMbIBjWo3ibSJe3Ld1KmkAUttgu+gQz0XIZvntlLiZbPEYeSuMI8\nMCjj9GoXgYRui3fbWqaE\n=6ml2\n-----END PGP SIGNATURE-----",
        "payload": "tree d18c86dc83e11a616ab14ba11d6543db0b2103ec\nparent a97638713ad30653d424f136018098c4b0e5c71b\nauthor Eli Schwartz <eschwartz@archlinux.org> 1563734447 -0400\ncommitter Eli Schwartz <eschwartz@archlinux.org> 1563734447 -0400\n\ndocs: fix seriously dangerous download instructions for Arch Linux\n\nThe current instructions tell users to perform two actions:\n- update the package database\n- install the jq package\n\nThe only thing users need to or should be doing is actually installing\nthe jq package -- regardless of which version is being installed.\nGuidelines on how to perform system updates are massively out of scope.\n\nIn the case of partially performing a system update as a prerequisite\nfor installing jq, the official guidance from Arch Linux is not to do\nthis: partial updates are not supported, we refuse to support them, and\nanyone who does try to perform them anyway is assumed to know so much\nabout their system that they clearly do not ever need help from anyone\nelse (which is a good thing since they won't get it). The result is a\nfrankensteined system that can only ever be supported by the person who\nfrankensteined it to begin with. The only reason the package manager\neven allows it to occur in the first place is because other\ndistributions using pacman might have different LTS policies, and\nbecause it would prevent expert users from being in control of their\nsystem, as per the traditional Unix philosophy:\n\n\"Unix was not designed to stop you from doing stupid things, because\nthat would also stop you from doing clever things.\"\n\nConsequences of performing partial updates without understanding the\nramifications in extensive detail can include breaking the partially\nupdated application (jq), breaking any application that shares a mutual\ndependency with the partially updated application (which jq is *lucky*\nto only depend on the ever-backwards-compatible glibc), or breaking the\nentire operating system by leaving armed traps behind for the next time\na `pacman -S new-package` is executed and thereby breaks *its* cascading\ndependencies.\n\nSee:\nhttps://wiki.archlinux.org/index.php/System_maintenance#Partial_upgrades_are_unsupported\n"
      }
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/78774647e10414bcff2e1ea52074003dec024dfc",
    "html_url": "https://github.com/stedolan/jq/commit/78774647e10414bcff2e1ea52074003dec024dfc",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/78774647e10414bcff2e1ea52074003dec024dfc/comments",
    "author": {
      "login": "eli-schwartz",
      "id": 6551424,
      "node_id": "MDQ6VXNlcjY1NTE0MjQ=",
      "avatar_url": "https://avatars1.githubusercontent.com/u/6551424?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/eli-schwartz",
      "html_url": "https://github.com/eli-schwartz",
      "followers_url": "https://api.github.com/users/eli-schwartz/followers",
      "following_url": "https://api.github.com/users/eli-schwartz/following{/other_user}",
      "gists_url": "https://api.github.com/users/eli-schwartz/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/eli-schwartz/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/eli-schwartz/subscriptions",
      "organizations_url": "https://api.github.com/users/eli-schwartz/orgs",
      "repos_url": "https://api.github.com/users/eli-schwartz/repos",
      "events_url": "https://api.github.com/users/eli-schwartz/events{/privacy}",
      "received_events_url": "https://api.github.com/users/eli-schwartz/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "eli-schwartz",
      "id": 6551424,
      "node_id": "MDQ6VXNlcjY1NTE0MjQ=",
      "avatar_url": "https://avatars1.githubusercontent.com/u/6551424?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/eli-schwartz",
      "html_url": "https://github.com/eli-schwartz",
      "followers_url": "https://api.github.com/users/eli-schwartz/followers",
      "following_url": "https://api.github.com/users/eli-schwartz/following{/other_user}",
      "gists_url": "https://api.github.com/users/eli-schwartz/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/eli-schwartz/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/eli-schwartz/subscriptions",
      "organizations_url": "https://api.github.com/users/eli-schwartz/orgs",
      "repos_url": "https://api.github.com/users/eli-schwartz/repos",
      "events_url": "https://api.github.com/users/eli-schwartz/events{/privacy}",
      "received_events_url": "https://api.github.com/users/eli-schwartz/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "a97638713ad30653d424f136018098c4b0e5c71b",
        "url": "https://api.github.com/repos/stedolan/jq/commits/a97638713ad30653d424f136018098c4b0e5c71b",
        "html_url": "https://github.com/stedolan/jq/commit/a97638713ad30653d424f136018098c4b0e5c71b"
      }
    ]
  },
  {
    "sha": "a97638713ad30653d424f136018098c4b0e5c71b",
    "node_id": "MDY6Q29tbWl0NTEwMTE0MTphOTc2Mzg3MTNhZDMwNjUzZDQyNGYxMzYwMTgwOThjNGIwZTVjNzFi",
    "commit": {
      "author": {
        "name": "William Langford",
        "email": "wlangfor@gmail.com",
        "date": "2019-07-14T19:08:14Z"
      },
      "committer": {
        "name": "GitHub",
        "email": "noreply@github.com",
        "date": "2019-07-14T19:08:14Z"
      },
      "message": "Merge pull request #1944 from tessus/doc-improvement\n\nclarify filter usage",
      "tree": {
        "sha": "036d57eea16c75c71e3ad349b369d106bc20f82f",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/036d57eea16c75c71e3ad349b369d106bc20f82f"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/a97638713ad30653d424f136018098c4b0e5c71b",
      "comment_count": 0,
      "verification": {
        "verified": true,
        "reason": "valid",
        "signature": "-----BEGIN PGP SIGNATURE-----\n\nwsBcBAABCAAQBQJdK32eCRBK7hj4Ov3rIwAAdHIIADmxAsRt2LPxMWvfTQx9aI9E\nbslK2igDr90rDOw7eZmTQl/ExwBJL9dqwqUyub88I6iS7BF6mmpIIYjF9LF2iEB2\nCrRjWSuzH6c3+DVj91+3njJOKgtJEe83gsD/homRHhTpSSr9HDl4r8Mh3fG+/kj8\nlnzkeDBrWqjBTT0Jrp1AUw6g0OVtd42fxL1MzS1VqTNWLMerD6S73Ik+qcV80pPa\nqfXeXsmpERVMUO8SJpTT+C2daQ+zfSD6lp3ZSQYCxms5a7kDOrZg/AOQTKZgf0mr\nnriHFhj9ZRYiW7ul/nwoRDyBvalFW371yN7KJLK4WwZOl653bRIunjxT8UyUewI=\n=UYYS\n-----END PGP SIGNATURE-----\n",
        "payload": "tree 036d57eea16c75c71e3ad349b369d106bc20f82f\nparent e944fe843651b3044e5387c69b28b28f4999e9ea\nparent 8d9817d2f7349b6db758783ace4c0c644d5dd7c0\nauthor William Langford <wlangfor@gmail.com> 1563131294 -0400\ncommitter GitHub <noreply@github.com> 1563131294 -0400\n\nMerge pull request #1944 from tessus/doc-improvement\n\nclarify filter usage"
      }
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/a97638713ad30653d424f136018098c4b0e5c71b",
    "html_url": "https://github.com/stedolan/jq/commit/a97638713ad30653d424f136018098c4b0e5c71b",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/a97638713ad30653d424f136018098c4b0e5c71b/comments",
    "author": {
      "login": "wtlangford",
      "id": 3422295,
      "node_id": "MDQ6VXNlcjM0MjIyOTU=",
      "avatar_url": "https://avatars2.githubusercontent.com/u/3422295?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/wtlangford",
      "html_url": "https://github.com/wtlangford",
      "followers_url": "https://api.github.com/users/wtlangford/followers",
      "following_url": "https://api.github.com/users/wtlangford/following{/other_user}",
      "gists_url": "https://api.github.com/users/wtlangford/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/wtlangford/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/wtlangford/subscriptions",
      "organizations_url": "https://api.github.com/users/wtlangford/orgs",
      "repos_url": "https://api.github.com/users/wtlangford/repos",
      "events_url": "https://api.github.com/users/wtlangford/events{/privacy}",
      "received_events_url": "https://api.github.com/users/wtlangford/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "web-flow",
      "id": 19864447,
      "node_id": "MDQ6VXNlcjE5ODY0NDQ3",
      "avatar_url": "https://avatars3.githubusercontent.com/u/19864447?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/web-flow",
      "html_url": "https://github.com/web-flow",
      "followers_url": "https://api.github.com/users/web-flow/followers",
      "following_url": "https://api.github.com/users/web-flow/following{/other_user}",
      "gists_url": "https://api.github.com/users/web-flow/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/web-flow/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/web-flow/subscriptions",
      "organizations_url": "https://api.github.com/users/web-flow/orgs",
      "repos_url": "https://api.github.com/users/web-flow/repos",
      "events_url": "https://api.github.com/users/web-flow/events{/privacy}",
      "received_events_url": "https://api.github.com/users/web-flow/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "e944fe843651b3044e5387c69b28b28f4999e9ea",
        "url": "https://api.github.com/repos/stedolan/jq/commits/e944fe843651b3044e5387c69b28b28f4999e9ea",
        "html_url": "https://github.com/stedolan/jq/commit/e944fe843651b3044e5387c69b28b28f4999e9ea"
      },
      {
        "sha": "8d9817d2f7349b6db758783ace4c0c644d5dd7c0",
        "url": "https://api.github.com/repos/stedolan/jq/commits/8d9817d2f7349b6db758783ace4c0c644d5dd7c0",
        "html_url": "https://github.com/stedolan/jq/commit/8d9817d2f7349b6db758783ace4c0c644d5dd7c0"
      }
    ]
  },
  {
    "sha": "8d9817d2f7349b6db758783ace4c0c644d5dd7c0",
    "node_id": "MDY6Q29tbWl0NTEwMTE0MTo4ZDk4MTdkMmY3MzQ5YjZkYjc1ODc4M2FjZTRjMGM2NDRkNWRkN2Mw",
    "commit": {
      "author": {
        "name": "Helmut K. C. Tessarek",
        "email": "tessarek@evermeet.cx",
        "date": "2019-07-09T01:02:43Z"
      },
      "committer": {
        "name": "Helmut K. C. Tessarek",
        "email": "tessarek@evermeet.cx",
        "date": "2019-07-09T01:02:43Z"
      },
      "message": "clarify filter usage\n\nThe current paragraph is not complete, since a digit is not a special character.\n\nChanging it to:\n\n    If the key contains special characters or starts with a digit,\n    you need to surround it with double quotes like this:\n    `.\"foo$\"`, or else `.[\"foo$\"]`.",
      "tree": {
        "sha": "036d57eea16c75c71e3ad349b369d106bc20f82f",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/036d57eea16c75c71e3ad349b369d106bc20f82f"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/8d9817d2f7349b6db758783ace4c0c644d5dd7c0",
      "comment_count": 0,
      "verification": {
        "verified": true,
        "reason": "valid",
        "signature": "-----BEGIN PGP SIGNATURE-----\n\niQIzBAABCgAdFiEE191csiqpm8f5Ln9WvgmFNJ1E3QAFAl0j6CUACgkQvgmFNJ1E\n3QDm/w//XHp1KdZjlAlEdVyBDB14dU5NoBSjFGlikPhN59m2iZVrUSI3lR6nK1vj\ndTS/mf7hq1Id6cET9mpZuIEYWs6hQQVvfvR4sbU66zdPhh6DTZT6RYL+YcQAluek\nTazhfjO3lm0KxLGm47pGIZ6PD96CdRDK7D+FT/ncDnNzTUVPCWuTamQToHdqZPE8\ntsoylZrCcOWf+ArfmbCqut4+RkiC4ob4oGGti6bruJe0yi0xOENfVd48r6JUD7FL\nrVdXm5tXa7yXGmbOQQW8PO7JnoTlOkZJobBKGbmkMkWhgw1XI1aqi4Vz4ULOEUgW\nop58V+UMV+wPZ1s9WwXEyh4q2pSTrOe9Ls7bSuEckLOblHY5V11g4PrUmzv1exLl\nAeMQZEFyOqMmF2Dy35RDyW2zjcyl4h4KSCtaw6K4bxO6yQZonspCN7ZeFdiPlwp3\nUwpLX0CuUnx5YE/b3bG5JaL5LfFiVuVuxSqkDmJHKW7YR24gMLbv6+uyrDvY9IPW\n9ETiN9EmJvZk6qX6DUVEYYPyvnQatkUu7c0uHX5Vtd1Y9QMky2YITCjBNazgL1Oo\npJkENI7pUy8sKGMhBHEe/lr9RGunHoTIynsZzxYmkDnl+eYcsudd7IQoG3X28z9h\n5aPbelzesXO29R060IZEJ7BmmiUWx91a4LcLumHjijjrU6syS5k=\n=9Ezd\n-----END PGP SIGNATURE-----",
        "payload": "tree 036d57eea16c75c71e3ad349b369d106bc20f82f\nparent e944fe843651b3044e5387c69b28b28f4999e9ea\nauthor Helmut K. C. Tessarek <tessarek@evermeet.cx> 1562634163 -0400\ncommitter Helmut K. C. Tessarek <tessarek@evermeet.cx> 1562634163 -0400\n\nclarify filter usage\n\nThe current paragraph is not complete, since a digit is not a special character.\n\nChanging it to:\n\n    If the key contains special characters or starts with a digit,\n    you need to surround it with double quotes like this:\n    `.\"foo$\"`, or else `.[\"foo$\"]`.\n"
      }
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/8d9817d2f7349b6db758783ace4c0c644d5dd7c0",
    "html_url": "https://github.com/stedolan/jq/commit/8d9817d2f7349b6db758783ace4c0c644d5dd7c0",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/8d9817d2f7349b6db758783ace4c0c644d5dd7c0/comments",
    "author": {
      "login": "tessus",
      "id": 223439,
      "node_id": "MDQ6VXNlcjIyMzQzOQ==",
      "avatar_url": "https://avatars3.githubusercontent.com/u/223439?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/tessus",
      "html_url": "https://github.com/tessus",
      "followers_url": "https://api.github.com/users/tessus/followers",
      "following_url": "https://api.github.com/users/tessus/following{/other_user}",
      "gists_url": "https://api.github.com/users/tessus/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/tessus/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/tessus/subscriptions",
      "organizations_url": "https://api.github.com/users/tessus/orgs",
      "repos_url": "https://api.github.com/users/tessus/repos",
      "events_url": "https://api.github.com/users/tessus/events{/privacy}",
      "received_events_url": "https://api.github.com/users/tessus/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "tessus",
      "id": 223439,
      "node_id": "MDQ6VXNlcjIyMzQzOQ==",
      "avatar_url": "https://avatars3.githubusercontent.com/u/223439?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/tessus",
      "html_url": "https://github.com/tessus",
      "followers_url": "https://api.github.com/users/tessus/followers",
      "following_url": "https://api.github.com/users/tessus/following{/other_user}",
      "gists_url": "https://api.github.com/users/tessus/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/tessus/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/tessus/subscriptions",
      "organizations_url": "https://api.github.com/users/tessus/orgs",
      "repos_url": "https://api.github.com/users/tessus/repos",
      "events_url": "https://api.github.com/users/tessus/events{/privacy}",
      "received_events_url": "https://api.github.com/users/tessus/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "e944fe843651b3044e5387c69b28b28f4999e9ea",
        "url": "https://api.github.com/repos/stedolan/jq/commits/e944fe843651b3044e5387c69b28b28f4999e9ea",
        "html_url": "https://github.com/stedolan/jq/commit/e944fe843651b3044e5387c69b28b28f4999e9ea"
      }
    ]
  },
  {
    "sha": "e944fe843651b3044e5387c69b28b28f4999e9ea",
    "node_id": "MDY6Q29tbWl0NTEwMTE0MTplOTQ0ZmU4NDM2NTFiMzA0NGU1Mzg3YzY5YjI4YjI4ZjQ5OTllOWVh",
    "commit": {
      "author": {
        "name": "Ricardo Constantino",
        "email": "wiiaboo@gmail.com",
        "date": "2019-05-29T19:36:18Z"
      },
      "committer": {
        "name": "Nico Williams",
        "email": "nico@cryptonector.com",
        "date": "2019-06-11T16:57:02Z"
      },
      "message": "Makefile.am: fix builtin.inc with out-of-root builds",
      "tree": {
        "sha": "b01b1c7994f97b782a75f552fd6226de3a3d201f",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/b01b1c7994f97b782a75f552fd6226de3a3d201f"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/e944fe843651b3044e5387c69b28b28f4999e9ea",
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/e944fe843651b3044e5387c69b28b28f4999e9ea",
    "html_url": "https://github.com/stedolan/jq/commit/e944fe843651b3044e5387c69b28b28f4999e9ea",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/e944fe843651b3044e5387c69b28b28f4999e9ea/comments",
    "author": {
      "login": "wiiaboo",
      "id": 111605,
      "node_id": "MDQ6VXNlcjExMTYwNQ==",
      "avatar_url": "https://avatars2.githubusercontent.com/u/111605?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/wiiaboo",
      "html_url": "https://github.com/wiiaboo",
      "followers_url": "https://api.github.com/users/wiiaboo/followers",
      "following_url": "https://api.github.com/users/wiiaboo/following{/other_user}",
      "gists_url": "https://api.github.com/users/wiiaboo/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/wiiaboo/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/wiiaboo/subscriptions",
      "organizations_url": "https://api.github.com/users/wiiaboo/orgs",
      "repos_url": "https://api.github.com/users/wiiaboo/repos",
      "events_url": "https://api.github.com/users/wiiaboo/events{/privacy}",
      "received_events_url": "https://api.github.com/users/wiiaboo/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "nicowilliams",
      "id": 604851,
      "node_id": "MDQ6VXNlcjYwNDg1MQ==",
      "avatar_url": "https://avatars2.githubusercontent.com/u/604851?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/nicowilliams",
      "html_url": "https://github.com/nicowilliams",
      "followers_url": "https://api.github.com/users/nicowilliams/followers",
      "following_url": "https://api.github.com/users/nicowilliams/following{/other_user}",
      "gists_url": "https://api.github.com/users/nicowilliams/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/nicowilliams/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/nicowilliams/subscriptions",
      "organizations_url": "https://api.github.com/users/nicowilliams/orgs",
      "repos_url": "https://api.github.com/users/nicowilliams/repos",
      "events_url": "https://api.github.com/users/nicowilliams/events{/privacy}",
      "received_events_url": "https://api.github.com/users/nicowilliams/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "ad9fc9f559e78a764aac20f669f23cdd020cd943",
        "url": "https://api.github.com/repos/stedolan/jq/commits/ad9fc9f559e78a764aac20f669f23cdd020cd943",
        "html_url": "https://github.com/stedolan/jq/commit/ad9fc9f559e78a764aac20f669f23cdd020cd943"
      }
    ]
  }
]

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { id: 1, name: "stream1", output: defaultInput, ref: React.createRef(), children: new Set() },
        { id: 2, name: "stream2", ref: React.createRef(), children: new Set() },
        { id: 3, name: "stream3", ref: React.createRef(), children: new Set() },
        { id: 4, name: "stream4", ref: React.createRef(), children: new Set() },
      ],
      context: {}
    }
  }

  handleColOutputChange = (colId, output, deps) => {
    let updatedCol = this.state.columns.find(c => c.id === colId)
    this.setState(state => {
      let columns = state.columns.map ((c) => {
        if (c === updatedCol) {
          // this is the column that got updated;
          // update output and dependencies
          return { ...c, output: output, deps: deps }
        } else if (deps.includes(c.name)) { 
          // this column should now have the updated column
          // as a child to update when it updates
          return { ...c, children: c.children.add(updatedCol.id) }
        } else {
          return c
        }
      })

      let context = {}
      columns.forEach(c => {
        context[c.name] = c.output  
      })

      return {
        columns: columns,
        context: context
      }
    },
    () => {
      // update the context on this cell itself (but don't re-evaluate!)
      updatedCol.ref.current.manualUpdate(this.state.context, false)

      // update context on child cells, and propagate changes forward
      this.state.columns.filter(c => updatedCol.children.has(c.id)).forEach(c => {
        c.ref.current && c.ref.current.manualUpdate(this.state.context, true)
      })
    }
    )


  }

  handleColNameChange = (colId, name) => {
    this.setState(state => {
      let columns = state.columns.map ((c) => {
        if (c.id === colId) {
          return { ...c, name: name }
        } else { return c; }
      })

      let context = {}
      columns.forEach(c => {
        context[c.name] = c.output  
      })

      console.log("columns", columns, "context", context)

      return {
        columns: columns,
        context: context
      }
    })
  }

  render() {
    let dataColumns = this.state.columns.map((c) => {
      return <div className="data-column">
        <input value={c.name} onChange={(e) => this.handleColNameChange(c.id, e.target.value)}/>
        <DataColumn
        key={c.id}
        colId={c.id}
        handleColOutputChange={this.handleColOutputChange}
        ref={c.ref}
        />
      </div>
    })

    return (
      <div>
        <div className="app">
          {dataColumns}
        </div>
      </div>
    );
  }
}

export default App;
