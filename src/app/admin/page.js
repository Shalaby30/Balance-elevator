"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalRequests: 0,
    totalParts: 0,
    recentRequests: [],
    loading: true,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const supabase = getSupabaseBrowser();
      
      // Get requests count
      const { count: requestsCount } = await supabase
        .from("service_requests")
        .select("*", { count: "exact", head: true });

      // Get parts count
      const { count: partsCount } = await supabase
        .from("spare_parts")
        .select("*", { count: "exact", head: true });

      // Get recent requests
      const { data: recentRequests } = await supabase
        .from("service_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setStats({
        totalRequests: requestsCount || 0,
        totalParts: partsCount || 0,
        recentRequests: recentRequests || [],
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
      setStats(s => ({ ...s, loading: false }));
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("ar-EG");
  };

  const getServiceTypeLabel = (type) => {
    const types = {
      maintenance: "صيانة",
      installation: "تركيب",
      spare_parts: "قطع غيار",
      consultation: "استشارة",
    };
    return types[type] || type;
  };

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي الطلبات"
          value={stats.totalRequests}
          icon={RequestsIcon}
          color="blue"
          href="/admin/submissions"
        />
        <StatCard
          title="قطع الغيار"
          value={stats.totalParts}
          icon={PartsIcon}
          color="green"
          href="/admin/spare-parts"
        />
        <StatCard
          title="طلبات اليوم"
          value={stats.recentRequests.filter(r => {
            const today = new Date().toDateString();
            return new Date(r.created_at).toDateString() === today;
          }).length}
          icon={TodayIcon}
          color="yellow"
          href="/admin/submissions"
        />
        <StatCard
          title="معدل الاستجابة"
          value="98%"
          icon={SuccessIcon}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <QuickActionCard
          title="عرض الطلبات"
          desc="استعراض وإدارة طلبات العملاء"
          href="/admin/submissions"
          icon={ViewIcon}
          color="blue"
        />
        <QuickActionCard
          title="إضافة قطعة"
          desc="إضافة قطعة غيار جديدة للمخزن"
          href="/admin/spare-parts"
          icon={AddIcon}
          color="green"
        />
        <QuickActionCard
          title="زيارة الموقع"
          desc="الذهاب إلى الموقع الرئيسي"
          href="/"
          icon={ExternalIcon}
          color="gray"
          external
        />
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">أحدث الطلبات</h2>
          <Link 
            href="/admin/submissions"
            className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
          >
            عرض الكل ←
          </Link>
        </div>
        
        {stats.recentRequests.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500">لا توجد طلبات حتى الآن</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {stats.recentRequests.map((request) => (
              <div key={request.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-700 font-bold text-sm">
                        {request.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{request.name}</h3>
                      <p className="text-sm text-gray-500">{request.phone}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-1">
                      {getServiceTypeLabel(request.service_type)}
                    </span>
                    <p className="text-xs text-gray-400">{formatDate(request.created_at)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, href }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
  };

  const content = (
    <div className={`bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 ${href ? 'cursor-pointer' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {href && (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

function QuickActionCard({ title, desc, href, icon: Icon, color, external }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    gray: "bg-gray-50 text-gray-600 border-gray-100",
  };

  const content = (
    <div className={`p-5 rounded-xl border ${colors[color]} hover:shadow-md transition-all duration-200 cursor-pointer`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
      </div>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}

// Icons
function RequestsIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function PartsIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function TodayIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function SuccessIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ViewIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function AddIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function ExternalIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}
