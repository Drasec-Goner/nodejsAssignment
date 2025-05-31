const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// GET /person: List all people (JSON)
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: 'Error loading people' });
  }
});

// GET /person/:id: Get a single person (JSON)
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: 'Error loading person' });
  }
});

// POST /person: Create a new person (JSON)
router.post('/', async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (err) {
    res.status(400).json({ error: 'Error creating person: ' + err.message });
  }
});

// PUT /person/:id: Update a person (JSON)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Person not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Error updating person: ' + err.message });
  }
});

// DELETE /person/:id: Delete a person (JSON)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Person not found' });
    res.json({ message: 'Person deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting person' });
  }
});

module.exports = router;