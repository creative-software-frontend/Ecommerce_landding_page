export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        success: false,
        message: 'অনুগ্রহ করে সঠিক তথ্য প্রদান করুন।',
      });
    }
  }

  const {
    productId,
    productName,
    customerName,
    phone,
    address,
    deliveryArea,
    quantity,
    note,
    totalPrice,
  } = body || {};

  if (!customerName || !phone || !address) {
    return res.status(400).json({
      success: false,
      message: 'অনুগ্রহ করে নাম, মোবাইল নাম্বার এবং ঠিকানা প্রদান করুন।',
    });
  }

  const newOrder = {
    id: Date.now(),
    productId,
    productName,
    customerName,
    phone,
    address,
    deliveryArea,
    quantity,
    note,
    totalPrice,
    createdAt: new Date().toISOString(),
  };

  console.log('New order received:', newOrder);

  return res.status(201).json({
    success: true,
    message: 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!',
  });
}
