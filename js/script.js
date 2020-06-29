// Bloco que envolve o SLIDER ----------------------------------------------------------------------------------------------------------------

$(document).ready(function(){    
    
    let speed = 5000,
        run = setInterval(rotate, speed),
        item_width = $('#itens-carousel li').outerWidth(),
        left_value = item_width * (-1);

    $('#itens-carousel li:first').before($('#itens-carousel li:last'));

    $('#itens-carousel ul').css({'left' : left_value});

    function resetRun(){
        clearInterval(run);
        run = setInterval(rotate, speed);
    }

    $('.prev').click(function(){
        let left_intend = parseInt($('#itens-carousel ul').css('left')) + item_width;

        $('#itens-carousel ul').animate({
            'left': left_intend
        }, 600, function(){
            $('#itens-carousel li:first').before($('#itens-carousel li:last'));

            $('#itens-carousel ul').css({'left' : left_value});
        });

        resetRun();
    });

    $('.next').click(function(){
        let left_intend = parseInt($('#itens-carousel ul').css('left')) - item_width;

        $('#itens-carousel ul').animate({
            'left': left_intend
        }, 600, function(){
            $('#itens-carousel li:last').after($('#itens-carousel li:first'));

            $('#itens-carousel ul').css({'left' : left_value});
        });

        resetRun();
    });

    $('#itens-carousel').hover(
        function(){
            clearInterval(run);
        },
        function(){             
            run = setInterval(rotate, speed)
        }
    );

    function rotate(){
        $('.next').click();
    }
});

// Fim do bloco que envolve o SLIDER ---------------------------------------------------------------------------------------------------------

// Bloco responsável por mostrar e fechar a pizza clicada ------------------------------------------------------------------------------------

function mostrar(sabor){
    let mostraImg = document.querySelector('div#foto_pizza') // seleciona a div 'foto_pizza' na variável mostraImg ---------------------------
    let descricao = document.querySelector('div#descricao_pizza')
    let img = document.querySelector('img#img_pizza')

    if($('.janela_menu').hasClass('animar-menu'))
        $('.janela_menu').removeClass('animar-menu');

    $('.mostra-pizza').addClass('anima-mostra-pizza');
    
    if(sabor == 'portuguesa'){      
        img.setAttribute('src', 'img/pizzaSalgada.jpg')
        descricao.innerHTML = '<strong><u>PORTUGUESA</u></strong><br><br>Molho, mussarela, presunto, cebola, ovos, azeitona e orégano<br><br><u><strong>R$35,00</strong></u>'
    }else if(sabor == 'francesa'){
        img.setAttribute('src', 'img/pizzaSalgada.jpg')
        descricao.innerHTML = '<strong><u>FRANCESA</u></strong><br><br>Molho, mussarela, cebola, tomate, palmito, bacon, azeitona e uma camada extra de mussarela<br><br><u><strong>R$37,00</strong></u>'
    }else if(sabor == 'calabresa'){
        img.setAttribute('src', 'img/pizzaSalgada.jpg')
        descricao.innerHTML = '<strong><u>CALABRESA</u></strong><br><br>Molho, mussarela, calabresa e orégano<br><br><u><strong>R$28,00</strong></u>'
    }else if(sabor == 'escarola'){
        img.setAttribute('src', 'img/pizzaSalgada.jpg')
        descricao.innerHTML = '<strong><u>ESCAROLA</u></strong><br><br>Molho, mussarela, escarola, alho, bacon e orégano<br><br><u><strong>R$32,00</strong></u>'
    }else if(sabor == 'chocolate'){
        img.setAttribute('src', 'img/pizzaDoce.jpg')
        descricao.innerHTML = '<strong><u>CHOCOLATE</u></strong><br><br>Leite condensado, mussarela e chocolate ao leite<br><br><u><strong>R$25,00</strong></u>'
    }else if(sabor == 'beijinho'){
        img.setAttribute('src', 'img/pizzaDoce.jpg')
        descricao.innerHTML = '<strong><u>BEIJINHO</u></strong><br><br>Leite condensado, mussarela, chocolate branco e côco<br><br><u><strong>R$26,00</strong></u>'
    }else if(sabor == 'cocada'){
        img.setAttribute('src', 'img/pizzaDoce.jpg')
        descricao.innerHTML = '<strong><u>COCADA</u></strong><br><br>Leite condensado, mussarela e cocada cremosa<br><br><u><strong>R$24,00</strong></u>'
    }else {
        img.setAttribute('src', 'img/pizzaDoce.jpg')
        descricao.innerHTML = '<strong><u>SENSAÇÃO</u></strong><br><br>Leite condensado, mussarela, morango e chocolate<br><br><u><strong>R$28,00</strong></u>'
    }

    mostraImg.appendChild(img)
}

