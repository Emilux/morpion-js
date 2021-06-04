let damier = [];	// Tableau damier contenant les données du jeu (V pour case vide, O pour joueur O et X pour joueur X)
let joueur = "" ; 	// Variable contenant le jeton (O ou X) du joueur dont c'est le tour

$(function(){

	// TODO: Créer un événement au "click" sur le bouton "#start" https://api.jquery.com/click
	$('#start').on('click', function (event){
		// Lors du click sur ce bouton, on appelle la fonction DemarrePartie()
		event.preventDefault();
		DemarrePartie();
	});


	// TODO: Créer un événement au "click" sur l'image d'une case ( ".case img" ) https://api.jquery.com/click/#click-handler
	$('.case img').on('click', function (event){
		// Lors du click sur ce bouton, appeler la fonction DamierOnClick( numcase )
		// numcase étant le numéro de la case, récupérée dans l'attribut "data-case" (analysez bien le HTML). https://api.jquery.com/data
		event.preventDefault();
		DamierOnClick($(this).data('case'));
	});



});

/**
 * Cette fonction démarre la partie
 *
 * @return  {void}
 */
function DemarrePartie() {
	// On initialise le tableau damier
	InitDamier() ;

	// On rempli chaque case du damier avec V
	DessineDamier() ;

	// On choisit aléatoirement si O ou X commence à jouer
	if( Math.random() >= 0.5 ) {
		joueur = "O" ;
	}
	else  {
		joueur = "X" ;
	}

	// On affiche quel joueur joue dans "#zonedetexte" (O ou X)
	AfficheTexte( "Joueur : " + joueur ) ;
}

/**
 * Cette fonction remplit le tableau damier au lancement du jeu.
 * Elle remplit chaque case du tableau "damier[]" d'un 'V' (qui correspond à 'case vide'),
 * sachant que le damier comporte 9 cases
 *
 * @return  {void}
 */
function InitDamier()  {
	damier = [];
	// TODO: faire une boucle for qui itère de 0 à <9
	for (let i = 0 ; i < 9 ; i++ ){
		// à chaque itération, ajouter un nouvel index au tableau damier avec la valeur 'V' https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/push
		damier.push('V');
	}

}

/**
 * Cette fonction dessine le damier du morpion dans la page HTML
 * à partir des informations contenues dans le tableau damier.
 *
 * @return  {void}
 */
function DessineDamier() {
	// TODO: Faire une boucle sur le tableau damier[] avec une boucle for https://www.w3schools.com/js/js_loop_for.asp
	for (let i = 0 ; i < damier.length ; i++){
		// Dans la boucle, sélectionner l'élément HTML '#case+i' grâce à jQuery et le stocker dans une variable '$case'
		let $case = $('#case'+i);
		// si la valeur damier[i] est égale à V.
		// remplacer l'attribut 'src' de $case par image vide.jpg
		if (damier[i] === 'V') $case.attr('src','./vide.jpg')

		// si la valeur damier[i] est égale à O.
		// remplacer l'attribut 'src' de $case par rond.png
		if (damier[i] === 'O') $case.attr('src','./rond.png')

		// si la valeur damier[i] est égale à X.
		// remplacer l'attribut 'src' de $case par croix.png
		if (damier[i] === 'X') $case.attr('src','./croix.png');

	}

}

/**
 * Cette fonction permet d'afficher le texte de l'argument
 * texteAafficher dans la span #zonedetexte.
 *
 * @param   {string}  texteAafficher  le text à afficher
 *
 * @return  {void}
 */
function AfficheTexte( texteAafficher ) {
	// TODO: remplacer le texte de #zonedetexte par la variable texteAafficher https://api.jquery.com/text
	$('#zonedetexte').text(texteAafficher);
}

/**
 * Cette fonction parcours le tableau "damier[]"
 * et retourne le nombre de cases "vides" (contenant 'V') du tableau.
 *
 * @return  int
 */
