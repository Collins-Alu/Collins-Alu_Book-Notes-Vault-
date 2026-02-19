const STORAGE_KEY = 'bookVaultData_v1';
const PREFS_KEY = 'bookVaultPrefs_v1';

export const Storage = {

  
  getBooks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error loading data", e);
      return [];
    }
  },

  saveBooks: (books) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  },


  
  getPrefs: () => {
    const data = localStorage.getItem(PREFS_KEY);
    return data ? JSON.parse(data) : { theme: 'light', goal: 0 };
  },

  savePrefs: (prefs) => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  },



  exportJSON: (data) => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
   
    const link = document.createElement('a');
    link.href = url;
    link.download = `vault_backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },


  validateImport: (data) => {
    if (!Array.isArray(data)) return false;

    if (data.length > 0) {
      const sample = data[0];
      return 'id' in sample && 'title' in sample && 'pages' in sample;
    }
    return true;
  }
};