function fechar(){
    $('.mostra-pizza').removeClass('anima-mostra-pizza');
} // Fecha a section 'mostrar_pizza' --------------------------------------------------------------------------------------------------------

$('.mostra-pizza').click(function (event) {
    if(event.target.id == 'mostra-pizza'){
        $('.mostra-pizza').removeClass('anima-mostra-pizza');
    }
}); // Fecha a section "mostrar_pizza" se clicar fora do conteúdo ---------------------------------------------------------------------------

// Fim do bloco responsável por mostrar e fechar a pizza clicada ----------------------------------------------------------------------------

// Bloco responsável pelo menu --------------------------------------------------------------------------------------------------------------

$('.icone_menu').click(function(){
    let $targetJanela = $('.janela_menu'),
        animarMenu = 'animar-menu';

    if($targetJanela.hasClass(animarMenu))
        $targetJanela.removeClass(animarMenu)
    else
        $targetJanela.addClass(animarMenu)
}); // Abre ou fecha o menu -----------------------------------------------------------------------------------------------------------------

// Bloco responsável pelo scroll da página ao clicar em algum item do menu ------------------------------------------------------------------

let menuItems = document.querySelectorAll('.menu a[href^="#"]'); // Seleciona todos os links do menu com o "href = #"

menuItems.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick);
}) // Verifica se o item foi clicado

function getScrollTopByHref(element) {
    let id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
}

function scrollToPosition(to){
    window.scroll({
        top: to,
        behavior: "smooth"
    })
    $('.janela_menu').removeClass('animar-menu');
}

function scrollToIdOnClick(event){    
    event.preventDefault();
    let headerHeight = $('#header').height();    
    let to = getScrollTopByHref(event.target) - headerHeight;

    scrollToPosition(to);
}

// Fim do bloco responsável pelo menu -------------------------------------------------------------------------------------------------------

// Bloco responsável pelas animações da página durante o scroll -----------------------------------------------------------------------------

(function(){
    let $targetEsq = $('.anime-esq'),
        animationClassEsq = 'anime-esq-start',
        offset = $(window).height() * (3/4); // Atribui o valor de três quartos da altura da janela a variável, ou seja, nesse caso é para que não deixe mais que três quartos da janela em branco.

    function animeScroll(){
        let documentTop = $(document).scrollTop(); // Pega o valor em pixels de onde o topo do scroll está ----------------------------------
        let pizzasTop = $targetEsq.offset().top; // Pega o valor em pixels de onde o topo do objeto está ------------------------------------
        let bebidasTop = $('.bebidas').offset().top;
        let botTop = $('#bot').offset().top;

        if (documentTop < pizzasTop) {
            $('#container-hm').css({'position': 'relative'});
        }

        if(documentTop > 0)
            $('#container-hm').css({'position': 'fixed'});

        if(documentTop > pizzasTop - offset){
            $targetEsq.addClass(animationClassEsq);
            $('.titulo, .borda_recheada, #cardapio, .pizza').addClass(animationClassEsq);
        }else {
            $targetEsq.removeClass(animationClassEsq);
            $('.titulo, .borda_recheada, #cardapio, .pizza').removeClass(animationClassEsq);
        }

        if(documentTop > bebidasTop - offset){
            $('.bebidas, #bebida, #outras').addClass(animationClassEsq);
        } else {
            $('.bebidas, #bebida, #outras').removeClass(animationClassEsq);
        }

        if(documentTop > botTop - offset){
            $('#pedido').addClass(animationClassEsq);
            $('#sobre').addClass(animationClassEsq);
        }
        else {
            $('#pedido').removeClass(animationClassEsq);
            $('#sobre').removeClass(animationClassEsq);
        }
    }

    animeScroll()

    $(document).scroll(function(){
        animeScroll();
    }) // Aqui chama a função animeScroll() toda vez que o scroll for utilizado -------------------------------------------------------------
}()); // Esta função é executada mesmo sem ser chamada --------------------------------------------------------------------------------------

// Fim do bloco responsável pelas animações da página durante o scroll ----------------------------------------------------------------------