function NbCaseVide() {
	let nombreDeCaseVide = 0;
	// TODO: parcourir le tableau damier avec une boucle for
	for (let i = 0 ; i < damier.length ; i++){
		// À chaque itération, si la valeur damier[i] est égale 'V': incrémenter nombreDeCaseVide de plus 1
		if (damier[i] === 'V'){
			nombreDeCaseVide++
		}
	}

	return nombreDeCaseVide;
}

/**
 * Cette fonction vérifie si "joueur" est X ou O
 * et change la variable joueur en fonction.
 *
 * @return  {void}
 */
function AlterneJoueur() {
	// TODO: si la variable joueur est égale à 'X'
	if (joueur === 'X'){
		// Changer la valeur de la variable joueur par 'O'
		joueur = 'O';
	} else if (joueur === 'O'){
		// Changer la valeur de la variable joueur par 'X'
		joueur = 'X';
	}
}

/**
 * Cette fonction appelle la majorité des autres fonctions
 * et se lance lors d'un click sur une case
 *
 * @param   {int}  numcase  le numéro de la case
 *
 * @return  {void}
 */
function DamierOnClick( numcase ) {

	// Teste si la partie est commencée
	if( joueur === 'X' || joueur === 'O' )
	{
		// Vérifie que la case jouée est bien vide
		if( damier[numcase] === 'V')
		{
			// Enregistre le jeu du joueur
			damier[numcase] = joueur ;
			// On actualise le Damier sur la page
			DessineDamier() ;

			// On vérifie les alignements
			if( Alignement( joueur ))
			{
				// Affiche un message de victoire
				AfficheTexte( 'Le joueur ' + joueur + ' a gagné !!!! Cliquez sur "Démarrer une partie pour" recommencer' ) ;
				joueur = ""; // Arrêt de la partie
				return ;
			}
			// Vérifie que la partie est nulle
			if( NbCaseVide() === 0 )
			{
				AfficheTexte( "Partie nulle, aucun joueur n'a gagné, cliquez sur Démarer pour recommencer" ) ;
				joueur = "" ;
				return ;
			}
			// La partie continue, on passe le tour à l'autre joueur
			AlterneJoueur() ;
			AfficheTexte( "Joueur : " + joueur ) ;
		}
		else AfficheTexte( "La case jouée n'est pas vide, recommencez" ) ;
	}
	else AfficheTexte( "Cliquer sur Démarrer pour commencer une partie" ) ;
}

/**
 * Cette fonction vérifie si UNE ligne aligne 3 jetons X ou O
 * Si c'est le cas, elle retourne true, sinon false
 *
 * @param   {int}  	   numligne  le numéro de la ligne à vérifier
 * @param   {string}   jeton     le jeton du joueur: 'X' ou 'O'
 *
 * @return  {boolean}            return true si une ligne est compléte, false sinon
 */
function AlignementLigne( numligne, jeton ) {
	// TODO: Pour compléter cette fonction, il va falloir faire un console.log(damier)
	// et analyser son contenu. Vous pouvez aussi appeler cette fonction dans la console
	// avec des données de test: exemple:  AlignementLigne( 1, 'O' );
	// Exemple: S'il y'a 3 'O' à la ligne 1, on retourne true. Sinon on retourne false.
	// Sachant qu'il y'a 3 lignes, il faut vérifier pour 3 lignes, donc avoir 3 conditions.
	// Le tableau damier ne comporte pas vraiment des lignes... c'est une simple liste
	// mais en jouant, et en affichant le tableau damier dans la console après chaque tour,,
	// on peut déduire quels index du tableau correspondent à une ligne

	if (numligne === 1 && damier[0] === jeton && damier[1] === jeton && damier[2] === jeton) return true;
	if (numligne === 2 && damier[3] === jeton && damier[4] === jeton && damier[5] === jeton) return true;
	if (numligne === 3 && damier[6] === jeton && damier[7] === jeton && damier[8] === jeton) return true;

	return false;

}

