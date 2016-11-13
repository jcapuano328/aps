var _ = require('lodash');

var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var words = [
	'Mauris', 'mauris', 'ante,', 'blandit', 'et,', 'ultrices', 'a,', 'suscipit', 'eget,', 'quam', 'Integer', 'ut', 'neque', 'Vivamus', 'nisi', 'metus,', 'molestie', 'vel,', 'gravida', 'in,', 'condimentum', 'sit', 'amet,', 'nunc', 'Nam', 'a', 'nibh', 'Donec', 'suscipit', 'eros', 'Nam', 'mi', 'Proin', 'viverra', 'leo', 'ut', 'odio', 'Curabitur', 'malesuada', 'Vestibulum', 'a', 'velit', 'eu', 'ante', 'scelerisque', 'vulputate',
	'Sed', 'non', 'urna', 'Donec', 'et', 'ante', 'Phasellus', 'eu', 'ligula', 'Vestibulum', 'sit', 'amet', 'purus', 'Vivamus', 'hendrerit,', 'dolor', 'at', 'aliquet', 'laoreet,', 'mauris', 'turpis', 'porttitor', 'velit,', 'faucibus', 'interdum', 'tellus', 'libero', 'ac', 'justo', 'Vivamus', 'non', 'quam', 'In', 'suscipit', 'faucibus', 'urna',
	'Nam', 'enim', 'risus,', 'molestie', 'et,', 'porta', 'ac,', 'aliquam', 'ac,', 'risus', 'Quisque', 'lobortis', 'Phasellus', 'pellentesque', 'purus', 'in', 'massa', 'Aenean', 'in', 'pede', 'Phasellus', 'ac', 'libero', 'ac', 'tellus', 'pellentesque', 'semper', 'Sed', 'ac', 'felis', 'Sed', 'commodo,', 'magna', 'quis', 'lacinia', 'ornare,', 'quam', 'ante', 'aliquam', 'nisi,', 'eu', 'iaculis', 'leo', 'purus', 'venenatis', 'dui',
	'Cras', 'dictum', 'Pellentesque', 'habitant', 'morbi', 'tristique', 'senectus', 'et', 'netus', 'et', 'malesuada', 'fames', 'ac', 'turpis', 'egestas', 'Vestibulum', 'ante', 'ipsum', 'primis', 'in', 'faucibus', 'orci', 'luctus', 'et', 'ultrices', 'posuere', 'cubilia', 'Curae;', 'Aenean', 'lacinia', 'mauris', 'vel', 'est',
	'Suspendisse', 'eu', 'nisl', 'Nullam', 'ut', 'libero', 'Integer', 'dignissim', 'consequat', 'lectus', 'Class', 'aptent', 'taciti', 'sociosqu', 'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra,', 'per', 'inceptos', 'himenaeos'
];
var sentences = [
	'Lorem ipsum dolor sit amet, sui Care die antiquis vocans diversificatur subito animal irruit in modo compungi mulierem ubi augue. ',
	'Nunc in fuerat construeret cena reges undis Tharsiam eam sed. ',
	'Horreo Athenagora secundum egenum in. ',
	'Scelus patrem in lucem exempli. ',
	'Coepit amatrix tolle Adfertur guttae sapientiae decubuerat age sive. ',
	'Inde flammis ingreditur id quibus ut a lenoni, odore imo dictum in modo invenit iuvenem patre. ',
	'Plenus lacrimas illa caelum pariter irrationabile. ',
	'Duo dominus se in modo cavendum es audito. ',
	'Navis fortiter invenit ubi ait in rei finibus veteres hoc ambulare facere. ',
	'Inquisivi ecce habitu in modo compungi mulierem. ',
	'Toto determinata diebus lectulum venalia possis in modo cavendum es ego dum. ',
	'Pro ampullam virginitatem sunt amore assum amet Cur meae sit Mariae maximas hanc cuius ait. ',
	'Cara die ad quia quod ait. ',
	'Cyrenaeorum tertia domina tu tu secum. ',
	'Navibus mensam ne civitatis ne civitatis civium eum filiam. ',
	'Descendit ad te finis laeta quis ait. ',
	'Accede meae puer est Apollonius. ',
	'Coram me testatur in lucem exitum atque armata mare deambulavit latere ab esset eam ad quia. ',
	'Consuetudo aut atque armata mare convivio levis aquas medici aureis rogum qui dicens hoc puella! Horreo Athenagora mihi cum suam non coepit dies vero non coepit dies recessissent fit vero rex ut libertatem adhuc. ',
	'Ecclesiam mittam est amet coram regis fine omnino inventa fuit. ',
	'Habere homo nos capitur illam Venis potest in deinde cupis ei. ',
	'Tharsis ratio omnes Hellenicus ut casus inferioribus civitatis intelligitur sicut nec. ',
	'At actus perfidiam in fuerat construeret in lucem concitaverunt in deinde cepit roseo commendavit patris. ',
	'Die attingit Archistrate tabulas morsu tuum filiae tibi.'
];

