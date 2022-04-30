/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const checked = 'images/checked.png';
const unchecked ='images/unchecked.png';
const scores = { blep: 0, burger: 0, cart: 0,dopey: 0, happy: 0, nerd: 0,shy: 0, sleeping: 0, sleepy: 0};

function onClick(event)
{
  const box = event.currentTarget;
  const container = box.parentElement;
  const vector = container.querySelectorAll('div');

  for(const items of vector){
    items.classList.remove('selezionato');
    items.classList.add('scartato');
    const image = items.querySelector('.checkbox');
    image.src = unchecked;
  }

  box.classList.remove('scartato');
  box.classList.add('selezionato');
  const image = box.querySelector('.checkbox');
  image.src = checked;


  const selezionati = document.querySelectorAll('.selezionato');
  const boxes = document.querySelectorAll('.choice-grid div');
  const risultato = document.querySelector('#risultato');
  const titolo = risultato.querySelector('h1');
  const testo = risultato.querySelector('p');
  let flag = false;

  if(selezionati.length == 3){
    for (const box of boxes)
    {
      box.removeEventListener('click', onClick);
    }

    for(const selezionato of selezionati){
      const choiceid = selezionato.dataset.choiceId;
      const questionid = selezionato.dataset.questionId;

      if(questionid == 'one'){
        var primarisposta = choiceid;
      }
      scores[choiceid]=scores[choiceid]+1;
    }

    for (const property in scores) {
      if(scores[property]>=2){
        titolo.textContent = RESULTS_MAP[property].title;
        testo.textContent = RESULTS_MAP[property].contents;
        search();
        flag = true;
        break;
      }
    }

    if(flag === false){
      titolo.textContent = RESULTS_MAP[primarisposta].title;
      testo.textContent = RESULTS_MAP[primarisposta].contents;
      search();
    }

    risultato.classList.remove('hidden');
  }
}

function refresh(){
  const boxes = document.querySelectorAll('.choice-grid div');
  const risultato = document.querySelector('#risultato');

  for(const box of boxes){
    box.classList.remove('selezionato');
    box.classList.remove('scartato');
    const image = box.querySelector('.checkbox');
    image.src = unchecked;
    box.addEventListener('click', onClick);
  }

  risultato.classList.add('hidden');

  for (const property in scores) {
    scores[property] = 0;
  }

  scrollTo(0,0);
}

const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes)
{
  box.addEventListener('click', onClick);
}

const button = document.querySelector('#reset');
button.addEventListener('click', refresh);


/* ---------- API GIPHY ---------- */
const numResults = 10;

function onJson_gif(json) {
  console.log('JSON GIF ricevuto');
  console.log(json);
  const library = document.querySelector('#gif');
  library.innerHTML = '';
  const results = json.data

	const i = Math.floor(Math.random() * numResults);
	const immagine = results[i].images.downsized_medium.url;
  const img = document.createElement('img');
  img.src = immagine;
	
  library.appendChild(img);
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function getToken(json){
	token_data = json;
	console.log(json);
}

function onTokenResponse(response) {
  return response.json();
}

function search(){
	const text = 'disney princess';
	gif_request = gif_api_endpoint + '?api_key='  + key_gif + '&q=' + text + '&limit=' + numResults;
	fetch(gif_request).then(onResponse).then(onJson_gif);
}

const key_gif = 'ljRK5FzsCRIE3QGfc4K1yviXcjQiajBK';				
const gif_api_endpoint = 'http://api.giphy.com/v1/gifs/search' 