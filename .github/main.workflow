workflow "build and deploy" {
  on = "push"
  resolves = ["liuliangsir/periodic-table-of-the-html5-elements@master"]
}

action "npm prune" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "prune"
}

action "npm ci" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["npm prune"]
  args = "ci"
}

action "npm lint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["npm ci"]
  args = "lint"
}

action "npm build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["npm lint"]
  args = "build"
}

action "npm transfer" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["npm build"]
  args = "transfer"
}

action "liuliangsir/periodic-table-of-the-html5-elements@master" {
  uses = "liuliangsir/periodic-table-of-the-html5-elements@master"
  needs = ["npm transfer"]
  secrets = ["GITHUB_TOKEN"]
  env = {
    PUBLIC_PATH = "dist"
  }
}