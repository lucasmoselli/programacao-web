/* caixinha de login */

var button = document.querySelector('button'),
    dialog1 = document.querySelector('.dialog1')
button.addEventListener("click", function () {
    if (dialog1.className === 'dialog1 show')
        dialog1.className = 'dialog1';
    else
        dialog1.className ="dialog1 show"
})

/*login */
document.getElementById('login_button').addEventListener('click', function () {
    var login = document.getElementById('login_input'),
        senha = document.getElementById('senha_input'),
        error = document.getElementById('error')
    
    error.innerHTML = '';
    if (login.value.length >= 3 && senha.value.length >= 3) {
        axios.post('https://reqres.in/api/login', {email: login.value, password: senha.value})
            .then((Response) => {
            console.log(Response)
            localStorage.setItem("Login", login);
            localStorage.setItem("Token", Response.data.token);
            location.reload();
        }, (error) => {
            console.log(error);
            error.innerHTML = 'Usuário não encontrado.';
        });
        login.value="";
        senha.value="";

    } else {
        error.innerHTML= 'Os campos devem conter ao menos 3 caracteres.'
    }
});

/*procurar anime */
var container = document.getElementById('lista_de_anime')
document.getElementById('pesquisar_anime').addEventListener('click', function () {
    var query = document.getElementById('anime_input').value;
    axios.get('https://api.jikan.moe/v3/search/anime?q=' + query)
    .then(function (res) {
        console.log(res)
        var results = res.data.results;
        for (var i = 0; i < results.length && i < 10; i++) {
            var li= document.createElement('li');
                img = document.createElement('img');
                ref = document.createElement('a');
            img.src = results[i].image_url;
            li.innerHTML = results[i].title;
            ref.href = results[i].url;
            li.appendChild(ref);
            ref.appendChild(img);
            container.appendChild(li);
        }
   })
})
