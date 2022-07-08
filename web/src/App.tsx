import { Signin } from "./pages/Signin";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from "./pages/Signup";
import { AuthContextProvider } from "./contexts/authContext";
import { Blog } from "./pages/Blog";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="blog/:id" element={<Blog />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

// #bd98c5
// #f1a7b5
// #94ecd3
