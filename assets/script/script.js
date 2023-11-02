// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Array of characters to be included in password
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Student Code
function generatePassword() {
    // Prompt the user to confirm the inclusion of the four character types
    var includeLower = window.confirm("Should the password contain lowercase letters?");
    var includeUpper = window.confirm("Should the password contain uppercase letters?");
    var includeNumber = window.confirm("Should the password contain numbers?");
    var includeSpecial = window.confirm("Should the password contain special characters?");

    // If none of the character types are selected, fail the password generation
    if (!includeLower && !includeUpper && !includeNumber && !includeSpecial) {
        window.alert("Password generation failed. Please include at least one type of character");
        return;
    }

    // Prompt the user to confirm the length of the password
    var passwordLength = 0;
    while ((typeof(passwordLength) !== "number") || isNaN(passwordLength) || (passwordLength < 8) || (passwordLength > 128)) {
        passwordLength = parseInt(window.prompt("Please enter the length of the password as a number between 8 and 128 inclusive:"));
    }

    // Collate the pool of available characters to use in the password
    var fullCharacterPool = [];
    if (includeLower) {
        fullCharacterPool = fullCharacterPool.concat(lowerCasedCharacters)
    }
    if (includeUpper) {
        fullCharacterPool = fullCharacterPool.concat(upperCasedCharacters)
    }
    if (includeNumber) {
        fullCharacterPool = fullCharacterPool.concat(numericCharacters)
    }
    if (includeSpecial) {
        fullCharacterPool = fullCharacterPool.concat(specialCharacters)
    }

    // Define variables to track if the character types appear in the password
    var lowerIsIn = false;
    var upperIsIn = false;
    var numberIsIn = false;
    var specialIsIn = false;

    // Build password from available characters
    var password = ""
    for (var i = 0; i < passwordLength; i++) {

        // Choose either the general character pool or a specialist pool to pick a character from
        var pool;
        var offset = 0;
        if (includeLower && !lowerIsIn && pickSpecialistPool(password.length, passwordLength, ++offset)) {
            pool = lowerCasedCharacters;
        } else if (includeUpper && !upperIsIn && pickSpecialistPool(password.length, passwordLength, ++offset)) {
            pool = upperCasedCharacters;
        } else if (includeNumber && !numberIsIn && pickSpecialistPool(password.length, passwordLength, ++offset)) {
            pool = numericCharacters;
        } else if (includeSpecial && !specialIsIn && pickSpecialistPool(password.length, passwordLength, ++offset)) {
            pool = specialCharacters;
        } else {
            pool = fullCharacterPool;
        }

        // Select a character from the chosen pool to add to the password
        nextCharacter = selectCharacter(pool);
        password = password.concat(nextCharacter);

        // Record the type of character that was selected if it is new to the password
        if (lowerCasedCharacters.find(chara => chara === nextCharacter)) {
            lowerIsIn = true;
        } else if (upperCasedCharacters.find(chara => chara === nextCharacter)) {
            upperIsIn = true;
        } else if (numericCharacters.find(chara => chara === nextCharacter)) {
            numberIsIn = true;
        } else if (specialCharacters.find(chara => chara === nextCharacter)) {
            specialIsIn = true;
        }
    }

    return password;
}

// Select a random character from the available pool
function selectCharacter(pool) {
    var x = Math.floor(Math.random() * pool.length);
    return pool[x];
}

// Decide whether a specialist character pool should be chosen (percentage chance system)
function pickSpecialistPool(currentLength, totalLength, offset) {
    var percentChance = (currentLength+offset)/totalLength;
    var choice = Math.random();
    console.log(currentLength + " " + percentChance + " " + choice);
    return (choice <= percentChance);
}