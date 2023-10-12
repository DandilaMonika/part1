const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI1 = "mongoimport --uri mongodb+srv://Monika:<Monika>@cluster0.6515dbh.mongodb.net/<KluDB> --collection <Student_details> --type <FILETYPE> --file <Student_details>"
const mongoURI2 = "mongoimport --uri mongodb+srv://Monika:<Monika>@cluster0.6515dbh.mongodb.net/<KluDB> --collection <Job_offer> --type <FILETYPE> --file <Job_offer>"

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database is connected');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

const student= new mongoose.Schema({
  student_id: String,
  name: String,
  year: Number,
  semester: String,
  specialization: String,
  date: Date,
  time: String,
  CRT_attendance: Boolean,
  Job_id: String,
});

const jobOffer = new mongoose.Schema({
  Job_id: String,
  Company_name: String,
  Date_of_campassing: Date,
  contact_no: String,
  email: String,
});

const Student = mongoose.model('Student', student );
const JobOffer = mongoose.model('Job_offer', jobOffer );
app.post('/create-student', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Could not create student' });
  }
});
app.post('/create-job-offer', async (req, res) => {
  try {
    const jobOffer = await JobOffer.create(req.body);
    res.json(jobOffer);
  } catch (error) {
    console.error('Error creating job offer:', error);
    res.status(500).json({ error: 'Could not create job offer' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});