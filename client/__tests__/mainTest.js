import wrapper from '@pact-foundation/pact-node';
import path    from "path";
import Pact    from "pact";
import {getMeDogs} from "../index";


const port = 8989;
const server = wrapper.createServer({
               port: port,
               log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
               dir: path.resolve(process.cwd(), 'server/pacts'),
               spec: 2,
               consumer: 'MyConsumer',
               provider: 'MyProvider'
             });

function catchAndContinue(err, done) {
  fail(err);
  done();
}

describe("Dog's API", () => {
  let url = "http://localhost";
  let provider;
  const EXPECTED_BODY = [{dog: 1}];

  afterAll(() => {
      wrapper.removeAllServers();
  });

  afterEach((done) =>{
    server.delete().then(done)
    .catch((err) => catchAndContinue(err, done));
  });

  beforeEach((done) => {
    server.start().then(function() {
      provider = Pact({ consumer: 'MyConsumer', provider: 'MyProvider', port: port });
      done();
    }).catch((err) => catchAndContinue(err, done));
  });

  describe("works", () => {
      beforeEach((done) => {
        provider.addInteraction({
            state: 'i have a list of projects',
            uponReceiving: 'a request for projects',
            withRequest: {
                        method: 'GET',
                        path: '/dogs',
                        headers: { 'Accept': 'application/json' }
                      },
            willRespondWith: {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                        body: EXPECTED_BODY
                      }
        }).then(done)
          .catch((err) => catchAndContinue(err, done));
      });

      afterEach((done) => {
         return provider.finalize()
                        .then(done)
                        .catch((err) => catchAndContinue(err, done));
      });

      it('successfully verifies', (done) => {
        return getMeDogs({url, port}).then((response) => {
          expect(response.headers['content-type']).toEqual('application/json');
          expect(response.data).toEqual(EXPECTED_BODY);
          expect(response.status).toEqual(200);
        },fail).then(done)
          .catch((err) => catchAndContinue(err, done));
      });
    });
});
