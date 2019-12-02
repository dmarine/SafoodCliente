rm dist/*
cp src/*.html dist/
node-sass --include-path scss src/main.scss  dist/main.css
tsc --out dist/index.js src/index.ts