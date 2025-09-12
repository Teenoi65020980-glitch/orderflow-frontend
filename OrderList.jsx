import { useEffect, useState } from 'react';
import axios from 'axios';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Supabase config
  const url = 'https://pidseszgiwkwktyyvajy.supabase.co/rest/v1/orders';
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZHNlc3pnaXdrd2t0eXl2YWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNzYxODAsImV4cCI6MjA3MTg1MjE4MH0.5HfMeeVE7l_dib4pVCmAa5w8kZlP0xPfIvpW1-EfrJM';

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`
  };

  useEffect(() => {
    axios.get(url, { headers })
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API error:', err.response?.data || err.message);
        setError('ไม่สามารถโหลดข้อมูลออเดอร์ได้');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>📦 รายการออเดอร์</h2>

      {loading && <p>🔄 กำลังโหลดข้อมูล...</p>}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      {!loading && !error && (
        orders.length === 0 ? (
          <p>ไม่มีออเดอร์ในระบบ</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {orders.map(order => {
              const date = order.created_at
                ? new Date(order.created_at).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : 'ไม่ระบุวันที่';

              const quantity = order.quantity ?? 1;
              const total = order.total_price
                ? (order.total_price * quantity).toLocaleString()
                : 'ไม่ระบุ';

              return (
                <li key={order.id} style={{
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}>
                  <strong>🆔 {order.id}</strong><br />
                  📅 วันที่: {date}<br />
                  👤 ผู้ใช้: {order.user_id ?? 'ไม่ระบุ'}<br />
                  🚚 สถานะ: {order.status}<br />
                  🧮 จำนวน: {quantity} ชิ้น<br />
                  💰 ยอดรวม: {total} บาท
                </li>
              );
            })}
          </ul>
        )
      )}
    </div>
  );
}

export default OrderList;
