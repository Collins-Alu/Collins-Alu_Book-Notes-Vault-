export const Validators = {


  title: (value) => {
    const regex = /^\S+(?: \S+)*$/;
    if (!regex.test(value)) {
      return "Title can't start or end with spaces and have double spaces.";
    }
    return null;
  },


  pages: (value) => {
    const regex = /^(0|[1-9]\d*)$/;
    if (!regex.test(String(value))) {
      return "Pages must be a whole positive number.";
    }
    return null;
  },


  date: (value) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!regex.test(value)) {
      return "Date must be valid (YYYY-MM-DD).";
    }
    return null;
  },

 
  tag: (value) => {
    const regex = /^[A-Za-z]+(?:-[A-Za-z]+)*$/;
    if (!regex.test(value)) {
      return "genre must be letters only.";
    }
    return null;
  },


  findDuplicateWords: (value) => {
    const regex = /\b(\w+)\s+\1\b/i;
    const match = value.match(regex);
    if (match) {
      return `Repeated word!("${match[1]}").`;
    }
    return null;
  }
};