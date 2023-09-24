export async function getPlanets() {
  const URL = 'https://swapi.dev/api/planets';
  const response = await fetch(URL);
  const data = response.json();
  return data;
}
