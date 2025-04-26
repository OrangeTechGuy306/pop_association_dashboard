import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard/Dashboard"
import MemberPage from "./pages/member/member"
import ExecutivesPage from "./pages/executives/executives"
import AdminsPage from "./pages/admins/admins"
import SiginPage from "./pages/signin/signin"
import ZonesPage from "./pages/zones/zones"
import PostsPage from "./pages/posts/post"

 

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<MemberPage />} />
          <Route path="/executives" element={<ExecutivesPage />} />
          <Route path="/admin" element={<AdminsPage />} />
          <Route path="/auth/signin" element={<SiginPage />} />
          <Route path="/zones" element={<ZonesPage />} />
          <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
