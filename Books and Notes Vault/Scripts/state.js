import { Storage } from './storage.js';


export const State = {
  books: [],
  prefs: { theme: 'light', goal: 0 },
  

  init() {
    this.books = Storage.getBooks();
    this.prefs = Storage.getPrefs();
  },


  saveBook(bookData) {
    const index = this.books.findIndex(b => b.id === bookData.id);
    
    if (index >= 0) {
     
      this.books[index] = { ...this.books[index], ...bookData, updatedAt: Date.now() };
    } else {
    
      const newBook = {
        ...bookData,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      this.books.push(newBook);
    }
    
   
    Storage.saveBooks(this.books);
  },

  deleteBook(id) {
    this.books = this.books.filter(b => b.id !== id);
    Storage.saveBooks(this.books);
  },

  updateGoal(newGoal) {
    this.prefs.goal = parseInt(newGoal, 10);
    Storage.savePrefs(this.prefs);
  },
  
  updateTheme(theme) {
    this.prefs.theme = theme;
    Storage.savePrefs(this.prefs);
  },

 
  importData(newData) {
    this.books = newData;
    Storage.saveBooks(this.books);
  }
};