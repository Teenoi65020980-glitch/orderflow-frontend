import { supabase } from './supabaseClient.js'

console.log('Signup script loaded') // ✅ ตรวจว่า script โหลดสำเร็จ

document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('Form submitted') // ✅ ตรวจว่า event listener ทำงาน

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  console.log('Calling Supabase signup...') // ✅ ตรวจว่าเรียก API แล้ว

  const { data, error } = await supabase.auth.signUp({ email, password })

  console.log('Signup response:', data, error)

  if (error) {
    alert('Signup failed: ' + error.message)
  } else {
    alert('Signup successful! User ID: ' + data.user.id)
    console.log('User created:', data.user)
  }
})
