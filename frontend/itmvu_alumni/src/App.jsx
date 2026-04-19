import { Routes, Route } from 'react-router-dom';

// Public Pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

// Alumni Pages
import AlumniDashboard from './pages/alumni_pages/AlumniDashboard';
import Job from './pages/alumni_pages/Job';
import Profile from './pages/alumni_pages/Profile';
import Mentorship from './pages/alumni_pages/Mentorship';
import Donation from './pages/alumni_pages/Donation';
import Post from './pages/alumni_pages/Post';

// Student Pages
import Student_Dashboard from './pages/Student_Pages/StudentDashboard';
import Student_Profile from './pages/Student_Pages/Student_Profile';
import Student_job from './pages/Student_Pages/Student_job';
import Student_Post from './pages/Student_Pages/Student_Post';
import Events from './pages/Student_Pages/Events';
import StudentMentorship from './pages/Student_Pages/StudentMentorship';
import Chat from './pages/Chat';

// Layouts
import AlumniLayout from './components/Layout/Alumnilayout';
import Studentlayout from './components/Layout/Studentlayout';

const App = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />

      {/* Alumni Routes */}
      <Route path='/alumni' element={<AlumniLayout />}>
        <Route path='dashboard' element={<AlumniDashboard />} />
        <Route path='job' element={<Job />} />
        <Route path='profile' element={<Profile />} />
        <Route path='mentorship' element={<Mentorship />} />
        <Route path='donate' element={<Donation />} />
        <Route path='post' element={<Post />} />
        <Route path='messages/:sessionId' element={<Chat />} />
      </Route>

      {/* Student Routes */}
      <Route path='/student' element={<Studentlayout />}>
        <Route path='dashboard' element={<Student_Dashboard />} />
        <Route path='profile' element={<Student_Profile />} />
        <Route path='job' element={<Student_job />} />
        <Route path='post' element={<Student_Post />} />
        <Route path='event' element={<Events />} />
        <Route path='mentorship' element={<StudentMentorship />} />
        <Route path='messages/:sessionId' element={<Chat />} />
      </Route>

    </Routes>
  );
};

export default App;