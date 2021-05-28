#/usr/bin/env/bash
set -e

components="server client"

for component in $components
do
    printf "\n\nInstalling dependencies: $component\n"
    cd $component
    npm install
    cd ..
done

cp client/node_modules/jose/package.json client/node_modules/jose/package.json.old
cp -r client/node_modules/jose/dist/browser/* client/node_modules/jose
cp -f client/node_modules/jose/package.json.old client/node_modules/jose/package.json

