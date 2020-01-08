if [ ! -d "/c/xampp/htdocs/SafoodCliente" ]; then
    mkdir /c/xampp/htdocs/SafoodCliente
else 
    rm -R /c/xampp/htdocs/SafoodCliente
    mkdir /c/xampp/htdocs/SafoodCliente
fi

cp -r dist/* /c/xampp/htdocs/SafoodCliente