function toast(text) {
    $('body').append(`<div class="toast toast--success is-closable">
                        <i class="toast__icon fas fa-info-circle"></i>
                        <p class="toast__content">${text}</p>
                        <i class="toast__close fas fa-times"></i>
                    </div>`)

    $('.toast__close').on('click', function() {
        $('.toast').remove()
    })

    setInterval(function() {
        $('.toast').remove()
    }, 3000);
}

export { toast }