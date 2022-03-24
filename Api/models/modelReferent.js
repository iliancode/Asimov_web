const db = require('./connexion')

const getClasse = async () => {
    return new Promise((resolve, reject) => {
        let sql='SELECT idClasse, nom FROM classe';
        db.query(sql, (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucune Classe trouvé !")
            }else{
                resolve(data)
            }
        })
    })
}

const createEleve = async (pseudo, mdp, nom, prenom, Id_Classe) => {
    return new Promise((resolve, reject) => {
        let sql="INSERT INTO eleve (pseudo, mdp, nom, prenom, Id_Classe) VALUES (?,?,?,?,?);"

        db.query(sql,[pseudo, mdp, nom, prenom, Id_Classe], (err, data, fields) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

module.exports={
    getClasse,
    createEleve,
}