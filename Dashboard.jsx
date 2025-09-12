import OrderList from '../components/OrderList';
import { useState, useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import CreateOrderButton from '../components/CreateOrderButton';
import { supabase } from '../lib/supabaseClient';

function Dashboard() {
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
      <h1>All products via Supabase</h1>
      {loading ? <p>กำลังโหลด...</p> : (
        <>
          <CreateOrderButton products={products} />
          <ProductList products={products} />
        </>
      )}
    </div>
  );
}

export default Dashboard;