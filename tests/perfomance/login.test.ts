// import http from 'k6/http';
// import { check, sleep } from 'k6';
// import encoding from 'k6/encoding';

// export const options = {
//   vus: 10,
//   duration: '30s',
// };

// export default function () {
//   const payload = JSON.stringify({
//     username: 'hoang-demo',
//     password: encoding.b64encode('123456'),
//   });

//   const res = http.post(
//     'https://api.demoblaze.com/login',
//     payload,
//     {
//       headers: { 'Content-Type': 'application/json' },
//     }
//   );

//   check(res, {
//     'status is 200': (r) => r.status === 200,
//     'auth token exists': (r) => r.body.includes('Auth_token'),
//   });

//   sleep(1);
// }
