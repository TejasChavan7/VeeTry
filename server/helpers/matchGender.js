// utils/matchGender.js

module.exports = function isMatchingGender(product, gender) {
    const desc = product.description?.toLowerCase() || '';
    const g = gender.toLowerCase();
  
    const genderWords = {
      male: ['men', 'man', 'male', 'boy'],
      female: ['women', 'woman', 'female', 'girl'],
    };
  
    if (!genderWords[g]) return true; // If gender is 'Other' or not matched
  
    return genderWords[g].some(word => desc.includes(word));
  };
  