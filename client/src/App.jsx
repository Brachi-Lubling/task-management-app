import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import './App.css'


const LazyHomePage = React.lazy(() => import('./Pages/HomePage'))
const LazyLoginPage = React.lazy(() => import('./Pages/LoginPage'))
const LazyProjectsPage = React.lazy(() => import('./Pages/ProjectsPage'))
const LazyProjectDetailsPage = React.lazy(() => import('./Pages/ProjectDetailsPage'))

// Protected Route Component
function ProtectedRoute({ element }) {
  const user = useSelector(store => store.user.user);
  
  if (!user._id) {
    return <Navigate to="/login" replace />;
  }
  
  return element;
}

function App() {

  return (
    <>
      <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<ProtectedRoute element={<LazyHomePage />} />} />
              <Route path="/login" element={<LazyLoginPage />} />
              <Route path="/Projects" element={<ProtectedRoute element={<LazyProjectsPage />} />} />
              <Route path="/projects/:id" element={<ProtectedRoute element={<LazyProjectDetailsPage />} />} />
            </Routes>
          </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
