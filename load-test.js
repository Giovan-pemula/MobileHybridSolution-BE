import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp-up to 20 virtual users
    { duration: '1m', target: 50 },  // Sustain at 50 users (moderate load)
    { duration: '30s', target: 0 },   // Ramp-down to 0 users
  ],
  thresholds: {
    // reliability metric: HTTP request fail rate must be less than 0.1%
    'http_req_failed': ['rate<0.001'],
    // latency metric: 95% of requests must complete under 500ms
    'http_req_duration': ['p(95)<500'],
  },
};

// Change this to your deployed Vercel URL
const BASE_URL = 'https://mobile-hybrid-solution-be.vercel.app/'; 

export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Test courses read endpoint (High read traffic scenario)
  const res = http.get(`${BASE_URL}/courses`, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body has content': (r) => r.body && r.body.length > 0,
  });

  sleep(1); // sleep for 1 second between virtual user iterations
}
