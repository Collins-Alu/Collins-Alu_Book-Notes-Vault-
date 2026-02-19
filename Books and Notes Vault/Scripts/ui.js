export const UI={
    rendertable: (books, highlights = null) => {
        const tbody= document.getElementById('books-tbody');
        tbody.innerHTML = '';
        if (books.length===0) {
            tbody.innerHTML= '<tr><td> colspan="6" style="Text-align:centre;">no records found.<td><tr>';
            return
        }
        books.forEach(book => {
      const tr = document.createElement('tr');
      
     
      const highlight = (text) => {
        if (!highlightRegex) return text;
    
        return String(text).replace(highlightRegex, (match) => `<mark>${match}</mark>`);
      };

      tr.innerHTML = `
        <td data-label="Title">${highlight(book.title)}</td>
        <td data-label="Author">${highlight(book.author)}</td>
        <td data-label="Pages">${book.pages}</td>
        <td data-label="Tag"><span class="tag-badge">${highlight(book.tag)}</span></td>
        <td data-label="Date">${book.dateAdded}</td>
        <td data-label="Actions" class="actions-cell">
          <button class="btn-edit" data-id="${book.id}" aria-label="Edit ${book.title}">✎</button>
          <button class="btn-delete" data-id="${book.id}" aria-label="Delete ${book.title}">🗑</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

 
  renderDashboard: (books, goal) => {
   
    const totalBooks = books.length;
    const totalPages = books.reduce((sum, b) => sum + Number(b.pages), 0);
    
   
    const tagCounts = {};
    books.forEach(b => tagCounts[b.tag] = (tagCounts[b.tag] || 0) + 1);
    const topTag = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])[0] || '-';

    document.getElementById('stat-total-books').textContent = totalBooks;
    document.getElementById('stat-total-pages').textContent = totalPages.toLocaleString();
    document.getElementById('stat-top-tag').textContent = topTag;

   
    const goalStatus = document.getElementById('goal-status-message');
    if (goal > 0) {
      const remaining = goal - totalPages;
      if (remaining > 0) {
        goalStatus.textContent = `Progress: ${totalPages.toLocaleString()} / ${goal.toLocaleString()} pages. (${remaining.toLocaleString()} to go!)`;
        goalStatus.className = 'goal-status'; 
        goalStatus.setAttribute('aria-live', 'polite');
      } else {
        goalStatus.textContent = `Goal Met!`;
        goalStatus.className = 'goal-status success'; 
        goalStatus.setAttribute('aria-live', 'assertive');
      }
    } else {
      goalStatus.textContent = "Set goal to track your progress.";
    }

    UI.renderChart(books);
  },

  renderChart: (books) => {
    const chartContainer = document.getElementById('trend-chart');
    chartContainer.innerHTML = ''; 

    const today = new Date();
    const last7Days = [];
    
 
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      last7Days.push(d.toISOString().split('T')[0]);
    }


    const pagesPerDay = last7Days.map(date => {
      const dayTotal = books
        .filter(b => b.dateAdded === date)
        .reduce((sum, b) => sum + Number(b.pages), 0);
      return { date, count: dayTotal };
    });


    const maxPages = Math.max(...pagesPerDay.map(d => d.count)) || 1;


    pagesPerDay.forEach(day => {
      const height = (day.count / maxPages) * 100; 
      
      const barWrapper = document.createElement('div');
      barWrapper.style.display = 'flex';
      barWrapper.style.flexDirection = 'column';
      barWrapper.style.alignItems = 'center';
      barWrapper.style.width = '12%';

      const bar = document.createElement('div');
      bar.className = 'chart-bar';
      bar.style.height = `${Math.max(height, 5)}%`; 
      bar.style.width = '100%';
      bar.title = `${day.date}: ${day.count} pages`; 
      
     
      const label = document.createElement('span');
      label.textContent = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
      label.style.fontSize = '0.75rem';

      barWrapper.appendChild(bar);
      barWrapper.appendChild(label);
      chartContainer.appendChild(barWrapper);
    });
  },

  fillForm: (book) => {
    document.getElementById('book-id').value = book.id || '';
    document.getElementById('book-title').value = book.title || '';
    document.getElementById('book-author').value = book.author || '';
    document.getElementById('book-pages').value = book.pages || '';
    document.getElementById('book-tag').value = book.tag || '';
    document.getElementById('book-date').value = book.dateAdded || '';
    
    document.getElementById('form-view-title').textContent = book.id ? 'Edit Book' : 'Add New Book';
  },

  clearForm: () => {
    document.getElementById('book-form').reset();
    document.getElementById('book-id').value = '';
    document.getElementById('form-view-title').textContent = 'Add New Book';
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  },


  showStatus: (message, type = 'info') => {
    const statusEl = document.getElementById('global-status');
    statusEl.textContent = message;
    statusEl.className = `status-toast ${type}`; 
    statusEl.classList.remove('visually-hidden');
    

    setTimeout(() => {
      statusEl.classList.add('visually-hidden');
    }, 3000);
  },

  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.checked = (theme === 'dark');
  }
};
