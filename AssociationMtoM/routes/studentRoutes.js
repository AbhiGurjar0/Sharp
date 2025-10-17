const express = require('express');
const router = express.Router();
const { Student, Course } = require('../models');


router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/courses', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    const courseIds = req.body.courseIds;

    const courses = await Course.findAll({
      where: { id: courseIds }
    });

    await student.addCourses(courses);
    res.json({ message: 'Courses added to student successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
