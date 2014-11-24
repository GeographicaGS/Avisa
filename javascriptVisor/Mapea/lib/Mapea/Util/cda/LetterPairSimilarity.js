LetterPairSimilarity = {
	calculaParecido : function(nombreBuscado, nombreDevuelto, tipoViaBUscado, tipoViaDevuelto, portalBuscado, portalDevuelto) {
		var parecido = LetterPairSimilarity.compareStrings(nombreBuscado, nombreDevuelto);
		parecido = parecido * 0.85;

		if (tipoViaBUscado.toUpperCase() == tipoViaDevuelto.toUpperCase() || tipoViaBUscado == '') {
			parecido = parecido + 0.1;
		}
		if (portalBuscado.toUpperCase() == portalDevuelto.toUpperCase() || portalBuscado == '') {
			parecido = parecido + 0.05;
		} else {
			if (portalBuscado.toUpperCase() == 'S/N' && portalDevuelto == '999999') {
				parecido = parecido + 0.05;
			}
		}
		return parecido;
	},

	compareStrings : function(str1, str2) {
		if (str1 == null || str2 == null)
			return 0;

		var pairs1 = LetterPairSimilarity.wordLetterPairs(str1.toUpperCase());
		var pairs2 = LetterPairSimilarity.wordLetterPairs(str2.toUpperCase());
		var intersection = 0;
		var union = pairs1.length + pairs2.length;
		for ( var i = 0, il = pairs1.length; i < il; i++) {
			var pair1 = pairs1[i];
			for ( var j = 0, jl = pairs2.length; j < jl; j++) {
				var pair2 = pairs2[j];
				if (pair1 == pair2) {
					intersection++;
					pairs2.splice(j,1);
					break;
				}
			}
		}
		return 2 * intersection / union;
	},

	wordLetterPairs : function(str) {
		var allPairs = new Array();
		var tokenizer = str.split(' ');
		for(var i=0, l=tokenizer.length; i<l; i++) {
			var pairsInWord = LetterPairSimilarity.letterPairs(tokenizer[i]);
			for ( var p = 0, pl = pairsInWord.length; p < pl; p++) {
				allPairs.push(pairsInWord[p]);
			}
		}
		return allPairs;
	},

	letterPairs : function(str) {
		var numPairs = str.length - 1;
		var pairs = new Array();
		for ( var i = 0; i < numPairs; i++) {
			pairs.push(str.substring(i, i + 2));
		}
		return pairs;
	},

	calculaParecidoContenido : function(similarityString, querySearchString) {
		similarityString = similarityString.toLowerCase();
		querySearchString = querySearchString.toLowerCase();
		var puntuacion = 0;
		var sumado = 0;
		var words = querySearchString.split(" ");

		for( var i=0, l=words.length; i<l; i++) {
			var word = words[i];
			word = word.trim();
			if (similarityString.indexOf(word)!=-1) {
				if (sumado == 0) {
					puntuacion += 0.2;
				}
				else if (sumado >0 && sumado <3)
				{
					puntuacion += 0.1
				}
				else
				{
					puntuacion += 0.05
				}
				sumado++;
			}
		}

		return puntuacion;
	}
};