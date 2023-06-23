import express, {json, response} from "express";
import cors from "cors";
import axios from "axios";
import qs from "query-string";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());

//endpoint de login
app.post("/login", async (req, res) => {
//substituição por acess_token
    try{
        const token = await exchangeCodeForAcessToken(req.body.code);//recebendo o token  que a pessoa está enviando
        console.log(token);
        //se conseguir fazer a requisição é trocado o id temporário pelo acess_token
        const user = await fetchUser(token);
        res.send(user);
        }catch(error){
            console.log("err", err.response.data);
            res.sendStatus(500);
        }
})

async function exchangeCodeForAcessToken(code){
    const GITHUB_ACESS_TOKEN_URL =  'https://github.com/login/oauth/access_token';
    const {REDIRECT_URL, CLIENT_ID, CLIENT_SECRET} = process.env;
    const body = {
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URL,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
};
    const{data} = await axios.post(GITHUB_ACESS_TOKEN_URL, body, {
        headers: {
        'Content-Type': 'applicarion/json'
    }
  });
  const parseData = qs.parse(data);
  return parseData.access_token;
}

async function fetchUser(token){
    response = await axios.get("http://api.github.com/user", {
        headers : {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

//porta que o servidor i´ra escutar
app.listen(5000, () => {
    console.log("O servidor está funcionando.")
})
