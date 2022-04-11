// création du routeur Express pour ce module
const express = require('express')
let app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const routeur = express.Router()


// Ajout des controllers //
const ctrlGlobal = require('../controllers/ctrlGlobal')
const ctrlProf = require('../controllers/ctrlProf')
const ctrlReferent = require('../controllers/ctrlReferent')
const ctrlProviseur = require('../controllers/ctrlProviseur')


// Enregistrement des routeurs


    // ------------------------ Api Global --------------------------------- //

//S'authentifier
routeur.post('/Authentification', ctrlGlobal.Connexion_POST) // Pour tout le monde
    .get('/Authentification/:table/:pseudo/:mdp', ctrlGlobal.Connexion) // Pour tout le monde
    

//afficher la liste des classes
    .get('/Classes', ctrlGlobal.afficher_classe) // Pour Référent et Proviseur

//afficher la liste des eleves d'une classe
    .get('/Eleves_Classe/:id', ctrlGlobal.afficher_details_classe) // Pour Professeur et Proviseur

//afficher toutes les notes de l'élève
    .get('/Afficher_Notes_Eleve/:idEleve', ctrlGlobal.afficher_note_eleve) // Pour Eleve et Proviseur

// Modifier une note 
    .post('/modif_Notes', ctrlGlobal.modifier_note_eleve_POST)
    .get('/modif_Notes/:idNote/:note', ctrlGlobal.modifier_note_eleve)





    // ------------------------ Api pour Professeurs ----------------------- //

//afficher les classes d'un professeur
    .get('/Classes/:id', ctrlProf.afficher_classe_prof)

//afficher les notes d'un eleve dans une matiere
    .get('/Notes_Matiere/:idProf/:idEleve', ctrlProf.afficher_note_eleve_matiere)

//supprimer une note
    .get('/Suppr_Notes_Matiere/:idNote', ctrlProf.supprimer_note_eleve)

//ajouter une note a un eleve dans une matiere precise + description de la note
    .post('/Ajout_Notes_Matiere', ctrlProf.ajouter_note_eleve_matiere_POST)
    .get('/Ajout_Notes_Matiere/:idMatiere/:idEleve/:titre/:note', ctrlProf.ajouter_note_eleve_matiere)





    // ------------------------ Api pour Référent --------------------------- //

//créer un nouvel eleve 
    .post('/Ajout_Nouvel_Eleve', ctrlReferent.ajouter_new_eleve_POST)
    .get('/Ajout_Nouvel_Eleve/:pseudo/:mdp/:nom/:prenom/:Id_Classe', ctrlReferent.ajouter_new_eleve)





    // ------------------------ Api pour Proviseur -------------------------- //
// matieres==========================
//afficher liste matieres
    .get('/Matieres', ctrlProviseur.afficher_Matieres)
    //céer une matiere 
    .post('/Ajout_Nouvelle_Matiere', ctrlProviseur.ajouter_Matiere_POST)
    .get('/Ajout_Nouvelle_Matiere/:nom', ctrlProviseur.ajouter_Matiere)
    //supprimer une matiere
    .get('/Suppr_Matiere/:idMatiere', ctrlProviseur.supprimer_Matiere)
    //modifier une matiere
    .post('/Modif_Matiere', ctrlProviseur.modifier_Matiere_POST)
    .get('/Modif_Matiere/:idMatiere/:nom', ctrlProviseur.modifier_Matiere)
//===============
//afficher les professeurs
    .get('/Professeurs', ctrlProviseur.afficher_Prof)

   
//créer un nouveau professeur 
    .post('/Ajout_Nouveau_Prof/:nom/:prenom/:idMatiere/:pseudo/:mdp', ctrlProviseur.ajouter_Prof_POST)
    .get('/Ajout_Nouveau_Prof/:nom/:prenom/:idMatiere/:pseudo/:mdp', ctrlProviseur.ajouter_Prof)
//supprimer un professeur
    .get('/Suppr_Prof/:idProf', ctrlProviseur.supprimer_Prof)
//modifier un professeur
    .get('/Modif_Prof/:idProf/:nom/:prenom', ctrlProviseur.modifier_Prof)
// Exportation //
module.exports = routeur