import axios from 'axios';
import xml2js from 'xml2js';

const parser = xml2js.Parser({ explicitArray: false });

function goodreadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get() // here we put the url to get book details
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              resolve({ description: 'our description' });
              // resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  return { getBookById };
}
export { goodreadsService as default };
