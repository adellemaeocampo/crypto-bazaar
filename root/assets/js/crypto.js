var cryptoList = document.querySelector("#crypto-list");
var coinData;
var coinURL  = "https://api.coinranking.com/v2/coins?limit=3&timePeriod=30d";

async function getCoinsList(){

    try
    {
        var response = await fetch(coinURL);

        if (!response.ok)
        {
            throw new Error("Error! Status:${repsonse.status}");
        }

        var data = await response.json();
        setTimeout(function() {
            coinData = data.data.coins;
            console.log("testtttttttttttttttttttttttttttttttttttttttttttttttttt");
            }, 8000);
            return data;
              
    }catch (error)
    {
        console.log("Fetching error:", error);
    }
    
}

getCoinsList();

// function getCoinsList() {
//     fetch(coinURL)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {

//             setTimeout(function() {
//             coinData = data.data.coins;
//             }, 20000);

//             console.log(coinData[1].name);
//         })
//         .catch(error => {
//             console.log("Fetching error:", error);
//         });
// }



console.log(coinData[1].name);


