if [ ! -d "dist" ]; then
    mkdir dist
else
    rm -R dist
    mkdir dist
fi
if [ ! -d "dist/css/segoe" ]; then
    mkdir dist/css
    mkdir dist/css/segoe

else
    rm -R dist/css/segoe
    mkdir dist/css/segoe
fi
cp src/*.html dist/
cp -r src/images dist/
cp -r src/js dist/
cp -r src/css/segoe dist/css/segoe/
node-sass --include-path scss src/sass/main.scss dist/css/app.css