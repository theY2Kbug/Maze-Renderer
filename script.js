window.onload = function () {

    const toggle_button = document.getElementsByClassName('toggle-button')[0];
    const links = document.getElementsByClassName('links')[0];
    const cross = document.getElementsByClassName('cross')[0];
    toggle_button.addEventListener('click',()=> {
        links.classList.toggle('active');
        cross.classList.toggle('active');
        toggle_button.classList.toggle('active');
    })

    cross.addEventListener('click',()=> {
        links.classList.toggle('active');
        cross.classList.toggle('active');
        toggle_button.classList.toggle('active');
    })

    const closeModalButton = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')

    
    overlay.addEventListener('click', ()=> {
        const modals = document.querySelectorAll('.modal')
        // console.log(modals)
        modals.forEach(modal => {
            closeModal(modal)
        })
    })

    window.addEventListener('keydown', (e)=> {
        if(e.code == 'Escape'){
            const modals = document.querySelectorAll('.modal')
            console.log(e.code)
            modals.forEach(modal => {
                closeModal(modal)
            })
        }
    })

    closeModalButton.forEach(button => {
        button.addEventListener('click',()=> {
            const modal = button.closest('.modal')
            closeModal(modal)
        })
    })

    function closeModal(modal){
        if(modal == null) return
        modal.classList.add('active')
        overlay.classList.remove('active')
    }

    function openInNewTab(url) {
        window.open(url, '_blank').focus();
    }
}

