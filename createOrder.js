// createOrders.js
import supabase from './supabaseClient.js';

// 🔹 ดึงข้อมูลสินค้า
export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('❌ ดึงสินค้าไม่สำเร็จ:', error.message);
      return [];
    }

    console.log('✅ สินค้าที่มีอยู่:', data);
    return data;
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาด:', err.message);
    return [];
  }
}

// 🔸 สร้าง order พร้อมรายการสินค้า
export async function createOrderWithItems(items) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) {
      alert('ไม่พบผู้ใช้');
      return;
    }

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([{ user_id: userId }])
      .select();

    if (orderError || !orderData?.[0]) {
      alert('สร้าง order ไม่สำเร็จ');
      return;
    }

    const orderId = orderData[0].id;

    const orderItems = items.map(item => ({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      alert('เพิ่มรายการสินค้าไม่สำเร็จ');
      return;
    }

    alert(`✅ สร้าง order สำเร็จ: ${orderId}`);
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาด:', err.message);
  }
}
