import { Signin } from "./pages/Signin";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from "./pages/Signup";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

// #bd98c5
// #f1a7b5
// #94ecd3
