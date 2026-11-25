import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../config';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Flame,
  Leaf,
  Minus,
  PackageCheck,
  PhoneCall,
  Plus,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from 'lucide-react';

const HERO_HIGHLIGHTS = [
  { num: '01', text: '১০০% অরিজিনাল প্রোডাক্ট' },
  { num: '02', text: 'সারা দেশে ক্যাশ অন ডেলিভারি' },
  { num: '03', text: 'দ্রুত ডেলিভারি সুবিধা' },
  { num: '04', text: 'প্রিমিয়াম প্যাকিং' },
];

const WHY_USE_FEATURES = [
  {
    num: '01',
    title: 'প্রাকৃতিক উপাদান',
    desc: 'সম্পূর্ণ প্রাকৃতিক এবং নিরাপদ উপাদান দিয়ে তৈরি।',
  },
  {
    num: '02',
    title: 'দ্রুত কার্যকারিতা',
    desc: 'অল্প সময়ের মধ্যেই আপনি পরিবর্তন অনুভব করবেন।',
  },
  {
    num: '03',
    title: 'বিশ্বস্ত কোয়ালিটি',
    desc: 'হাজারো গ্রাহকের আস্থার প্রতীক আমাদের এই পণ্য।',
  },
  {
    num: '04',
    title: 'অরিজিনাল গ্যারান্টি',
    desc: 'আমরা সরাসরি আমদানিকারকের কাছ থেকে সংগ্রহ করি।',
  },
  {
    num: '05',
    title: 'নিরাপদ প্যাকেজিং',
    desc: 'পণ্যটির গোপনীয়তা বজায় রেখে ডেলিভারি করা হয়।',
  },
  {
    num: '06',
    title: 'সহজ ব্যবহার',
    desc: 'খুব সহজেই নিয়মিত সেবন করা যায়।',
  },
];

const INGREDIENTS = [
  {
    icon: Leaf,
    name: 'জিনসেং নির্যাস',
    subtitle: 'Ginseng Extract',
    desc: 'শারীরিক শক্তি, স্ট্যামিনা ও দৈনন্দিন কর্মক্ষমতা বাড়াতে কার্যকরভাবে সহায়তা করে।',
  },
  {
    icon: Sparkles,
    name: 'অশ্বগন্ধা',
    subtitle: 'Ashwagandha',
    desc: 'মানসিক চাপ ও ক্লান্তি দূর করে শরীরকে সতেজ ও প্রাণবন্ত রাখতে সাহায্য করে।',
  },
  {
    icon: Flame,
    name: 'শিলাজিৎ',
    subtitle: 'Pure Shilajit',
    desc: 'প্রাকৃতিক মিনারেল সমৃদ্ধ উপাদান যা শক্তি ও রোগ প্রতিরোধ ক্ষমতা বৃদ্ধিতে সহায়ক।',
  },
  {
    icon: ShieldCheck,
    name: 'সাফেদ মুসলি',
    subtitle: 'Safed Musli',
    desc: 'প্রাণশক্তি, সহনশীলতা ও আত্মবিশ্বাস বৃদ্ধিতে প্রাচীন ও বিশ্বস্ত ভেষজ উপাদান।',
  },
];

const FAQS = [
  {
    q: 'পণ্যটি কি শতভাগ অরিজিনাল?',
    a: 'হ্যাঁ, আমাদের প্রতিটি পণ্য সরাসরি বিশ্বস্ত সোর্স থেকে সংগৃহীত এবং ১০০% অরিজিনাল গ্যারান্টিযুক্ত।',
  },
  {
    q: 'অর্ডার করার কত দিনের মধ্যে ডেলিভারি পাবো?',
    a: 'ঢাকার ভিতরে সাধারণত ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২-৩ কার্যদিবসের মধ্যে ডেলিভারি পৌঁছে দেওয়া হয়।',
  },
  {
    q: 'প্যাকেজিং কি গোপনীয় থাকবে?',
    a: 'অবশ্যই। গ্রাহকের ব্যক্তিগত গোপনীয়তা রক্ষা করে সম্পূর্ণ নিরাপদ ও প্রাইভেট প্যাকিংয়ে পণ্য পাঠানো হয়।',
  },
];

const CURRENT_YEAR = new Date().getFullYear();

