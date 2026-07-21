import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import CreateProduct from './pages/Admin/CreateProduct/CreateProduct';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';
import InventoryList from './pages/Admin/InventoryList/InventoryList';
import EditProduct from './pages/Admin/EditProduct/EditProduct';
import AdminLayout from './pages/Admin/AdminLayout/AdminLayout';
import InquiryList from "./pages/Admin/InquiryList/InquiryList";
import Heritage from './pages/Heritage/Heritage';
import About from './pages/About/About';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/heritage" element={<Heritage />} />
      <Route path="/about" element={<About />} />
      
      {/* Standalone Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Protected Admin Shell */}
      {/* Note: AdminLayout MUST contain authentication logic (e.g., verifying a token/cookie) 
          and redirect to /admin/login if the user is unauthenticated. */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="inventory" element={<InventoryList />} />
        <Route path="create" element={<CreateProduct />} />
        <Route path="edit/:id" element={<EditProduct />} />
        <Route path="inquiries" element={<InquiryList />} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}