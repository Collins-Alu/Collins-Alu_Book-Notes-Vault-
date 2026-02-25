// scripts/search.js

export const Search = {
  execute: (books, query, matchCase) => {
    // If the search bar is empty, return everything
    if (!query || query.trim() === '') {
      return { 
        filteredBooks: books, 
        activeRegex: null, 
        error: null 
      };
    }

    try {
   
      const flags = matchCase ? 'g' : 'gi';
      const regex = new RegExp(query, flags);

     
      const filteredBooks = books.filter(book => {
    
        regex.lastIndex = 0; 
        const matchTitle = regex.test(book.title);
        
        regex.lastIndex = 0;
        const matchAuthor = regex.test(book.author);
        
        regex.lastIndex = 0;
        const matchgenre = regex.test(book.genre);

        return matchTitle || matchAuthor || matchgenre;
      });

  
      return { 
        filteredBooks, 
        activeRegex: regex, 
        error: null 
      };

    } catch (e) {

      return { 
        filteredBooks: books, 
        activeRegex: null, 
        error: 'Invalid Regex pattern.' 
      };
    }
  }
};