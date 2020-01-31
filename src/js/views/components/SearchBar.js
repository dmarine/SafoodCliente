import { Search } from "../page/Search.js"

function search() {
    $("#search").on("keyup", function() {
        window.location = `${location.origin}${location.pathname}#/search`
        Promise.all([Search.render($("#search").val()), Search.renderMenu()]).then(values => {
            let view = values[0]
            let menu = values[1]
    
            $('.body__content').html(view)
            $('.menu-vertical').html(menu)
        })
        Search.after_render()
    })
}

export { search }