function onJson(json) {
  console.log('JSON ricevuto');
  console.log(json);
  
  const library = document.querySelector('#album-view');
  library.innerHTML = '';
  
  const results = json.tracks.items;
  let num_results = results.length;
  
  if(num_results > 3)
    num_results = 3;
  
  for(let i=0; i<num_results; i++)
  {
    
    const track_data = results[i]
    
    const title = track_data.name;
    const url = track_data.external_urls;
    const l = url.spotify;
    const testo = "riproduci il brano";
    const selected_image = track_data.album.images[0].url;
    
    const album = document.createElement('div');
    album.classList.add('album');
    
    const img = document.createElement('img');
    img.src = selected_image;
    
    const caption = document.createElement('span');
    caption.textContent = title;
    
    const link = document.createElement('a');
    link.href = l;
    link.textContent = testo;
    link.classList.add('link');

    album.appendChild(img);
    album.appendChild(caption);
    album.appendChild(link);
    
    library.appendChild(album);
  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search(event)
{
  event.preventDefault();
  const track_input = document.querySelector('#track');
  const track_value = encodeURIComponent(track_input.value);
  console.log('Eseguo ricerca: ' + track_value);
  fetch("https://api.spotify.com/v1/search?type=track&q=" + track_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

const client_id = '054a24132d1d44ca9ae2964263989a30';
const client_secret = '902fe3e6c702404688be8a3de5f69fa3';

let token;
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);
const form = document.querySelector('form');
form.addEventListener('submit', search)