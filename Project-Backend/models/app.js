// require('dotenv').config();
// const express = require('express');
// const app = express();
// const path = require('path');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const User = require('./models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // Middleware setup
// app.set("view engine", "ejs");
// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Serve homepage static files (put before API routes)
// app.use(express.static(path.join(__dirname, '../homepage')));

// // ✅ Serve first.html on root
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../Dashboard/public/index.html'));
// });

// // MongoDB connection
// mongoose.connect(
//     "mongodb+srv://samridhi240705:UeFOocWerBWwcCIX@cluster0.dok22l2.mongodb.net/dustcollector?retryWrites=true&w=majority"
//   )  
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));
  

// const SECRET_KEY = process.env.SECRET_KEY || "Siddhi_Samridhi_123";

// // Register route
// app.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, email, password: hashedPassword });
//     await user.save();
//     res.send('User Registered Successfully');
//   } catch (err) {
//     res.status(500).send('Error while Registering');
//   }
// });

// // Login route
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
  
//       if (!user) {
//         return res.status(400).json({ message: "Invalid Credentials" });
//       }
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: "Invalid Credentials" });
//       }
  
//       const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
  
//       res.json({
//         message: "Login Successful",
//         token,
//         user: {
//           username: user.username,
//           email: user.email
//         }
//       });
//     } catch (err) {
//       console.error("❌ Error while Logging In:", err); // 🧠 this will show you the exact crash
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });

//   // ✅ Start the server
//     app.listen(3001, () => {
//         console.log("Server running on port 3001");
//     });

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ CORS Configuration
const allowedOrigins = [
  "https://industry-dust-monitor-v4fs.vercel.app",  // Your Vercel frontend
  "http://localhost:3000"                           // Local frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware setup
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve homepage static files (put before API routes)
app.use(express.static(path.join(__dirname, '../homepage')));

// ✅ Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Dashboard/public/index.html'));
});

// ✅ MongoDB connection
mongoose.connect(
  "mongodb+srv://samridhi240705:UeFOocWerBWwcCIX@cluster0.dok22l2.mongodb.net/dustcollector?retryWrites=true&w=majority"
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Secret Key
const SECRET_KEY = process.env.SECRET_KEY || "Siddhi_Samridhi_123";

// ✅ Register Route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.send('User Registered Successfully');
  } catch (err) {
    res.status(500).send('Error while Registering');
  }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
      message: "Login Successful",
      token,
      user: {
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("❌ Error while Logging In:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Start the server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});

  
  
