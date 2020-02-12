function toast(text, type) {
    let toast_id = 0
    if($('.toast').length) { toast_id = parseInt($('.toast').last().attr('id').match(/(\d+)/g)[0]) + 1 }
    if(!$('.l-toast').length) { $('.app').append(`<div class="l-toast"></div>`) }
    $('.l-toast').append(`<div class="toast is-closable ${(type == "error") ? 'toast--error' : 'toast--success' }" id="toast-${ toast_id }">
                        <i class="toast__icon ${(type == "error") ? 'toast__icon--error' : 'toast__icon--success' } fas fa-info-circle"></i>
                        <p class="toast__content ${(type == "error") ? 'toast__content--error' : 'toast__content--success' }">${text}</p>
                        <i class="toast__close fas fa-times"></i>
                      </div>`)

    $('.toast__close').on('click', function() {
        $(this).parent().remove()
    })

    setTimeout(function() {
        $(`#toast-${ toast_id }`).remove()
    }, 3000);
}

export { toast }