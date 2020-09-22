$(document).ready(_ => {
    $(".loader").hide(); 
    /*===================================================
        OLW
    ===================================================*/
    $('.owl-carousel').owlCarousel({  
        loop:false,
        margin:10,
        nav:false,
        smartSpeed: 250,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })

    /*===================================================
       Menu mobile 
    ===================================================*/
    function mudarIconeMenu() {
        let menu = $('.navbar-toggler'),
            abrir = 'fa-bars',
            exit = 'fa-times'
        if($(menu).hasClass(abrir)) {
            menu.removeClass(abrir).addClass(exit)
        } else {
            menu.removeClass(exit).addClass(abrir)
        }
    }

    function fecharMenu() {
        let menu = $('.navbar-toggler'),
            abrir = 'fa-bars',
            exit = 'fa-times'
        if($(menu).hasClass(exit)) {
            menu.removeClass(exit).addClass(abrir)
            $('.navbar-collapse').collapse('hide')
        } 
    }
    
    $('.navbar-toggler').on('click', e => {
        mudarIconeMenu()
    })

    /*===================================================
       Vizualizar imagem destaque
    ===================================================*/
    $('#destaques .btn').on('click', e => {
        e.preventDefault()

        let url = $(e.target).closest('.item').find('img').attr('src')
        $('#visualizar-imagem img').attr('src', url)

        $('#visualizar-imagem').addClass('ativo')
        setTimeout(() => {
            $('#visualizar-imagem .imagem').addClass('foto-start')   
        }, 100);

        $('html, body').css('overflow-y', 'hidden')

    })

    function fecharImagem(e) {
        e.preventDefault()
        
        $('#visualizar-imagem .imagem').removeClass('foto-start') 
        setTimeout(() => {
            $('#visualizar-imagem').removeClass('ativo')   
        }, 300);
        
        $('html, body').css('overflow-y', 'auto')
    }

    $('#visualizar-imagem .btn').on('click', e => {
        fecharImagem(e)
    })
    $('#visualizar-imagem .fundo-preto').on('click', e => {
        fecharImagem(e)
    })

     /*===================================================
        Menu animado
    ===================================================*/
    const topoMenu = $('#topo-menu .nav-link'),
          classMenuAtivo = ('ativo'),
          footerMenu = $('.menu-footer a')

    function selecionarMenu(menu) {
        let id = $(menu).attr('href'),
            body = $('html, body'),
            alturaTop = $(id).offset().top - 57,
            alturaScroll = $(document).scrollTop(),
            margemAnime = 0

        if(alturaScroll > alturaTop) {
            margemAnime = alturaTop -50
        } else {
            margemAnime = alturaTop +50
        }
        body.animate({ scrollTop: margemAnime }, 600)
        body.animate({ scrollTop: alturaTop }, 300)
    }
    function ativarMenu (menu) {
        topoMenu.removeClass(classMenuAtivo)          
        
        let idMenu = `#${menu}`

        topoMenu.each((e, value) => {
            let allId = $(value).attr('href')

            if(idMenu === allId) {
                $(value).addClass(classMenuAtivo)
            }
        })       
    }
    footerMenu.on('click', e => {
        e.preventDefault()

        selecionarMenu(e.target)
    })

    topoMenu.on('click', (e) => {
        e.preventDefault()

        selecionarMenu(e.target)
        
        fecharMenu()
    })

    /*===================================================
        Anime na pagina
    ===================================================*/
    const target = $('.anime'),
          animeClass = 'anime-start'
          
    function animeScroll() {
        let documentTop = $(document).scrollTop(),
            offset = $(window).height()

        target.each(function() {
            let itemTop = $(this).offset().top
           
            if(documentTop > itemTop - offset * 3/4) {
                $(this).addClass(animeClass)
            } else {
                $(this).removeClass(animeClass)
            }

            //Ativando menu 
            if(documentTop > itemTop - offset * 1.5/4) {
                let idMenu = $(this).attr('id')

                ativarMenu(idMenu)
            } 
        })

        

        // Fixando menu 
        let menu = $('#topo-menu'),
            topoH = $('#topo').height(),
            menuH = menu.height()
        
        if(documentTop >= topoH ) {
            menu.addClass('menu-fixo')
        } else if(documentTop < topoH - menuH){
            menu.removeClass('menu-fixo')
        }
    }

    animeScroll()
    $(window).resize(_ => {
        animeScroll()
    })
    $(document).scroll(_ => {
        animeScroll()
        fecharMenu()
    })

    /*===================================================
        Cardápio
    ===================================================*/
    const cardapio = $('.cardapio-container'),
          menuItem = $('.menu-item'),
          menuClass = 'menu-ativo',
          cardapioContainer = $('.cardapio-container')

    function cardapioClick (e) {        
        let menu = $(e),
            id = $(e).attr('href')
        menuItem.removeClass(menuClass)

        menu.addClass(menuClass)

        cardapioContainer.slideUp(300)

        setTimeout(_ => {
            $(id).slideDown(300)
        }, 300)
    }

    menuItem.on('click', (e) => {   
        e.preventDefault()   
        cardapioClick(e.target)        
    })

    menuItem.each((e, value) => {
        if(e === 0) {
            cardapioClick(value)
        }
    })

   

})