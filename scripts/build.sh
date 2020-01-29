if [ ! -d "dist" ]; then
    mkdir dist
else 
    rm -R dist
    mkdir dist
fi

cp src/*.html dist/
cp -r src/images dist/
cp -r src/js dist/
node-sass --include-path scss src/sass/main.scss dist/css/app.css
cp -r src/css/segoe dist/css/segoe
