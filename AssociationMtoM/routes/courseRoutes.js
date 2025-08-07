const express = require('express');
const router = express.Router();
const { Course, Student } = require('../models');


router.post('/', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/students', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    const studentIds = req.body.studentIds;

    const students = await Student.findAll({
      where: { id: studentIds }
    });

    await course.addStudents(students);
    res.json({ message: 'Students added to course successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
