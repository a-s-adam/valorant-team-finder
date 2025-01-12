import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import FindTeam from '../pages/FindTeam/index';
import TeamDetails from '../pages/TeamDetails/index';
import Login from '../pages/Login/index';
import Register from '../pages/Register/index';
import NotFound from '../pages/NotFound';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/find-team"
        element={
          <PrivateRoute>
            <FindTeam />
          </PrivateRoute>
        }
      />
      <Route
        path="/teams/:id"
        element={
          <PrivateRoute>
            <TeamDetails />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 