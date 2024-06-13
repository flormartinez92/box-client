import { FakeDataAll } from '.';

const fakeDataAll: FakeDataAll = {
  pending: [
    {
      id: '1',
      packageID: '#0A235',
      direction: 'Rivadavia 2356',
      location: 'CABA',
      status: 'in course',
      nombre: 'Ivan Lucana',
      latlon: [-34.6098624, -58.4023833]
    },
    {
      id: '2',
      packageID: '#0G370',
      direction: 'Yerbal 1785',
      location: 'CABA',
      status: 'pending',
      nombre: 'Nico Faure',
      latlon: [-34.624889, -58.4586556]
    }
  ],
  history: [
    {
      id: '1',
      packageID: '#0G370',
      direction: 'Corrientes 2293',
      location: 'CABA',
      status: 'delivered',
      nombre: 'Flor Martinez',
      latlon: [-34.6044001, -58.4018494]
    },
    {
      id: '2',
      packageID: '#0G370',
      direction: 'Santa Fe 1785',
      location: 'CABA',
      status: 'delivered',
      nombre: 'Vic Canclini',
      latlon: [-34.5957328, -58.3955591]
    },

    {
      id: '3',
      packageID: '#0G370',
      direction: 'Pueyrredon 2335',
      location: 'CABA',
      status: 'delivered',
      nombre: 'Ger Cuevas',
      latlon: [-34.5869197, -58.3983102]
    }
  ]
};

export default { fakeDataAll };
