import axios from "axios";
import qs from "query-string";

//função que vai redirecionar o usuário para o github
function redirectToGitHub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize'; //site para onde precisa ser redirecionado
    const params = {
        response_type : 'code',
        scope: 'user', //tipo de informações que vai se obter do usuário
        client_id: process.env.CLIENT_ID, //id da aplicação do cliente que vai utilizar a autentitação com o github
        redirect_uri: process.env.REDIRECT_URL
    }
    const queryStrings = qs.stringify(params);//utilizando a biblioteca query-string, é utilizado a função stringify para criar os parametreos da aplicação 
    const authURL = `${GITHUB_URL}?${queryStrings}`;//mudar a pessoa para a página
    window.location.href = authURL;//redirecionar o usuário para a página
}
window.onload = async () => {
// quando a pessoa clicar no botão ela será direcionada para a página do github
    document.querySelector(".login").addEventListener("click", redirectToGitHub);
    const {code} = qs.parseUrl(window.location.href).query;
    if(code){ //se o codigo existir então é solicitado ao back-end a troca por um acess_token fixo
        try {
            const response = await axios.post(`${process.env.BACK_END_URL}/login`, { code })
            const user = response.data; //recebendo os dados do usuário através da variavel response os dados do usuário são acessador doback end usando .data
            console.log(user);//mostrar os dados do usuário
        }catch (error){
            alert("Opa, parece que houve algum erro");
            console.log("err", err);
        }
    }

}
