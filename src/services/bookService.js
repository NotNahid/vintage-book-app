
import Papa from 'papaparse';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTIKcwJe8ngwx1OeGXnfwRq8PKnvBO79yKhb4ydi5h0FqgwsBf-ko6PtLIRj_YF9WNwTNj_Fb1NOcNh/pub?output=csv';

export const fetchBooks = () => {
  return new Promise((resolve, reject) => {
    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const validBooks = results.data.filter(book => book.Title && book.Title.trim() !== '');
        resolve(validBooks);
      },
      error: (err) => {
        reject('Failed to load data. Please check the spreadsheet URL and permissions.');
        console.error("Error fetching or parsing data:", err);
      }
    });
  });
};
