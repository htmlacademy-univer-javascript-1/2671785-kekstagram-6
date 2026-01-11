<<<<<<< HEAD
const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
=======
const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
>>>>>>> module12-fix

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(`${SERVER_URL}/data`);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onFail();
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(`${SERVER_URL}/`, {
      method: 'POST',
      body,
    });

    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  } catch (error) {
    onFail();
  }
};

export { getData, sendData };
