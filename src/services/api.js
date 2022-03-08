const fetchAwesomeApi = async (filter) => {
  try {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const dataBase = await response.json();

    if (filter?.coins) {
      return Object.keys(dataBase).filter((current) => current !== 'USDT');
    }

    return dataBase;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetchAwesomeApi;
