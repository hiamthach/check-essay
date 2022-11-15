export const flattenObject = (ob) => {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object" && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

export const capitalizeLetter = (str) => {
  let newStr = str.toLowerCase();

  return newStr.charAt(0).toUpperCase() + newStr.slice(1);
};

// Cut left and right special character
export const handleWord = (word) => {
  let leftIndex = 0;
  let rightIndex = word.length - 1;
  let splittedWord = [];

  while (
    (word[leftIndex].match(/[^a-zA-Z ]/g) ||
      word[rightIndex].match(/[^a-zA-Z ]/g)) &&
    leftIndex < rightIndex
  ) {
    if (word[leftIndex].match(/[^a-zA-Z ]/g)) {
      leftIndex++;
    }

    if (word[rightIndex].match(/[^a-zA-Z ]/g)) {
      rightIndex--;
    }
  }

  if (rightIndex > leftIndex) {
    splittedWord = [
      word.slice(0, leftIndex),
      word.slice(leftIndex, rightIndex + 1),
      word.slice(rightIndex + 1, word.length),
    ];
  } else {
    splittedWord = [word, "", ""];
  }

  return splittedWord;
};
