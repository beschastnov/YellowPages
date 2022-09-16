import express from 'express';
import axios from 'axios';
import userCheck from '../middlewares/userCheck';
import authCheck from '../middlewares/authCheck';
import { Number } from '../db/models';

// геокодер - ruqevb3357
//  .then((data) => setTimeout(() => { console.log(data.data.result); }, 0));
// Москва, Садовническая, 25
// const resultGeocoder = await axios.get(`https://catalog.api.2gis.com/3.0/items/geocode?q=${encodeURIComponent(place)}&fields=items.point&key=ruqevb3357`);
// console.log(resultGeocoder.data.result.items[0]);
// ===>
// {
//   address_name: '11',
//   building_name: 'Орджоникидзе 11, дисконт-центр',
//   full_name: 'Москва, Орджоникидзе 11, дисконт-центр',
//   id: '4504235282693584',
//   name: 'Орджоникидзе 11, дисконт-центр',
//   point: { lat: 55.709305, lon: 37.596241 },
//   purpose_name: 'Shopping center',
//   type: 'building'
// }

const router = express.Router();

router.post('/number', authCheck, async (req, res) => {
  try {
    const { name, phone, place } = req.body;
    const resultGeocoder = await axios.get(`https://catalog.api.2gis.com/3.0/items/geocode?q=${encodeURIComponent(place)}&fields=items.point&key=ruqevb3357`);
    console.log(resultGeocoder.data.meta.code);
    if (resultGeocoder.data.meta.code === 200 && name !== '' && phone !== '' && place !== '') {
      const currNumber = await Number.create({
        company: name,
        phone,
        place: resultGeocoder.data.result.items[0].full_name,
        lat: resultGeocoder.data.result.items[0].point.lat,
        lon: resultGeocoder.data.result.items[0].point.lon,
        user_id: req.session.userSession.id,
      });
      res.json(currNumber);
    } else {
      res.sendStatus(418);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get('/map/geo/:id', async (req, res) => {
  const { id } = req.params;
  const oneNumber = await Number.findByPk(id);
  res.json(oneNumber);
});

router.get('/numbers', async (req, res) => {
  const allNumbers = await Number.findAll({ order: [['company', 'DESC']] });
  res.json(allNumbers);
});

router.get('/mynumbers', async (req, res) => {
  const allNumbers = await Number.findAll({ where: { user_id: res.locals.userSession.id }, order: [['company', 'DESC']] });
  res.json(allNumbers);
});

router.delete('/number/:id', userCheck, async (req, res) => {
  const { id } = req.params;
  await Number.destroy({ where: { id } });
  res.sendStatus(200);
});

router.get('/number/:id', async (req, res) => {
  const oneNumber = await Number.findOne({ where: { id: req.params.id } });
  res.json(oneNumber);
});

router.put('/number/:id', async (req, res) => {
  console.log(req.params.id);
  await Number.update(req.body, { where: { id: req.params.id } });
  res.sendStatus(200);
});

export default router;