const DELIVERY_OPTIONS = [
  { id: 'dhaka', label: 'ঢাকার ভিতরে', fee: 70 },
  { id: 'outside', label: 'ঢাকার বাইরে (সারা বাংলাদেশ)', fee: 130 },
];

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Order form state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('dhaka');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      setSelectedImageIdx(0);
      setOrderMessage('');
      setOrderError('');

      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        if (!response.ok) {
          throw new Error('দুঃখিত, পণ্যটি খুঁজে পাওয়া যায়নি।');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || 'পণ্য লোড করতে সমস্যা হয়েছে।');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const scrollToOrderForm = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center px-4">
        <p className="text-base font-medium text-gray-500">পণ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-lg font-semibold text-red-600 mb-4">
          {error || 'পণ্যটি পাওয়া যায়নি।'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const galleryImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image];
  const activeImage = galleryImages[selectedImageIdx] || product.image;
  const unitPrice = Number(product.price) || 0;
  const oldPrice = Number(product.oldPrice) || 0;
  const selectedDelivery =
    DELIVERY_OPTIONS.find((opt) => opt.id === deliveryArea) || DELIVERY_OPTIONS[0];
  const subtotal = unitPrice * quantity;
  const totalPrice = subtotal + selectedDelivery.fee;

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderError('');
    setOrderMessage('');
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.banglaTitle || product.name,
          customerName: customerName.trim(),
          phone: phone.trim(),
          address: address.trim(),
          deliveryArea: selectedDelivery.label,
          quantity,
          note: note.trim(),
          totalPrice,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'অর্ডার সম্পন্ন করতে সমস্যা হয়েছে।');
      }

      setOrderMessage(result.message || 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
      setCustomerName('');
      setPhone('');
      setAddress('');
      setNote('');
      setQuantity(1);
    } catch (err) {
      setOrderError(err.message || 'অর্ডার পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Navigation Bar */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
          >
            ← হোম পেজে ফিরে যান
          </Link>
          <a
            href="tel:01780212230"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700"
          >
            <PhoneCall className="w-4 h-4" />
            <span>01780212230</span>
          </a>
        </div>
      </nav>

      {/* Section 1: Hero Product Showcase */}
      <section className="bg-white py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Gallery + 4 Highlights */}
          <div>
            <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-gray-50 aspect-square">
              <img
                src={activeImage}
                alt={product.banglaTitle || product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 5 Clickable Thumbnails */}
            <div className="grid grid-cols-5 gap-2.5 mt-3">
              {galleryImages.slice(0, 5).map((imgSrc, idx) => {
                const isActive = idx === selectedImageIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`rounded-xl overflow-hidden aspect-square bg-gray-50 transition-all cursor-pointer ${
                      isActive
                        ? 'border-2 border-amber-500 ring-2 ring-amber-400/40'
                        : 'border border-gray-200 opacity-75 hover:opacity-100 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* 4-Column Horizontal Highlight Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              {HERO_HIGHLIGHTS.map((item) => (
                <div
                  key={item.num}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col gap-1"
                >
                  <span className="text-red-600 font-bold text-sm">{item.num}</span>
                  <span className="text-xs font-medium text-gray-700 leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Offer, Title, Badges, Price, CTA */}
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 bg-pink-50 text-red-600 border border-pink-200 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 fill-current" />
              সীমিত সময়ের অফার
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mt-4">
              {product.banglaTitle || product.name}
            </h1>

            <p className="text-gray-600 text-base sm:text-lg mt-3">
              সুস্থ ও সতেজ জীবনের জন্য আপনার বিশ্বস্ত সঙ্গী।
            </p>

            {/* Two Outlined Pill Badges */}
            <div className="flex flex-wrap gap-3 mt-5">
              <span className="inline-flex items-center gap-1.5 border border-gray-200 bg-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                ১০০% অরিজিনাল
              </span>
              <span className="inline-flex items-center gap-1.5 border border-gray-200 bg-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-800">
                <Truck className="w-4 h-4 text-red-600 shrink-0" />
                সারা দেশে হোম ডেলিভারি
              </span>
            </div>

            {/* Price Display */}
            <div className="w-full mt-6 pt-5 border-t border-gray-100">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-red-600">
                  ৳ {unitPrice}
                </span>
                {oldPrice > unitPrice && (
                  <span className="text-lg sm:text-xl text-gray-400 line-through font-medium">
                    ৳ {oldPrice}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                সারা বাংলাদেশ ক্যাশ অন ডেলিভারি
              </p>
            </div>

            {/* Action Buttons */}
            <div className="w-full mt-6 space-y-3">
              <button
                type="button"
                onClick={scrollToOrderForm}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-sm transition-colors cursor-pointer text-base flex items-center justify-center gap-2"
              >
                অর্ডার করুন →
              </button>

              <a
                href="tel:01780212230"
                className="w-full border border-red-200 bg-red-50/40 hover:bg-red-50 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                কল করুন
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Use This Product */}
      <section className="bg-gray-50 py-14 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 mb-10">
            কেন এই পণ্যটি ব্যবহার করবেন?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_USE_FEATURES.map((feature) => (
              <div
                key={feature.num}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow"
              >
                <span className="inline-block text-red-600 font-extrabold text-lg mb-2">
                  {feature.num}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Powerful Natural Ingredients */}
      <section className="bg-white py-14 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
              শক্তিশালী প্রাকৃতিক উপাদান
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              বিশ্বস্ত হারবাল উপাদানের সমন্বয়ে তৈরি, যা পুরুষের শক্তি, স্ট্যামিনা ও আত্মবিশ্বাস বৃদ্ধিতে সহায়ক।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INGREDIENTS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.name}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4 border border-red-100">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{item.name}</h3>
                  <span className="text-xs text-gray-400 font-medium mb-2">
                    {item.subtitle}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: FAQ & Trust Bar */}
      <section className="bg-gray-50 py-14 px-4 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 mb-8">
            সাধারণ জিজ্ঞাসা
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Order Form (#order-form) */}
      <section id="order-form" className="bg-white py-14 px-4 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
              <PackageCheck className="w-4 h-4" />
              ক্যাশ অন ডেলিভারি সুবিধা
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              অর্ডার করতে নিচের ফর্মটি পূরণ করুন
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              কোনো অগ্রিম পেমেন্ট ছাড়াই পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।
            </p>
          </div>

          {orderMessage ? (
            <div className="max-w-xl mx-auto bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-green-800 mb-2">
                {orderMessage}
              </h3>
              <p className="text-sm text-green-700 mb-6">
                আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করে অর্ডারটি কনফার্ম করবেন।
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setOrderMessage('')}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  নতুন অর্ডার করুন
                </button>
                <Link
                  to="/"
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  হোম পেজে যান
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleOrderSubmit}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-8"
            >
              {/* Left: Billing & Delivery Inputs */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  ডেলিভারি তথ্য
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    আপনার নাম <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    মোবাইল নাম্বার <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    সম্পূর্ণ ঠিকানা <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="বাসা/হোল্ডিং নং, রোড, এলাকা, থানা ও জেলা লিখুন"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    ডেলিভারি এলাকা নির্বাচন করুন
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DELIVERY_OPTIONS.map((opt) => {
                      const active = deliveryArea === opt.id;
                      return (
                        <label
                          key={opt.id}
                          className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer text-sm transition-colors ${
                            active
                              ? 'border-red-500 bg-red-50/50 text-gray-900 font-semibold'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="deliveryArea"
                              value={opt.id}
                              checked={active}
                              onChange={() => setDeliveryArea(opt.id)}
                              className="accent-red-600"
                            />
                            {opt.label}
                          </span>
                          <span className="text-red-600 font-bold">৳ {opt.fee}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    অতিরিক্ত নোট (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="ডেলিভারি সংক্রান্ত বিশেষ কোনো নির্দেশনা থাকলে লিখুন"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                  />
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    আপনার অর্ডার সামারি
                  </h3>

                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <img
                      src={product.image}
                      alt={product.banglaTitle || product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 leading-snug">
                        {product.banglaTitle || product.name}
                      </p>
                      <p className="text-sm font-semibold text-red-600 mt-1">
                        ৳ {unitPrice}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">পরিমাণ</span>
                    <div className="inline-flex items-center border border-gray-300 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1.5 text-sm font-bold text-gray-900">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2.5 pt-3 border-t border-gray-100 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>পণ্যের মূল্য</span>
                      <span>৳ {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>ডেলিভারি চার্জ ({selectedDelivery.label})</span>
                      <span>৳ {selectedDelivery.fee}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2.5 border-t border-gray-100">
                      <span>সর্বমোট</span>
                      <span className="text-red-600">৳ {totalPrice}</span>
                    </div>
                  </div>

                  {orderError && (
                    <p className="text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                      {orderError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3.5 px-5 rounded-xl shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2 text-base"
                  >
                    {submitting ? 'অর্ডার প্রসেস হচ্ছে...' : 'অর্ডার কনফার্ম করুন'}
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
          <p className="text-sm font-semibold text-white">Power Zenox</p>
          <p className="text-xs text-gray-400">
            যেকোনো প্রয়োজনে কল করুন:{' '}
            <a href="tel:01780212230" className="text-red-400 hover:underline">
              01780212230
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            © {CURRENT_YEAR} Power Zenox. সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ProductDetails;
