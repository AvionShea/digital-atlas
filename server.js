const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public')); // tells express where to find the files

app.get('/search', async (request,response) => {
  try{
    const countryName = request.query.country;
    const apiResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    if (!apiResponse.ok){
      throw new Error(`HTTP error status: ${apiResponse.status}`);
    }
    const data = await apiResponse.json();
    //console.log(data)
    response.send(data);
  }catch (error){
    response.status(500).send({message: error.message});
    console.log(error)
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});