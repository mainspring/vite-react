# react clean

find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
find . -name "dist" -type d -prune -exec rm -rf '{}' +
find . -name "dev-dist" -type d -prune -exec rm -rf '{}' +
find . -name "tsconfig.tsbuildinfo" -type d -prune -exec rm -rf '{}' +
