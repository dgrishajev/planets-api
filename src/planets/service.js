import request from 'request-promise-native';
import { NotFound } from 'http-errors';

const API_URL = 'https://swapi.co/api/planets';

const findPlanets = (url, planets, resolve, reject) => {
  request({ url, json: true })
    .then(({ results, next }) => {
      const retrievedPlanets = planets.concat(results);
      if (next) return findPlanets(next, retrievedPlanets, resolve, reject);
      return resolve(retrievedPlanets);
    })
    .catch(reject);
};

export const findAll = (req, res, next) => new Promise(
  resolve => findPlanets(API_URL, [], resolve, next),
)
  .then(planets => res.send(planets))
  .catch(next);

export const findOne = ({ params: { id } }, res, next) => request({
  url: `${API_URL}/${id}`,
  json: true,
})
  .then(planet => {
    if (planet) {
      return res.send(planet);
    }

    throw new NotFound('Planet not found');
  })
  .catch(next);
