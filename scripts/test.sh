#!/bin/bash
set -e

components="server client"

for component in $components
do
    echo "Testing: $component"
    cd $component
    yarn test
    cd ..
done
