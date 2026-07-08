import { Routes, Route } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import FacilitiesPage from '@/pages/FacilitiesPage';
import ContactPage from '@/pages/ContactPage';

export default function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </PageLayout>
  );
}
