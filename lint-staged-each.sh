#!/bin/bash

# lint-staged-each.sh
#   execute each lint-staged entry in sub-directories projects recursively
#
#   Riakuto! Project by Klemiwary Books

fileTypes="js|jsx|ts|tsx|html|json|css|sass|scss|less|gql|graphql"
target="src|public"

# detect git against tag
if git rev-parse --verify HEAD >/dev/null 2>&1
then
  against=HEAD
else
  # Initial commit: diff against an empty tree object
  against=$(git hash-object -t tree /dev/null)
fi

# detect staged projects
stagedProjects=$( \
  git diff --cached --name-only --diff-filter=AM $against | \
  grep -E ".*($target)\/" | \
  grep -E "^.*\/.*\.($fileTypes)$" | \
  grep -vE "(package|tsconfig).*\.json" | \
  sed -r "s/($target)\/.*$//g" | \
  uniq \
)

# execute each lint-staged
rootDir=$(pwd | sed -r "s/\/\.git\/hooks//")

for project in ${stagedProjects[@]}; do
  echo "Executing $project lint-staged entry..."
  cd "$rootDir/$project"
  npx lint-staged 2> lint_error.log
done