//-------------------------------------------------------------------
// Generator
//-------------------------------------------------------------------

function generateData(count, maker) {
	return _.range(count).map(maker);
};

//-------------------------------------------------------------------
// Helpers
//-------------------------------------------------------------------

function makeDate(days) {
	days = days || 1;
    var day = randomInt(0, days);
	var d = new Date();
    var t = d.getDate() + day;
    d.setDate(t);
    return d;
};

function randomCode(size) {
	size = size || 20;
	//return randomWord(randomInt(1, size));
	return randomLetters(randomInt(1, size));
};

function randomDescription(size) {
	return randomText(size);
};

function randomText(size) {
	size = size || 5;
	var text = "";
    while (size-- > 0) {
    	if (text.length > 0) {
        	text += " ";
        }
    	text += randomWord();
    }
    return text;
};

function randomPhone() {
	return "(" + randomDigits(3, 1, 9) + ") " +
    				  randomDigits(3, 1, 9) + " - " +
    				  randomDigits(4, 1, 9);
};

function randomEmail() {
	return randomWord(randomInt(1, 25)) + "@" +
    		randomWord(randomInt(1, 25)) + ".com";
};

function randomNumber(size) {
	size = size || 20;
	return randomDigits(randomInt(1, size), 1, 9);
};

function randomID() {
	return randomInt(1, 99999);
};

function randomWord(size) {
	/*
	size = size || 10;
	var word = "";
    while (size-- > 0) {
    	word += randomLetter();
    }
    return word;
    */
    return randomOneOf(words);
};

function randomDigits(size, low, high) {
	size = size || 3;
    low = low || 1;
    high = high || 9;
	var number = "";
    while (size-- > 0) {
    	number += randomInt(low, high).toString();
    }
    return number;
};

function randomLetters(count) {
	count = count || 5;
    var l = "";
    while (count-- > 0) {
    	l += randomLetter();
	}
    return l;
};

function randomLetter() {
	return letters.charAt(randomInt(0, letters.length-1));
};

function randomInt(low, high) {
	return Math.floor(Math.random()*(high-low+1)) + low;
};

function randomDecimal(low, high, precision) {
	low = low || 0;
    high = high || 1000;
    precision = precision || 2;
	var p = Math.pow(10, precision);
    var d = (Math.random()*(high-low+1)) + low;
	return Math.ceil(d * p) / p;
};

function randomOneOf(list) {
    return list[randomInt(0, list.length-1)];
};


//-------------------------------------------------------------------
// Helpers
//-------------------------------------------------------------------
module.exports = {
	generate: generateData,
    Helpers: {
		generateDate: makeDate,
		generateCode: randomCode,
		generateDescription: randomDescription,
		generateText: randomText,
		generatePhone: randomPhone,
		generateEmail: randomEmail,
		generateNumber: randomNumber,
		generateID: randomID,
		generateWord: randomWord,
		generateDigits: randomDigits,
		generateLetter: randomLetter,
		generateInt: randomInt,
		generateDecimal: randomDecimal,
		generateOneOf: randomOneOf
    }
};
