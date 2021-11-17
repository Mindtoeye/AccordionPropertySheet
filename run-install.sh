#!/bin/bash

clear

which curl &> /dev/null

if [[ $? = 0 ]]; then
  curl https://knossys.com/banner.txt
fi

npm install
npm list -depth 10 > ./deptree.txt
