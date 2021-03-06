#!/bin/sh

# abort on error
set -e

tput smcup
clear
echo "\033[0;0;H"

distRootDir="blog"

cd ~/github/RudyPark3091.github.io/
echo "\033[31m> Removing existing files...\033[0m"
rm -rf $distRootDir

echo "\033[31m> Building Application...\033[0m"
go run build.go $distRootDir

while getopts "m:" opt
do
  case $opt in
    m)
      echo "\033[31m> Connecting Github...\033[0m"
      git add --all
      git restore --staged serve.sh
      git commit -m "Deploy - $OPTARG"
      echo "\033[31m> Pushing remote...\033[0m"
      git push origin master ;;
    ?)
      echo "\033[31m> Your deployment was not pushed to remote repository"
      sleep 0.5 ;;
  esac
done

echo "\033[31m> Deployment complete!\033[0m"
echo "\033[31m> Terminating...\033[0m"
sleep 0.5

tput rmcup
