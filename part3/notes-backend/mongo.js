const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const Name = process.argv[3];
const Num = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.vfcm9.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Note = mongoose.model("Note", noteSchema);

if (process.argv.length === 3) {
  Note.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((note) => console.log(note.name, note.number));
    mongoose.connection.close();
  });
}

const note = new Note({
  name: Name,
  number: Num,
});

if (process.argv.length === 5) {
  note.save().then(() => {
    console.log(`Added ${Name} number ${Num} to phonebook`);
    mongoose.connection.close();
  });
}