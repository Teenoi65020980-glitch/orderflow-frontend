import { supabase } from '../lib/supabaseClient';

function CreateOrderButton({ products }) {
  async function createOrderWithItems() {
    if (!products || products.length < 2) {
      alert(`พบสินค้าเพียง ${products.length} รายการ กรุณาเพิ่มสินค้าให้ครบก่อนสร้างคำสั่งซื้อ`);
      return;
    }

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
    const items = [
      { product_id: products[0].id, quantity: 2 },
      { product_id: products[1].id, quantity: 1 }
    ];

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(items.map(item => ({ ...item, order_id: orderId })));

    if (itemsError) {
      alert('เพิ่มรายการสินค้าไม่สำเร็จ');
      return;
    }

    alert(`✅ สร้าง order สำเร็จ: ${orderId}`);
  }

  return (
    <button onClick={createOrderWithItems}>
      ยืนยันคำสั่งซื้อ
    </button>
  );
}

export default CreateOrderButton;