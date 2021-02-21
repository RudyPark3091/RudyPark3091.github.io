#!/bin/sh

# abort on error
set -e

tput smcup
clear
echo "\033[0;0;H"

distRootDir="test"

echo "\033[31m> Removing existing files...\033[0m"
rm -rf $distRootDir

echo "\033[31m> Building Application...\033[0m"
go run build.go $distRootDir

# echo "\033[31m> Connecting Github...\033[0m"
# git add --all
# git restore --staged serve.sh
# git commit -m "Deploy - ${1}"
# echo "\033[31m> Pushing remote...\033[0m"
# git push origin master

echo "\033[31m> Deployment complete!\033[0m"
echo "\033[31m> Terminating...\033[0m"
sleep 5

tput rmcup
