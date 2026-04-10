"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const supabase = getSupabaseBrowser();
      const { data, error } = await supabase
        .from("service_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      setError("خطأ في تحميل الطلبات");
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' });
  };

  const getServiceTypeColor = (type) => {
    const colors = {
      "تركيب مصعد جديد": "bg-green-100 text-green-700 border-green-200",
      "صيانة دورية": "bg-blue-100 text-blue-700 border-blue-200",
      "إصلاح عطل": "bg-red-100 text-red-700 border-red-200",
      "استشارة فنية": "bg-purple-100 text-purple-700 border-purple-200",
    };
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  // Calculate stats
  const stats = {
    total: requests.length,
    newInstall: requests.filter(r => r.service_type === "تركيب مصعد جديد").length,
    maintenance: requests.filter(r => r.service_type === "صيانة دورية").length,
    repair: requests.filter(r => r.service_type === "إصلاح عطل").length,
    consultation: requests.filter(r => r.service_type === "استشارة فنية").length,
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-1">إجمالي الطلبات</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-100">
          <p className="text-2xl font-bold text-green-700">{stats.newInstall}</p>
          <p className="text-xs text-green-600 mt-1">تركيب جديد</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-100">
          <p className="text-2xl font-bold text-blue-700">{stats.maintenance}</p>
          <p className="text-xs text-blue-600 mt-1">صيانة دورية</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-100">
          <p className="text-2xl font-bold text-red-700">{stats.repair}</p>
          <p className="text-xs text-red-600 mt-1">إصلاح عطل</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 shadow-sm border border-purple-100">
          <p className="text-2xl font-bold text-purple-700">{stats.consultation}</p>
          <p className="text-xs text-purple-600 mt-1">استشارة</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">لا توجد طلبات حتى الآن</p>
          <p className="text-gray-400 text-sm mt-1">الطلبات الجديدة ستظهر هنا</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request, index) => (
            <div key={request.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
              {/* Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{request.name}</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getServiceTypeColor(request.service_type)}`}>
                    {request.service_type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(request.created_at)}</span>
                  <span className="text-gray-300">|</span>
                  <span>{formatTime(request.created_at)}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-gray-100 pt-4">
                <a href={`tel:${request.phone}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">رقم الجوال</p>
                    <p className="text-gray-900 font-medium">{request.phone}</p>
                  </div>
                </a>

                <a href={request.email ? `mailto:${request.email}` : undefined} className={`flex items-center gap-3 p-3 rounded-lg transition ${request.email ? 'hover:bg-gray-50 group cursor-pointer' : 'cursor-default'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${request.email ? 'bg-blue-100 group-hover:bg-blue-200' : 'bg-gray-100'}`}>
                    <svg className={`w-5 h-5 ${request.email ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">البريد الإلكتروني</p>
                    <p className={`font-medium ${request.email ? 'text-gray-900' : 'text-gray-400'}`}>
                      {request.email || '—'}
                    </p>
                  </div>
                </a>

                <div className={`flex items-center gap-3 p-3 rounded-lg transition ${request.location ? 'bg-orange-50' : 'bg-gray-50'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${request.location ? 'bg-orange-100' : 'bg-gray-200'}`}>
                    <svg className={`w-5 h-5 ${request.location ? 'text-orange-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">الموقع</p>
                    <p className={`font-medium ${request.location ? 'text-gray-900' : 'text-gray-400'}`}>
                      {request.location || '—'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3 3 0 01-3-3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">رقم الطلب</p>
                    <p className="text-gray-900 font-medium text-xs">{request.id?.slice(0, 8)}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {request.message && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">تفاصيل الطلب:</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{request.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
