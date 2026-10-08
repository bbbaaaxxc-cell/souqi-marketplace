'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, BadgeCheck, Banknote, Building2, ChartNoAxesCombined, Search, ShieldCheck, ShoppingCart, Star, Store, UserRound } from 'lucide-react';
import { categories, formatPrice, initialOrders, products, sanitizeText, validateTransferReference, type Category, type OrderItem } from '@/lib/mock-data';

const marketplaceFee = 0.12;

export default function MarketplaceShell() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('الكل');
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(products[0]?.id ?? null);
  const [buyerName, setBuyerName] = useState('');
  const [transferRef, setTransferRef] = useState('');
  const [orderMessage, setOrderMessage] = useState('');

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === 'الكل' || product.category === selectedCategory;
      const searchMatch =
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.seller.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [query, selectedCategory]);

  const selectedProduct = products.find((p) => p.id === selectedProductId) ?? products[0];

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const submitOrder = () => {
    if (!selectedProduct) return;
    const cleanBuyer = sanitizeText(buyerName || 'عميل جديد');
    const cleanRef = transferRef.trim();

    if (!validateTransferReference(cleanRef)) {
      alert('رقم الإحالة غير صالح. استخدم أرقام أو حروف أو شرطة ��قط.');
      return;
    }

    const newOrder: OrderItem = {
      id: Date.now(),
      productId: selectedProduct.id,
      buyer: cleanBuyer,
      quantity: 1,
      total: Math.round(selectedProduct.price * (1 + marketplaceFee)),
      status: 'قيد المراجعة',
      paymentStatus: 'تم الدفع',
      transferRef: cleanRef,
      createdAt: new Date().toISOString().slice(0, 10)
    };

    setOrders((current) => [newOrder, ...current]);
    setBuyerName('');
    setTransferRef('');
    setOrderMessage('تم إنشاء الطلب بنجاح. سيتم مراجعة التحويل وتأكيده من الإدارة.');
  };

  const updateStatus = (orderId: number, nextStatus: OrderItem['status']) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: nextStatus,
              paymentStatus: nextStatus === 'تم التسليم' ? 'تم الدفع' : order.paymentStatus
            }
          : order
      )
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-500 text-xl font-extrabold text-white shadow-md">
              س
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">سوقي</div>
              <div className="text-xs text-slate-500">Marketplace عربي</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <a href="#products">المنتجات</a>
            <a href="#offers">العروض</a>
            <a href="#admin">لوحة الإدارة</a>
          </nav>
          <button className="btn-primary">تسجيل البائع</button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid-hero">
          <div className="card rtl-card p-6 md:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
              <ShieldCheck size={14} />
              نظام آمن ومناسب للسوق المصري
            </div>
            <h1 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">
              سوق عربي يربط البائعين بالعملاء بسرعة وأمان
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-600">
              امنح البائعين مساحة لعرض المنتجات، واترك للمشرف مراجعة الطلبات والتحويلات البنكية قبل تأكيد البيع.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn-primary">تصفح المنتجات</button>
              <button className="btn-secondary">ابدأ كـ بائع</button>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500"><Store size={16} /> البائعين</div>
                <div className="mt-3 text-2xl font-black">20</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500"><ShoppingCart size={16} /> الطلبات</div>
                <div className="mt-3 text-2xl font-black">{orders.length}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500"><ChartNoAxesCombined size={16} /> الإيرادات</div>
                <div className="mt-3 text-2xl font-black">{formatPrice(totalRevenue)}</div>
              </div>
            </div>
          </div>

          <div className="card p-5 rtl-card">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">أقوى عرض هذا الأسبوع</div>
                <h3 className="text-xl font-black">{selectedProduct.title}</h3>
              </div>
              <div className="badge bg-amber-100 text-amber-800">-12%</div>
            </div>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="h-56 w-full rounded-2xl object-cover" />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">السعر</div>
                <div className="text-2xl font-black text-teal-700">{formatPrice(selectedProduct.price)}</div>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-sm font-bold text-yellow-700">
                <Star size={14} fill="currentColor" /> {selectedProduct.rating}
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-600">{selectedProduct.description}</div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
              <span className="flex items-center gap-2"><UserRound size={15} /> {selectedProduct.seller}</span>
              <span className="flex items-center gap-2"><Building2 size={15} /> {selectedProduct.region}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-4 pb-8">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-teal-700 font-bold">المنتجات</div>
            <h2 className="text-2xl font-black">تصفح منتجات السوق</h2>
          </div>
          <div className="relative w-full md:max-w-md">
            <Search className="absolute right-3 top-3.5 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن منتج أو بائع"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-10 pl-3 outline-none ring-0 focus:border-teal-500"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                selectedCategory === category
                  ? 'bg-teal-700 text-white'
                  : 'bg-white text-slate-700 ring-1 ring-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <article key={product.id} className="card overflow-hidden rtl-card">
              <div className="relative">
                <img src={product.image} alt={product.title} className="h-52 w-full object-cover" />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-slate-700">
                  {product.category}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900">{product.title}</h3>
                  <span className="flex items-center gap-1 text-xs font-bold text-yellow-700">
                    <Star size={12} fill="currentColor" /> {product.rating}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{product.description}</p>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{product.seller}</span>
                  <span>{product.region}</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">السعر</div>
                    <div className="text-xl font-black text-teal-700">{formatPrice(product.price)}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProductId(product.id)}
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    تفاصيل
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-4 pb-8">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="card p-5 rtl-card">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-teal-700">
              <Banknote size={16} /> نموذج الدفع والتحويل
            </div>
            <h3 className="text-2xl font-black">إرسال الطلب مع تأكيد الدفع البنكي</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-bold text-slate-700">
                اسم العميل
                <input
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="مثال: أحمد محمد"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 outline-none focus:border-teal-500"
                />
              </label>
              <label className="block text-sm font-bold text-slate-700">
                رقم الإحالة
                <input
                  value={transferRef}
                  onChange={(e) => setTransferRef(e.target.value)}
                  placeholder="TR-24589"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 outline-none focus:border-teal-500"
                />
              </label>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <div className="mb-2 flex items-center gap-2 font-bold text-slate-800"><BadgeCheck size={16} /> الحساب البنكي</div>
              <div>اسم البنك: البنك الأهلي المصري</div>
              <div>اسم الحساب: شركة سوقي للتسويق الرقمي</div>
              <div>رقم الحساب: 1234567890</div>
              <div>IBAN: EG3800100001234567890123456</div>
            </div>
            <div className="mt-4 flex justify-end">
              <button type="button" onClick={submitOrder} className="btn-primary px-5 py-3">
                إرسال الطلب
              </button>
            </div>
            {orderMessage ? <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{orderMessage}</div> : null}
          </div>

          <aside className="card p-5 rtl-card">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700"><ShoppingCart size={16} /> ملخص الطلب</div>
            {selectedProduct ? (
              <>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <div className="text-sm text-slate-500">المنتج</div>
                  <div className="mt-1 font-black">{selectedProduct.title}</div>
                  <div className="mt-2 text-sm text-slate-600">السعر الأساسي: {formatPrice(selectedProduct.price)}</div>
                  <div className="mt-1 text-sm text-slate-600">العمولة: {formatPrice(Math.round(selectedProduct.price * marketplaceFee))}</div>
                  <div className="mt-3 text-lg font-black text-teal-700">
                    الإجمالي: {formatPrice(Math.round(selectedProduct.price * (1 + marketplaceFee)))}
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><ArrowLeft size={15} /> بعد الدفع، يُراجع الطلب من الإدارة ثم يُؤكد.</div>
                </div>
              </>
            ) : (
              <div className="text-slate-500">يرجى اختيار منتج.</div>
            )}
          </aside>
        </div>
      </section>

      <section id="admin" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-teal-700">لوحة الإدارة</div>
            <h3 className="text-2xl font-black">إدارة الطلبات والتحويلات</h3>
          </div>
          <div className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">{orders.filter((o) => o.status === 'قيد المراجعة').length} طلبات جديدة</div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">العميل</th>
                <th className="px-4 py-3">المتجـر</th>
                <th className="px-4 py-3">الإجمالي</th>
                <th className="px-4 py-3">حالة الدفع</th>
                <th className="px-4 py-3">حالة الطلب</th>
                <th className="px-4 py-3">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const product = products.find((item) => item.id === order.productId);
                return (
                  <tr key={order.id} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-bold text-slate-800">{order.buyer}</td>
                    <td className="px-4 py-3">{product?.seller ?? 'منتج غير معرف'}</td>
                    <td className="px-4 py-3">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${order.paymentStatus === 'تم الدفع' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge bg-slate-100 text-slate-700">{order.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value as OrderItem['status'])}
                        className="rounded-lg border border-slate-200 px-2 py-2 outline-none focus:border-teal-500"
                      >
                        <option value="قيد المراجعة">قيد المراجعة</option>
                        <option value="مؤكد">مؤكد</option>
                        <option value="قيد التجهيز">قيد التجهيز</option>
                        <option value="تم التسليم">تم التسليم</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
