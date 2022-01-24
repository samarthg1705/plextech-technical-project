/* Do NOT add any more modules */
var http = require('http');
const { Http2ServerRequest } = require('http2');
var url = require('url');

const PET = require("./logic"); 


http.createServer(async function (req, res) {

    var q = url.parse(req.url, true);
    console.log(q.path)


//Find all pets (GET Request)
    /*if (req.url === "/api/pets" && req.method === "GET") {  
      const pets = await new PET().getPets();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(pets));
      //console.log(pets)
  }*/
  
//Find Pet by ID (GET Request)
  if (req.url.match(/\/api\/pet\/([0-9]+)/) && req.method === "GET") {   
    try {
        const id = req.url.split("/")[3];
        const pet = await new PET().getPet(id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(pet));
        //console.log(pet)
    } catch (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error }));
    }
}

//Delete Pet BY ID (Delete Request)
else if (req.url.match(/\/api\/pet\/([0-9]+)/) && req.method === "DELETE") {
  try {
      const id = req.url.split("/")[3];
      let message = await new PET().deletePet(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message }));
  } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
  }
}

//Edit Pet (PUT Request)
else if (req.url.match(/\/api\/pet\/([0-9]+)/) && req.method === "PUT") {
  try {
      const id = req.url.split("/")[3];
      let updatedpet = await new Pet().updatePet(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedpet));
  } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
  }
}

//Add Pet (POST Request)
else if (req.url === "/api/pet" && req.method === "POST") {
  let petdata = await getData(req);
  let pet = await new PET().createPet(JSON.parse(petdata));
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(pet));
}


    /* Catch-All */
    else{
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write("Not Found")
    res.end();
   }
}).listen(8000);

console.log('Server running at http://localhost:8000');

