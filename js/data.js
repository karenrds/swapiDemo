
function getAPI() {
//Starship List for first page only
    fetch('https://swapi.co/api/starships/')
        .then((res) => { return res.json() })
        .then((data) => {
            let result = ``;
            // sort results order by Crew
            data.results.sort((a, b) => a.crew - b.crew);
            data.results = data.results.filter(function( obj ) {
                //ships with a crew less than 10
                return obj.crew > 10;
            });
            //counts appeared in most Films
            var maxlength = Math.max(...data.results.map(x=>x.films.length));
            data.results.forEach((starships) => {
                const {name, model, crew, passengers, films} = starships
                var f = films.length;
                result +=
                    `<div class="grid-item">
                        <h3>${name}</h3>
                        <ul>
                            <li> Model : ${model}</li>
                            <li> Crew : ${crew} </li>
                            <li> Passengers : ${passengers} </li>
                            <li> Films count : ${f}</li>`;
                    //applys icon for most appeared in films
                    if (f === maxlength)
                        {
                            result += `<div class="grid-item-icon"> &#9734;</div>`;
                        }
                result += `</ul></div>`;
            });
            document.getElementById('result').innerHTML = result;
        })
}
window.onload = getAPI;