import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoute from './routes/auth.js';
import memberRoute from './routes/member.js';
import membersRoute from './routes/members.js';
import activitiesRoute from './routes/activities.js';

const app = express();

dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

const allowedOrigins = ['http://localhost:3000', 'https://bluesharks.netlify.app'];
app.use(cors());
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.indexOf(origin) === -1) {
//         const msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
//         return callback(msg, false);
//       }
//       return callback(null, true);
//     },
//   })
// );

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});
app.use('/auth', authRoute);
app.use('/member', memberRoute);
app.use('/members', membersRoute);
app.use('/activities', activitiesRoute);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
