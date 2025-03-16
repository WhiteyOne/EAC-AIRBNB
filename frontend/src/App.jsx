import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import AllSpots from './components/AllSpots';
import SpotById from './components/SpotById';
import CreateSpot from './components/Navigation/CreateSpot';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AllSpots />
      },
      {
        path:'/spots/:spotId',
        element:<SpotById/>
      },
      {
        path:'/spots/new',
        element:<CreateSpot />
      }
    ]
  },
  {
    path:'*',
    element: <h1>Page Not Found</h1>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;