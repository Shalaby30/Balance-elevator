"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function SparePartsAdmin() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const supabase = getSupabaseBrowser();
      const { data, error } = await supabase
        .from("spare_parts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setParts(data || []);
    } catch (err) {
      setError("خطأ في تحميل قطع الغيار");
      console.error("Error fetching parts:", err);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async () => {
    if (!file) return null;

    const fileName = `spare-parts/${Date.now()}-${file.name}`;
    const supabase = getSupabaseBrowser();

    const { error } = await supabase.storage
      .from("spare-parts")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return null;
    }

    const { data } = supabase.storage
      .from("spare-parts")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");

    try {
      const imageUrl = await uploadImage();

      const supabase = getSupabaseBrowser();
      const { error } = await supabase.from("spare_parts").insert({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        image_url: imageUrl,
      });

      if (error) throw error;

      setForm({ name: "", description: "", price: "" });
      setFile(null);
      setShowForm(false);
      fetchParts();
    } catch (err) {
      setError("خطأ في إضافة القطعة");
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;

    try {
      const supabase = getSupabaseBrowser();
      await supabase.from("spare_parts").delete().eq("id", id);
      fetchParts();
    } catch (err) {
      setError("خطأ في الحذف");
      console.error(err);
    }
  };

  const startEdit = (part) => {
    setEditingId(part.id);
    setEditForm({
      name: part.name,
      description: part.description || "",
      price: part.price.toString(),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", description: "", price: "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");

    try {
      const supabase = getSupabaseBrowser();
      const { error } = await supabase
        .from("spare_parts")
        .update({
          name: editForm.name,
          description: editForm.description,
          price: parseFloat(editForm.price),
        })
        .eq("id", editingId);

      if (error) throw error;

      setEditingId(null);
      setEditForm({ name: "", description: "", price: "" });
      fetchParts();
    } catch (err) {
      setError("خطأ في تحديث القطعة");
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ar-EG").format(price);
  };

  return (
    <div>
      {/* Stats */}
      <div className="mb-6 bg-white rounded-xl p-4 border border-gray-200">
        <p className="text-gray-600">إجمالي القطع: <span className="font-bold text-gray-900">{parts.length}</span></p>
      </div>

      {/* Add Button */}
      <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showForm ? "إلغاء" : "إضافة قطعة جديدة"}
          </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">إضافة قطعة جديدة</h2>
          <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="اسم القطعة *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-black"
                required
              />

              <input
                type="number"
                placeholder="السعر *"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-black"
                required
              />

              <textarea
                placeholder="الوصف"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-black md:col-span-2"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">صورة القطعة *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitLoading}
              className="mt-6 w-full md:w-auto px-8 py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition"
            >
              {submitLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري الإضافة...
                </span>
              ) : (
                "إضافة القطعة"
              )}
            </button>
        </form>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        </div>
      ) : parts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">لا توجد قطع غيار حتى الآن</p>
          <p className="text-gray-400 text-sm mt-1">أضف قطع غيار جديدة بالضغط على الزر أعلاه</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parts.map((part) => (
              <div key={part.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="relative">
                  <img
                    src={part.image_url || "/placeholder.jpg"}
                    alt={part.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="p-5">
                  {editingId === part.id ? (
                    <form onSubmit={handleUpdate} className="space-y-3">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-black text-sm"
                        placeholder="اسم القطعة"
                        required
                      />
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-black text-sm"
                        placeholder="السعر"
                        required
                      />
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-black text-sm"
                        placeholder="الوصف"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={submitLoading}
                          className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white py-2 rounded-lg text-sm font-medium transition"
                        >
                          {submitLoading ? "جاري الحفظ..." : "حفظ"}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium transition"
                        >
                          إلغاء
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h2 className="text-lg font-bold text-gray-900 mb-1">{part.name}</h2>
                      
                      {part.description && (
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{part.description}</p>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <p className="text-lg font-bold text-yellow-700">
                          {formatPrice(part.price)} <span className="text-sm font-normal text-gray-500">جنيه</span>
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(part)}
                            className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(part.id)}
                            className="flex items-center gap-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            حذف
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}