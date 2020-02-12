if [ ! -d "dist" ]; then
    mkdir dist
else 
    rm -R dist
    mkdir dist
fi

cp ./src/*.html ./dist
cp -r ./src/images ./dist
cp -r ./src/js ./dist
node-sass --include-path scss src/sass/main.scss ./dist/css/app.css
cp -r ./src/css/segoe ./dist/css/segoe

mkdir ./dist/js/vendor
cp ./node_modules/jquery/dist/jquery.min.js ./dist/js/vendor
cp ./node_modules/jquery-serializejson/jquery.serializejson.min.js ./dist/js/vendor
cp ./node_modules/js-cookie/src/js.cookie.js ./dist/js/vendor