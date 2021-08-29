/* variaveis */
var entrarButton = document.querySelector('.entrar-button')
var cadastroButton = document.querySelector('.cadastro-button')
var formAnime = document.querySelector('.addAnime')
var header = document.querySelector('.header')
var button = document.querySelector('button')
var dialog1 = document.querySelector('.dialog1')
var dialog2 = document.querySelector('.dialog2')
var imagem1 = document.querySelector('.img1')
var imagem2 = document.querySelector('.img2')
var imagem3 = document.querySelector('.img3')
var imagem1Text = document.querySelector('.img1-text')
var imagem2Text = document.querySelector('.img2-text')
var imagem3Text = document.querySelector('.img3-text')
var novoTexto1 = document.querySelector('.rappi-qualidades1-text')
var novoTexto2 = document.querySelector('.rappi-qualidades2-text')
var novoTexto3 = document.querySelector('.rappi-qualidades3-text')

const ifUsuarioLogado = () => {
    if (localStorage.getItem("Token")) return true;
    return false;
};

/* caixinha de login */

if (ifUsuarioLogado() === false) {
    button.addEventListener("click", function () {
        if (dialog1.className === 'dialog1 show')
            dialog1.className = 'dialog1';
            
        else
            dialog1.className ="dialog1 show";

    })
}

/* caixinha de cadastro */
if (ifUsuarioLogado() === false){
    cadastroButton.addEventListener("click", function(){
        if(dialog2.className === 'dialog2 show')
            dialog2.className = 'dialog2'
        else
            dialog2.className = 'dialog2 show'
    })  
}

/* Cadastro */

document.getElementById('buttonCadastro').addEventListener('click', function () {
    var login = document.getElementById('cadastro-login')
        senha = document.getElementById('cadastro-senha')

    error2.innerHTML = '';

    if (login.value.length >= 3 && senha.value.length >= 3) {
        axios.post('http://localhost:3000/user/registrar', {email: login.value, password: senha.value})
        .then((Response) => {
            location.reload()
        }, (error2) => {
            error2.innerHTML = "Usuário já cadastrado"
        })
    } else {
        error2.innerHTML = "Os campos devem conter no minimo 3 caracteres"
    }
})
/*login */
document.getElementById('login_button').addEventListener('click', function () {
    var login = document.getElementById('login_input'),
        senha = document.getElementById('senha_input'),
        error = document.getElementById('error');
    
    error.innerHTML = '';
    if (login.value.length >= 3 && senha.value.length >= 3) {
        axios.post('http://localhost:3000/user/login', {email: login.value, password: senha.value})
            .then((Response) => {
            console.log(Response)
            localStorage.setItem("Token", Response.data.token);
            /*
            localStorage.setItem("Login", login.value);
            localStorage.setItem("Senha", senha);
            */
            location.reload();
        }, (error) => {
            console.log(error);
            error.innerHTML = 'Usuário não encontrado.';
        });
        login.value="";
        senha.value="";

    } else {
        error.innerHTML= 'Os campos devem conter ao menos 3 caracteres!!';
    }
});

/*procurar anime */
/*
document.getElementById('pesquisar_anime').addEventListener('click', function () {
    var container = document.getElementById('lista_de_anime')
    var query = document.getElementById('anime_input').value;
    axios.get('https://api.jikan.moe/v3/search/anime?q=' + query)
    .then(function (res) {
        var results = res.data.results;
        for (var i = 0; i < results.length && i < 10; i++) {
            var li= document.createElement('li');
                div = document.createElement('div')
                img = document.createElement('img');
                ref = document.createElement('a');
                
            img.src = results[i].image_url;
            div.innerHTML = results[i].title
            ref.href = results[i].url;
            li.appendChild(div)
            li.appendChild(ref);
            ref.appendChild(img);
            container.appendChild(li);
        }
   })
})
*/
document.getElementById('pesquisar_anime').addEventListener('click', function () {
    var container = document.getElementById('lista_de_anime')
    var query = document.getElementById('anime_input').value;
    axios.get('http://localhost:3000/anime/buscar' + query)
    .then(function (res) {
        var results = res.data.results;
        for (var i = 0; i < results.length && i < 10; i++) {
            var li= document.createElement('li');
                div = document.createElement('div')
                img = document.createElement('img');
                ref = document.createElement('a');
                
            img.src = results[i].image_url;
            div.innerHTML = results[i].title
            ref.href = results[i].url;
            li.appendChild(div)
            li.appendChild(ref);
            ref.appendChild(img);
            container.appendChild(li);
        }
   })
})

/* Add anime */

document.getElementById('buttonAnime').addEventListener('click', function () {
    var nomeAnime = document.getElementById('animeNome')
        imagemAnime = document.getElementById('animeImagem')

    axios.post('http://localhost:3000/anime/criar/', {title: nomeAnime.value, img: imagemAnime.value})
    location.reload()
})
 /* Logout */ 

if (ifUsuarioLogado() === true) {
    button.addEventListener('click', function () {
        localStorage.removeItem("Token");
        localStorage.removeItem("Login");
    
        entrarButton.innerHTML = "Entrar";
        cadastroButton.style.display = "flex";
        header.style.display = "none";


        location.reload();
    })
}


/* se o usuário estiver logado, fazer aparecer a pesquisa de anime */


if (ifUsuarioLogado() === true ) {

    
    entrarButton.innerHTML ="Logout";
    cadastroButton.style.display = "none";
    header.style.display = "block";
    formAnime.style.display = "block"
    imagem1.src = "https://i.pinimg.com/736x/1e/79/7a/1e797a74f2694fb573559db426aa4d78.jpg"
    imagem2.src = "https://ptanime.com/wp-content/uploads/2018/10/Roy-Mustang-FMA-anime-visual-destque-v1.jpg"
    imagem3.src = "https://thicc.mywaifulist.moe/waifus/16455/1f00d240901b02f561c04bef06695c6a46d7061372e37677281f2d17a4fdb1cd_thumb.jpeg"
    imagem1Text.innerHTML = "Romance"
    imagem2Text.innerHTML = "Shounen"
    imagem3Text.innerHTML = "Esporte"
    novoTexto1.innerHTML = "Procure qualquer anime a sua escolha!"
    novoTexto2.innerHTML = "Se você não lembra o nome, tente digitar!"
    novoTexto3.innerHTML = "A pesquisa trará resultados aproximados!"
} else {

    header.style.display = "none"

}