/**
 * Cette fonction vérifie si UNE colonne (numcolonne) algine 3 jetons X ou O (jeton)
 * Si c'est le cas, elle retourne "true", sinon "false"
 *
 * @param   {int}  	   numcolonne  le numéro de la ligne à vérifier
 * @param   {string}   jeton     le jeton du joueur: 'X' ou 'O'
 *
 * @return  {boolean}            return true si une colonne est compléte, false sinon
 */
function AlignementColonne( numcolonne, jeton ) {
	// TODO: Pour compléter cette fonction, il va falloir faire un console.log(damier)
	// et analyser son contenu.
	// Exemple: S'il y'a 3 'O' à la colonne 1, on retourne true. Sinon on retourne false.
	// Sachant qu'il y'a 3 colonnes, il faut vérifier pour 3 colonnes, donc avoir 3 conditions.
	// Le tableau damier ne comporte pas vraiment des colonnes... c'est une simple liste
	// Mais en jouant, et en affichant le tableau damier dans la console après chaque tour,
	// on peut déduire quels index du tableau correspondent à une colonne

	if (numcolonne === 1 && damier[0] === jeton && damier[3] === jeton && damier[6] === jeton) return true;
	if (numcolonne === 2 && damier[1] === jeton && damier[4] === jeton && damier[7] === jeton) return true;
	if (numcolonne === 3 && damier[2] === jeton && damier[5] === jeton && damier[8] === jeton) return true;

	return false;


}

/**
 * Cette fonction vérifie si une des 2 diagonales aligne 3 jetons X ou O
 *
 * @param   {string}   jeton     le jeton du joueur: 'X' ou 'O'
 *
 * @return  {boolean}            return true si une diagonal est compléte, false sinon
 */
function AlignementDiagonale( jeton ) {
	// et analyser son contenu.
	// Exemple: S'il y'a 3 'O' dans une diagonale, on retourne true. Sinon on retourne false.
	// Sachant qu'il y'a 2 diagonales, il faut vérifier pour 2 colonnes, donc avoir 2 conditions.
	// Le tableau damier ne comporte pas vraiment des diagonales... c'est une simple liste
	// Mais en jouant, et en affichant le tableau damier dans la console après chaque tour,
	// on peut déduire quels index du tableau correspondent à une diagonale
	// TODO: Pour compléter cette fonction, il va falloir faire un console.log(damier)
	if (damier[0] === jeton && damier[4] === jeton && damier[8] === jeton) return true;
	if (damier[2] === jeton && damier[4] === jeton && damier[6] === jeton) return true;

	return false;

}

/**
 * Cette fonction vérifie tous les alignements: horizontal, vertical et diagonal.
 * Pour vérifier cela, elle parcours le tableau damier qui contient ces informations.
 * Elle renvoie true si un alignement est complet, false sinon
 *
 * @param   {string}  jeton  Peut être 'X' ou 'O'
 *
 * @return  {boolean}
 */
function Alignement( jeton ) {
	// TODO: faire une boucle qui itère de 0 à < 3 (3 colonnes et 3 lignes)
	for (let i = 0 ; i < 3 ; i++){
		console.log(i);
		// Appeler la fonction AlignementLigne( numligne, jeton )
		// Si son résultat est true, retourner true
		if (AlignementLigne( i+1, joueur )) return true;

		// Appeler la fonction AlignementColonne( numcolonne, jeton )
		// Si son résultat est true, retourner true
		if (AlignementColonne( i+1, joueur )) return true;
	}
	// fin de la boucle

	// Appeler la fonction AlignemnetDiagonale( jeton )
	// Si son résultat est true, retourner true
	if (AlignementDiagonale(joueur)) return true;

	// Sinon retourner false
	return false;
}