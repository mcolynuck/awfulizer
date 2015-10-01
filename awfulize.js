(function(awfulize){

	var _inputElm = null,		// Input element to get/set text.
		_outputElm = null,
		_options = {
				numbers: false,		// Defaults
				vowels: false
			};

	// Random true/false
	function randomBoolean() {
		return (Math.floor((Math.random() * 10) + 1) % 2) == 0 ? true : false;
	}


	// Change case of text randomly.
	// Maintains Twitter hashtag case.
	function randomizeCase(text) {
		var output = "",
			ignoreWord = false,
			chr = '';

		for ( var i = 0; i < text.length; i++ ) {
			chr = text.charAt(i);

			// Ignore words starting with '#' which are Twitter hashtags.
			if(ignoreWord && chr === ' '){
				ignoreWord = false;
			}

			if(!ignoreWord && chr === '#') {
				ignoreWord = true;
			}

			if(!ignoreWord) {
				if(randomBoolean()) {
					output += chr.toUpperCase();
				} else {
					output += chr.toLowerCase();
				}				
			} else {
				output += chr;
			}
  		}

  		return output;
	}



	// Replaces some captial letters with numbers that look similar.
	function replaceTextWithNums(text) {
		return text.replace(/I/g, "1")
			//.replace(/E/g, "3")
			.replace(/S/g, "5")
			.replace(/B/g, "8")
			//.replace(/P/g, "9")
			.replace(/O/g, "0");


		var output = "",
			chr = "",
			ignoreWord = false;
			
		for ( var i = 0; i < text.length; i++ ) {
			chr = text.charAt(i);

			// Ignore words starting with '#' which are Twitter hashtags.
			if(ignoreWord && chr === ' '){
				ignoreWord = false;
			}

			if(!ignoreWord && chr === '#') {
				ignoreWord = true;
			}

			if(!ignoreWord) {
				if (chr === 'S') {
					output += '5';
				} else {
					output += chr;
				}

				if (chr === 'B') {
					output += '8';
				} else {
					output += chr;
				}

				if (chr === 'O') {
					output += '0';
				} else {
					output += chr;
				}
			} else {
				output += chr;
			}
		}
		return output;


	}


	// Removes random vowels from text.
	function dropSomeVowels (text) {
		var output = "",
			chr = "",
			ignoreWord = false;

		for ( var i = 0; i < text.length; i++ ) {
			chr = text.charAt(i);

			// Ignore words starting with '#' which are Twitter hashtags.
			if(ignoreWord && chr === ' '){
				ignoreWord = false;
			}

			if(!ignoreWord && chr === '#') {
				ignoreWord = true;
			}

			if(!ignoreWord) {	
				if(chr.match(/[aeiou]/gi) !== null) {		// If vowel?
					if(randomBoolean()) {					// If true, keep it
						output += chr;
					}
				} else {
					output += chr;		// constenant
				}
			} else {
				output += chr;
			}
		}
		return output;
	}



	// Process text string.
	function _awfulize(text, options) {
		var output = "",
			opts = _options;

		if (options !== undefined && options instanceof Object) {
			opts = options;
		}

		// Mix case of text
		output = randomizeCase(text);

		// Process optional changes
		if (opts.numbers) {
			output = replaceTextWithNums(output);
		}

		if (opts.vowels) {
			output = dropSomeVowels(output);
		}

		return output;
	}



	// Set options to use
	awfulize.setOptions = function(configObj) {
		_options = configObj;
	}



	// Define which element to use for input.
	awfulize.setInput = function(elm) {
		_inputElm = elm;
	};


	// Define which element to use for output.
	awfulize.setOutput = function(elm) {
		_outputElm = elm;
	}



	// Start processing the input data
	awfulize.run = function() {
		if (!_inputElm) {
			throw "No input element configured";
		}
		if (!_outputElm) {
			throw "No output element configured";
		}

		// Get text to process
		var text = _inputElm[0].value;

		var output = _awfulize(text);

		// Send output to element
		_outputElm.val(output);
	};

})(window.awfulize = window.awfulize || {});