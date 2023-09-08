import chai from "chai";
import { Event } from "../models/event.js";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import { app } from "../app.js";
import BlueBird from "bluebird";

const should = chai.should();
chai.use(chaiHttp);

const port = process.env.PORT || 8000;
const server = app.listen(port);

const setup = (...eventObjects) => {
  return BlueBird.mapSeries(eventObjects, event => {
      return chai.request(server)
          .post('/events')
          .send(event)
          .then(response => {
              return response.body;
          })
  })
}

describe("github_events_api_medium", function () {
  const event1 = {
    "type": "PushEvent",
          "public": false,
          "repo_id": 1,
          "actor_id": 1,
}

const event2 = {
  type: "PushEvent",
  public: true,
  repo_id: 2,
  actor_id: 1,
};

const event3 = {
  "type": "PushEvent",
        "public": false,
        "repo_id": 1,
        "actor_id": 2,
}
  this.afterAll(async function () {
    await mongoose.connection.close();
    server.close();
  });

  this.beforeAll(async function () {
    await Event.deleteMany({});
  });

  this.afterEach(async function () {
    await Event.deleteMany({});
  });

  describe("Testing the backend", () => {
    it("Making post request to event at /events route", async function () {
      try {
        const res = await chai.request(server).post("/events").send(event1);

        res.should.have.status(201);

        res.body.should.have.property("id");
        res.body.id.should.eq(1);

        delete res.body.id

        res.body.should.eql(event1)

      } catch (error) {
        throw new Error(error);
      }
    });

    it("Second post request should have id equal to 2", async function () {
      try {
        const results = await setup(event1);

        const res = await chai.request(server).post("/events").send(event2);

        res.should.have.status(201);

        
        res.body.should.have.property("id");
        res.body.id.should.eq(2);
        
        delete res.body.id
        
        res.body.should.eql(event2)
        
        
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it("New Id should not be same after deleting some event", async function () {
      try {

        const results = await setup(event1,event2,event3);

        const removed = await Event.deleteOne({id : 2});

        const res = await chai.request(server).post("/events").send(event2);

        res.should.have.status(201);

        
        res.body.should.have.property("id");
        res.body.id.should.eq(4);
        
        delete res.body.id
        
        res.body.should.eql(event2)
      } catch (error) {
        throw new Error(error);
      }
    });

    it("Wrong post request of invalid type", async function () {
      try {
        const res = await chai.request(server).post("/events").send({
          type: "xyz",
          public: false,
          repo_id: 1,
          actor_id: 1,
        });

        res.should.have.status(400);

      } catch (error) {
        throw new Error(error);
      }
    });

    it("Get request to /events should return all responses", async function () {
      try {

        const results = await setup(event1,event2);

        const res = await chai.request(server).get("/events");

        res.should.have.status(200);

        res.body[0].should.have.property("id");
        res.body[0].id.should.eq(1);

        res.body[0].should.have.property("type");
        res.body[0].type.should.eq("PushEvent");

        res.body[0].should.have.property("public");
        res.body[0].public.should.eq(false);

        res.body[0].should.have.property("repo_id");
        res.body[0].repo_id.should.eq(1);

        res.body[0].should.have.property("actor_id");
        res.body[0].actor_id.should.eq(1);

        res.body[1].should.have.property("id");
        res.body[1].id.should.eq(2);

        res.body[1].should.have.property("type");
        res.body[1].type.should.eq("PushEvent");

        res.body[1].should.have.property("public");
        res.body[1].public.should.eq(true);

        res.body[1].should.have.property("repo_id");
        res.body[1].repo_id.should.eq(2);

        res.body[1].should.have.property("actor_id");
        res.body[1].actor_id.should.eq(1);
        
        
      } catch (error) {
        throw new Error(error);
      }
    });

    it("Get request to /repos/2/events should return repo with id = 2", async function () {
      try {

        const results = await setup(event2);

        const res = await chai.request(server).get("/repos/2/events");

        res.should.have.status(200);

        res.body[0].should.have.property("id");
        res.body[0].id.should.eq(1);

        res.body[0].should.have.property("type");
        res.body[0].type.should.eq("PushEvent");

        res.body[0].should.have.property("public");
        res.body[0].public.should.eq(true);

        res.body[0].should.have.property("repo_id");
        res.body[0].repo_id.should.eq(2);

        res.body[0].should.have.property("actor_id");
        res.body[0].actor_id.should.eq(1);
        
        
      } catch (error) {
        throw new Error(error);
      }
    });

    it("Get request to /repos/:id/events should return array of increasing id's", async function () {
      try {

        const results = await setup(event1,event3);

        const res = await chai.request(server).get("/repos/1/events");

        res.body[0].id.should.eql(1)

        res.body[1].id.should.eql(2)
      } catch (error) {
        throw new Error(error);
      }
    });

    it("Get request to /events/2 should return event with id = 2", async function () {
      try {

        const results = await setup(event1,event2);

        const res = await chai.request(server).get("/events/2");

        res.should.have.status(200);

        res.body[0].should.have.property("id");
        res.body[0].id.should.eq(2);

        res.body[0].should.have.property("type");
        res.body[0].type.should.eq("PushEvent");

        res.body[0].should.have.property("public");
        res.body[0].public.should.eq(true);

        res.body[0].should.have.property("repo_id");
        res.body[0].repo_id.should.eq(2);

        res.body[0].should.have.property("actor_id");
        res.body[0].actor_id.should.eq(1);
        
        
      } catch (error) {
        throw new Error(error);
      }
    });

    it("Get request to /events/:id with a non existing id should return status 404", async function () {
      try {

        const results = await setup(event1,event2);
          
        const res = await chai.request(server).get("/events/2");

        res.should.have.status(200);  

        const res1 = await chai.request(server).get("/events/4");

        res1.should.have.status(404);
      } catch (error) {
        throw new Error(error);
      }
    });

    it("Get request to /users/1/events should return event with actor_id = 1", async function () {
      try {

        const results = await setup(event1,event2)

        const res = await chai.request(server).get("/users/1/events");

        res.should.have.status(200);

        res.body[0].should.have.property("id");
        res.body[0].id.should.eq(1);

        res.body[0].should.have.property("type");
        res.body[0].type.should.eq("PushEvent");

        res.body[0].should.have.property("public");
        res.body[0].public.should.eq(false);

        res.body[0].should.have.property("repo_id");
        res.body[0].repo_id.should.eq(1);

        res.body[0].should.have.property("actor_id");
        res.body[0].actor_id.should.eq(1);

        res.body[1].should.have.property("id");
        res.body[1].id.should.eq(2);

        res.body[1].should.have.property("type");
        res.body[1].type.should.eq("PushEvent");

        res.body[1].should.have.property("public");
        res.body[1].public.should.eq(true);

        res.body[1].should.have.property("repo_id");
        res.body[1].repo_id.should.eq(2);

        res.body[1].should.have.property("actor_id");
        res.body[1].actor_id.should.eq(1);
        
        
      } catch (error) {
        throw new Error(error);
      }
    });

    it("Get request to /users/1/events should return event in increasing order of id", async function () {
      try {

        const results = await setup(event1,event2)

        const res = await chai.request(server).get("/users/1/events");

        res.should.have.status(200);

        res.body[0].id.should.eq(1);

        res.body[1].id.should.eq(2);
      } catch (error) {
        throw new Error(error);
      }
    });

   
  });
});
