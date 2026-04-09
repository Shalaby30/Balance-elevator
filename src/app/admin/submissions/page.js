"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/submissions");
      const data = await response.json();
      if (data.success || data.submissions) {
        setSubmissions(data.submissions || []);
      }
    } catch (err) {
      setError("خطأ في تحميل الطلبات");
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG") + " " + date.toLocaleTimeString("ar-EG");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">الطلبات المستقبلة</h1>
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              ← العودة للرئيسية
            </Link>
          </div>
          <p className="text-gray-600 mt-2">إجمالي الطلبات: {submissions.length}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">جاري تحميل الطلبات...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">لا توجد طلبات حتى الآن</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{submission.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {submission.type === "inspection" ? "طلب معاينة" : "رسالة تواصل"}
                    </p>
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {formatDate(submission.createdAt)}
                  </span>
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase">البريد الإلكتروني</label>
                      <p className="text-gray-900 mt-1">
                        <a href={`mailto:${submission.email}`} className="text-blue-600 hover:text-blue-700">
                          {submission.email}
                        </a>
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase">رقم الجوال</label>
                      <p className="text-gray-900 mt-1">
                        <a href={`tel:${submission.phone}`} className="text-blue-600 hover:text-blue-700">
                          {submission.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  {submission.message && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase">التفاصيل</label>
                      <p className="text-gray-900 mt-1 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
                        {submission.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
