#!/bin/bash  
dirName=${PWD##*/}
cd ../../apps
if [ ! -d "$dirName" ]; then
  sudo mkdir $dirName
  echo "Created App dir"
fi
cd $dirName
if [ ! -d ".git" ]; then
  sudo git init
  sudo git remote add origin https://github.com/adeavoice/$dirName
  echo "Finished initialization git and origin in Test folder"
fi
sudo git pull origin master
echo "Finished git pull"
