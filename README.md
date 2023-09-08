## Environment:
- Node version: 14.17
- Default Port: 8000

## Read-Only Files:
- test/*

## Commands
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```

## Project Specifications

In this challenge, your task is to implement a simple REST API to manage a collection of GitHub events.

Each event is a JSON entry with the following keys:

*   `id`: the unique ID of the event (Integer)  
*   `type`: the type of the event: 'PushEvent', 'ReleaseEvent', or 'WatchEvent' (String)
*   `public`: whether the event is public, either true or false (Boolean):
*   `repo_id`: the ID of the repository the event belongs to (Integer)
*   `actor_id`: the ID of the user who created the event (Integer)

Here is an example of an event JSON object:

    {
        "type": "PushEvent",
        "public": true,
        "repo_id": 1,
        "actor_id": 1,
    }

You are provided with the implementation of the Event model. The task is to implement the REST service that exposes the `/events/` endpoint, which allows for managing the collection of events records in the following way:

`POST` request to `/events/`:

*   creates a new event
*   expects a JSON event object without an id property as the body payload. You can assume that the given object is always valid except that the type might be invalid. A valid type is one of 'PushEvent', 'ReleaseEvent', or 'WatchEvent'.
*   you can assume that all other values in the payload given to create the object are always valid
*   if the given type is invalid, the response code is 400
*   if the type is valid, it adds the given event object to the collection of events and assigns a unique integer id to it. The first created event must have id 1, the second one 2, and so on.
*   if the type is valid, the response code is 201 and the response body is the created event object, including its id

`GET` request to `/events/`:

*   returns a collection of all events
*   the response code is 200, and the response body is an array of all events ordered by their ids in increasing order

`GET` request to `/repos/:repo_id/events/`:

*   returns a collection of events related to the given repository
*   the response code is 200, and the response body is an array of events related to the given repository ordered by their ids in increasing order

`GET` request to `/users/:user_id/events/`:

*   returns a collection of events created by the given user
*   the response code is 200, and the response body is an array of events created by the given user ordered by their ids in increasing order

`GET` request to `/events/:event_id/`:

*   returns an event with the given id
*   if the matching event exists, the response code is 200 and the response body is the matching event object
*   if there is no event in the collection with the given id, the response code is 404

You should complete the given project so that it passes all the test cases when running the provided unit tests. The project, by default, supports the MongoDB Database using the popular Mongoose ORM.

Note: You are responsible for making sure that each created Trade object has a unique auto-increment Integer ID in your application.

Example requests and responses

**`POST` request to `/events/`**

Request body:

    {
           "type": "PushEvent",
           "public": True,
           "repo_id": 1,
           "actor_id": 1,
     }

The response code is 201, and when converted to JSON, the response body is:

    {
          "id" : 1,
          "type": "PushEvent",
          "public": True,
          "repo_id": 1,
          "actor_id": 1,
    }

This adds a new object to the collection with the given properties and id 1.

**`GET` request to `/events/`**

The response code is 200, and when converted to JSON, the response body (assuming that the below objects are all objects in the collection) is as follows:

    [
          {
            "id": 1,
            "type": "PushEvent",
            "public": true,
            "repo_id": 1,
            "actor_id": 1
          },
          {
            "id": 2,
            "type": "ReleaseEvent",
            "public": true,
            "repo_id": 1,
            "actor_id": 1
          },
          {
            "id": 3,
            "type": "PushEvent",
            "public": true,
            "repo_id": 2,
            "actor_id": 1
          }
    ]
        

**`GET` request to `/repos/1/events/`**

The response code is 200, and when converted to JSON, the response body (assuming that the below objects are all objects with _repo\_id_ 1):

    [
          {
            "id": 1,
            "type": "PushEvent",
            "public": true,
            "repo_id": 1,
            "actor_id": 1
          },
          {
            "id": 2,
            "type": "ReleaseEvent",
            "public": true,
            "repo_id": 1,
            "actor_id": 1
          }
    ]
        

**`GET` request to `/users/1/events/`**

The response code is 200, and when converted to JSON, the response body (assuming that the below objects are all objects with _actor\_id_ 1):

    [
          {
            "id": 1,
            "type": "PushEvent",
            "public": true,
            "repo_id": 1,
            "actor_id": 1
          },
          {
            "id": 2,
            "type": "ReleaseEvent",
            "public": true,
            "repo_id": 2,
            "actor_id": 1
          }
    ]
        

**`GET` request to `/events/1/`**

Assuming that the object with id 1 exists, then the response code is 200 and the response body, when converted to JSON, is as follows:

    {
      "id": 1,
      "type": "PushEvent",
      "public": true,
      "repo_id": 1,
      "actor_id": 1
    }

If an object with id 1 doesn't exist, then the response code is 404 and there are no particular requirements for the response body.
