require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 'ultra-hot',
    name: 'Ultra Hot Capsules',
    image: '/Ultra_Hot_Capsules.webp',
    banglaTitle: 'প্রিমিয়াম কোয়ালিটি আল্ট্রা হট ক্যাপসুল',
    price: 1500,
    oldPrice: 2950,
    images: [
      '/Ultra_Hot_Capsules.webp',
      '/Ultra_Hot_Capsules.webp',
      '/Ultra_Hot_Capsules.webp',
      '/Ultra_Hot_Capsules.webp',
      '/Ultra_Hot_Capsules.webp',
    ],
  },
  {
    id: 'jingseng-plus',
    name: 'JINGSENG PLUS',
    image: '/jingseng-plus.webp',
    banglaTitle: 'প্রিমিয়াম কোয়ালিটি জিনসেং প্লাস',
    price: 1800,
    oldPrice: 2950,
    images: [
      '/jingseng-plus.webp',
      '/jingseng-plus.webp',
      '/jingseng-plus.webp',
      '/jingseng-plus.webp',
      '/jingseng-plus.webp',
    ],
  },
  {
    id: 'ling-long',
    name: 'Ling Long Capsules',
    image: '/Ling-Long%20Capsules.webp',
    banglaTitle: 'প্রিমিয়াম কোয়ালিটি লিং লং ক্যাপসুল',
    price: 1500,
    oldPrice: 2950,
    images: [
      '/Ling-Long Capsules.webp',
      '/Ling-Long Capsules.webp',
      '/Ling-Long Capsules.webp',
      '/Ling-Long Capsules.webp',
      '/Ling-Long Capsules.webp',
    ],
  },
];

const orders = [];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.post('/api/orders', (req, res) => {
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
  } = req.body;

  if (!customerName || !phone || !address) {
    return res.status(400).json({
      success: false,
      message: 'অনুগ্রহ করে নাম, মোবাইল নাম্বার এবং ঠিকানা প্রদান করুন।',
    });
  }

  const newOrder = {
    id: orders.length + 1,
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

  orders.push(newOrder);
  console.log('New order received:', newOrder);

  res.status(201).json({
    success: true,
    message: 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
