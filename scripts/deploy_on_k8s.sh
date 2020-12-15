#!/bin/bash

if [ -z "${TAG}" ]; then
  echo "Variable \$TAG not set or empty. Skiping deploying new version on k8s"
  exit 0
fi
if ! [[ "${TAG}" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Variable \$TAG does not match with vx.y.z format. Skiping deploying new version on k8s"
  exit 0
fi

curl -L https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl -o /tmp/kubectl
chmod +x /tmp/kubectl

mkdir -p ~/.kube
cat<<EOF > ~/.kube/config
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${KUBE_CERTIFICATE_AUTHORITY_DATA}
    server: ${KUBE_SERVER}
  name: cluster
contexts:
- context:
    cluster: cluster
    namespace: ${KUBE_NAMESPACE}
    user: ${KUBE_USER}
  name: cluster
current-context: cluster
kind: Config
preferences: {}
users:
- name: ${KUBE_USER}
  user:
    client-key-data: ${KUBE_CLIENT_KEY_DATA}
    token: ${KUBE_TOKEN}
EOF

# Patch deployed versions in k8s cluster
/tmp/kubectl patch deployment -n pacific-ocean marketplace-client-commons -p\
 "{\"spec\":{\"template\":{\"spec\":{\"containers\":[{\"name\":\"nevermined-marketplace-client\",\"image\":\"neverminedio/marketplace_client:${TRAVIS_TAG}\"}]}}}}"

/tmp/kubectl patch deployment -n pacific-ocean marketplace-server-commons -p\
 "{\"spec\":{\"template\":{\"spec\":{\"containers\":[{\"name\":\"nevermined-marketplace-server\",\"image\":\"neverminedio/marketplace_server:${TRAVIS_TAG}\"}]}}}}"
