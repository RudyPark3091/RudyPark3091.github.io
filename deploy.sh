#!/bin/sh

tput smcup
echo "\033[0;0;H"

distRootDir="test"
rm -rf $distRootDir

echo "\033[31m> Building Application...\033[0m"

go run build.go $distRootDir

# echo "\033[31m> Connecting Github...\033[0m"
# git add --all
# git commit -m "Deploy - ${1}"
# echo "\033[31m> Pushing remote...\033[0m"
# git push origin master

echo "\033[31m> Finished!\033[0m"
echo "\033[31m> Terminating...\033[0m"
sleep 1

tput rmcup
