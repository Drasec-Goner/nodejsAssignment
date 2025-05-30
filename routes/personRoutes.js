const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// GET /person: Displays a table with a list of people
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    let html = `
      <h1>People List</h1>
      <a href="/person/new">Add Person</a>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>Name</th><th>Age</th><th>Gender</th><th>Mobile</th><th>Actions</th>
        </tr>
        ${people.map(p => `
          <tr>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.gender}</td>
            <td>${p.mobile}</td>
            <td>
              <a href="/person/edit/${p._id}">Edit</a> |
              <a href="/person/delete/${p._id}">Delete</a>
            </td>
          </tr>
        `).join('')}
      </table>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send('Error loading people');
  }
});

// GET /person/new: Displays a form to create a single person
router.get('/new', (req, res) => {
  res.send(`
    <h1>Add Person</h1>
    <form method="POST" action="/person">
      Name: <input name="name" required /><br/>
      Age: <input name="age" type="number" /><br/>
      Gender: <input name="gender" /><br/>
      Mobile: <input name="mobile" /><br/>
      <button type="submit">Create</button>
    </form>
    <a href="/person">Back to list</a>
  `);
});

// POST /person: Handles form submission to create a person
router.post('/', async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.redirect('/person');
  } catch (err) {
    res.status(400).send('Error creating person: ' + err.message);
  }
});

// GET /person/edit/:id: Displays a form to edit a person
router.get('/edit/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).send('Person not found');
    res.send(`
      <h1>Edit Person</h1>
      <form method="POST" action="/person/update/${person._id}">
        Name: <input name="name" value="${person.name}" required /><br/>
        Age: <input name="age" type="number" value="${person.age}" /><br/>
        Gender: <input name="gender" value="${person.gender}" /><br/>
        Mobile: <input name="mobile" value="${person.mobile}" /><br/>
        <button type="submit">Update</button>
      </form>
      <a href="/person">Back to list</a>
    `);
  } catch (err) {
    res.status(500).send('Error loading person');
  }
});

// POST /person/update/:id: Handles form submission to update a person
router.post('/update/:id', async (req, res) => {
  try {
    await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect('/person');
  } catch (err) {
    res.status(400).send('Error updating person: ' + err.message);
  }
});

// GET /person/delete/:id: Displays a confirmation page to delete a person
router.get('/delete/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).send('Person not found');
    res.send(`
      <h1>Delete Person</h1>
      <p>Are you sure you want to delete ${person.name}?</p>
      <form method="POST" action="/person/remove/${person._id}">
        <button type="submit">Yes, Delete</button>
      </form>
      <a href="/person">Cancel</a>
    `);
  } catch (err) {
    res.status(500).send('Error loading person');
  }
});

// POST /person/remove/:id: Handles deletion
router.post('/remove/:id', async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.redirect('/person');
  } catch (err) {
    res.status(500).send('Error deleting person');
  }
});

module.exports = router;