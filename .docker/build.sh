cd $(dirname "${BASH_SOURCE}")
set -a #ensure the next variable set are exported for our use
[[ -f "./.env" ]] && source ./.env

IMG=vitereact
TAG=v1

cd ..

docker build \
    -f .docker/Dockerfile.app.yml \
    --build-arg HTTP=https \
    --build-arg API_HOST=api.whatever.com \
    --tag ${IMG} \
    --tag ${IMG}:${TAG} \
    .