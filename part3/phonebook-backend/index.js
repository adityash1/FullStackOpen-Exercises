const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

require("dotenv").config({ path: "./.env" });
const Person = require("./models/person");

// custom middleware for logging
// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };
// app.use(requestLogger);

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

// custom token for :body (Calling morgan.token() using the same name as an existing token will overwrite that token definition.)
morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (req, res) => {
  res.send(build / index.html);
});

app.get("/index.html", (req, res) => {
  res.send(build / index.html);
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons.map((person) => person.toJSON()));
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  const currentDate = new Date().toLocaleString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  Person.find({}).then((persons) => {
    response.send(
      `
          <div>
              <p>Phonebook has info for ${persons.length} people</p>
          </div>
          <div>
              <p>${currentDate} (${timeZone})</p>
          </div>`
    );
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
  // .catch((error) => {
  //   console.log(error);
  //   response.status(400).send({ error: "malformatted id" });
  // });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const personName = body.name;
  const personNumber = body.number;

  if (Object.keys(body).length === 0) {
    return response.status(400).json({
      error: "name or content missing",
    });
  }

  const person = new Person({
    name: personName,
    number: personNumber,
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
      response.json(savedAndFormattedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON());
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
