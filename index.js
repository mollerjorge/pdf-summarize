const fs = require('fs');
const pdf = require('pdf-parse');
const { Client } = require("@octoai/client")

const client = new Client("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkMjMzOTQ5In0.eyJzdWIiOiJmYTVjZTVlOS05ZjZkLTRhMGEtYjc5Yi1kNmM2MWU3MjE2YTQiLCJ0eXBlIjoidXNlckFjY2Vzc1Rva2VuIiwidGVuYW50SWQiOiI2MzZiZTU1NS0wZGY5LTRmMWEtODVmYy05NWJkZGQwYmUyM2QiLCJ1c2VySWQiOiI1OTNhYWY5Yy1hMWUwLTQwY2YtOGFiZC0xOTIyMjM4ODE5OTgiLCJyb2xlcyI6WyJGRVRDSC1ST0xFUy1CWS1BUEkiXSwicGVybWlzc2lvbnMiOlsiRkVUQ0gtUEVSTUlTU0lPTlMtQlktQVBJIl0sImF1ZCI6IjNkMjMzOTQ5LWEyZmItNGFiMC1iN2VjLTQ2ZjYyNTVjNTEwZSIsImlzcyI6Imh0dHBzOi8vaWRlbnRpdHkub2N0b21sLmFpIiwiaWF0IjoxNzA1Mjc4MzIyfQ.k2_pKgISqOcJQncPC7dYFP5p5oxX6nFIDrrIrxLuB6y-0wsjY-s0ovTsAOVr0_tpBIIcYwlbsRSU8cCAhzbxZoZapvvpj7dGXFGmIXmBDexzbB6Cu16qauJA5gRNpccsqnkP_i7gYb4fvp9Q3IanMM3a_0ngenv_ICvsemwjvY1GjxPEcNrDgrXIJNqJ3qAwNIDwxKnaKoE0aNYAZnbYGjy9I2cSzjFAiAKougsbstBNKYDCmzK-0eSU7mB-rVI2XXriuC60yADsSVU5LbJCrZBwcMfRsYyffCMaJJmntcEGg_5gmV-3Wo4N0fay_O3d3AjTTJVhuHxOzX5Fhv3YjQ");

let pdfFilePath = './document.pdf'; // Replace with your PDF file path

// Reading the PDF file
let dataBuffer = fs.readFileSync(pdfFilePath);

// Parse the PDF
pdf(dataBuffer).then(async function(data) {
    // PDF text
    const completion = await client.chat.completions.create( {
      "messages": [
        {
          "role": "system",
          "content": `Summarize the following text:${data.text}`
        },
      ],
      "model": "mixtral-8x7b-instruct-fp16",
      "max_tokens": 128,
      "presence_penalty": 0,
      "temperature": 0.1,
      "top_p": 0.9
    });   
    console.log(completion.choices[0].message)
}).catch(function(error){
    console.error('Error:', error);
});

