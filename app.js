
import { State } from './Books and Notes Vault/Scripts/state.js';
import { Storage } from './storage.js';
import { Validators } from './validators.js'; 
import { UI } from './ui.js';
import { Search } from './search.js';

document.addEventListener('DOMContentLoaded', () => {
  
  State.init();
  
 
  UI.setTheme(State.prefs.theme);
  document.getElementById('page-goal-input').value = State.prefs.goal;


  refreshApp();

 
  setupEventListeners();
});

function refreshApp() {
  const books = State.books;
  UI.renderTable(books);
  UI.renderDashboard(books, State.prefs.goal);
}

function setupEventListeners()
  
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = e.target.getAttribute('data-target');
      
      
      document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('active');
        b.removeAttribute('aria-current');
      });
      e.target.classList.add('active');
      e.target.setAttribute('aria-current', 'page');

   
      document.querySelectorAll('.view-section').forEach(section => {
        section.classList.add('hidden');
      });
      document.getElementById(targetId).classList.remove('hidden');
    });
  });


  const form = document.getElementById('book-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
   
    const formData = {
      id: document.getElementById('book-id').value,
      title: document.getElementById('book-title').value.trim(),
      author: document.getElementById('book-author').value.trim(),
      pages: document.getElementById('book-pages').value,
      genre: document.getElementById('book-genre').value.trim(),
      dateAdded: document.getElementById('book-date').value
    };


    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    
    let isValid = true;
    
    const titleError = Validators.title(formData.title);
    if (titleError) {
      document.getElementById('title-error').textContent = titleError;
      isValid = false;
    }
    
    
    const duplicateWarning = Validators.findDuplicateWords(formData.title);
    if (duplicateWarning && !confirm(`${duplicateWarning}\nClick OK to save anyway.`)) {
      return; 
    }

    const pagesError = Validators.pages(formData.pages);
    if (pagesError) {
      document.getElementById('pages-error').textContent = pagesError;
      isValid = false;
    }

    const genreError = Validators.tag(formData.genre);
    if (tagError) {
      document.getElementById('genre-error').textContent = tagError;
      isValid = false;
    }

    if (!isValid) return; 

  
    if (!formData.id) {
      formData.id = 'rec_' + Date.now();
    }
    
    State.saveBook(formData);
    
  
    UI.clearForm();
    UI.showStatus('Record saved successfully!');
    refreshApp();
    
  
    document.querySelector('[data-target="view-records"]').click();
  });

  document.getElementById('btn-cancel-form').addEventListener('click', () => {
    UI.clearForm();
    document.querySelector('[data-target="view-dashboard"]').click();
  });

  document.getElementById('books-tbody').addEventListener('click', (e) => {
 
    if (e.target.classList.contains('btn-delete')) {
      const id = e.target.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this book?')) {
        State.deleteBook(id);
        refreshApp();
        UI.showStatus('Book deleted.');
      }
    }
    
   
    if (e.target.classList.contains('btn-edit')) {
      const id = e.target.getAttribute('data-id');
      const book = State.books.find(b => b.id === id);
      if (book) {
        UI.fillForm(book);
      
        document.querySelector('[data-target="view-form"]').click();
      }
    }
  });


  const searchInput = document.getElementById('search-input');
  const caseToggle = document.getElementById('regex-case-toggle');

  const handleSearch = () => {
    const query = searchInput.value;
    const isCaseSensitive = caseToggle.checked;
    
   
    const { filteredBooks, activeRegex, error } = Search.execute(State.books, query, isCaseSensitive);

    if (error) {

      searchInput.setCustomValidity(error);
      searchInput.reportValidity();
    } else {

      searchInput.setCustomValidity('');
      UI.renderTable(filteredBooks, activeRegex);
    }
  };


  searchInput.addEventListener('input', handleSearch);
  caseToggle.addEventListener('change', handleSearch);


  document.getElementById('sort-select').addEventListener('change', (e) => {
    const [field, direction] = e.target.value.split('-'); 
    
    State.books.sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

     
      if (field === 'pages') {
        valA = Number(valA);
        valB = Number(valB);
      } else {
     
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    UI.renderTable(State.books);
  });


  document.getElementById('theme-toggle').addEventListener('change', (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    UI.setTheme(newTheme);
    State.updateTheme(newTheme);
  });


  document.getElementById('save-goal-btn').addEventListener('click', () => {
    const goal = document.getElementById('page-goal-input').value;
    State.updateGoal(goal);
    refreshApp();
    UI.showStatus('Goal updated!');
  });