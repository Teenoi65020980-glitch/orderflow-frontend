import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('❌ ดึงสินค้าไม่สำเร็จ:', error.message);
        setProducts([]);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>รายการสินค้า</h2>
      {loading ? <p>กำลังโหลด...</p> : (
        <ul>
          {products.map(p => (
            <li key={p.id}>{p.name} - {p.price} บาท</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;