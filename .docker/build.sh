cd $(dirname "${BASH_SOURCE}")
set -a #ensure the next variable set are exported for our use
[[ -f "./.env" ]] && source ./.env

IMG=vitereact
TAG=v1

cd ..

docker build \
    -f .docker/Dockerfile.app.yml \
    --build-arg API_HOST=https://api.whatever.com \
    --tag ${IMG} \
    --tag ${IMG}:${TAG} \
    --progress=plain \
    .