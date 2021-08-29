const jwt = require('jsonwebtoknen')
const authConfig = require(.../config/auth.json)

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).send({error: 'Nenhum token foi informado'})

    const parts = authHeader.split(' ');

    if(!parts.lenght === 2)
        return res.status(401).send({error: 'Token Error'})
    
    
    const [ scheme, token ] = parts;

    if(!/^bearer$/i.test(scheme))
        return res.status(401).send({error: 'Token com formatação errada'})
    
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({error: 'Token invalido'})

        req.userId = decoded.id;
        return next()
    })
}
