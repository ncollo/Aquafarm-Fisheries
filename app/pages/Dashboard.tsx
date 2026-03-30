import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  LayoutDashboard, Fish, TrendingUp, FileText, Package, Users,
  ChevronRight, ArrowUpRight, ArrowDownRight, Plus, Search,
  Edit, Trash2, Bell, LogOut, Home, CheckCircle,
  Truck, AlertTriangle, RefreshCw, DollarSign,
  Droplets, Activity, Star, Sun, Moon,
  Calendar, Download, Filter,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const salesData = [
  { month: "Oct", tilapia: 180, catfish: 95, trout: 40, carp: 30 },
  { month: "Nov", tilapia: 220, catfish: 110, trout: 55, carp: 25 },
  { month: "Dec", tilapia: 310, catfish: 140, trout: 70, carp: 45 },
  { month: "Jan", tilapia: 290, catfish: 125, trout: 60, carp: 40 },
  { month: "Feb", tilapia: 330, catfish: 155, trout: 80, carp: 50 },
  { month: "Mar", tilapia: 380, catfish: 175, trout: 90, carp: 55 },
];

const revenueData = [
  { month: "Oct", revenue: 285000, target: 300000, expenses: 142000 },
  { month: "Nov", revenue: 342000, target: 320000, expenses: 165000 },
  { month: "Dec", revenue: 510000, target: 450000, expenses: 198000 },
  { month: "Jan", revenue: 420000, target: 400000, expenses: 174000 },
  { month: "Feb", revenue: 465000, target: 430000, expenses: 182000 },
  { month: "Mar", revenue: 540000, target: 500000, expenses: 205000 },
];

const stockDistribution = [
  { name: "Tilapia", value: 42, fill: "#0d9488" },
  { name: "Catfish", value: 28, fill: "#f59e0b" },
  { name: "Trout", value: 12, fill: "#3b82f6" },
  { name: "Carp", value: 10, fill: "#10b981" },
  { name: "Lungfish", value: 5, fill: "#8b5cf6" },
  { name: "Bass", value: 3, fill: "#ef4444" },
];

const waterQuality = [
  { name: "pH Level", value: 7.2, unit: "", min: 6.5, max: 8.5, ideal: 7.0, status: "Good", color: "#0d9488" },
  { name: "Dissolved O₂", value: 6.8, unit: "mg/L", min: 5, max: 9, ideal: 7.0, status: "Good", color: "#3b82f6" },
  { name: "Temperature", value: 24, unit: "°C", min: 20, max: 30, ideal: 25, status: "Good", color: "#f59e0b" },
  { name: "Ammonia", value: 0.2, unit: "ppm", min: 0, max: 0.5, ideal: 0, status: "Normal", color: "#10b981" },
];

const fishStock = [
  { id: "TS-001", species: "Nile Tilapia", pondCount: 12, totalKg: 8400, avgWeight: "450g", status: "Excellent", healthStatus: "Healthy", daysToHarvest: 18, color: "#0d9488", statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  { id: "CS-001", species: "African Catfish", pondCount: 8, totalKg: 5600, avgWeight: "720g", status: "Good", healthStatus: "Healthy", daysToHarvest: 25, color: "#f59e0b", statusColor: "bg-teal-100 text-teal-700" },
  { id: "RT-001", species: "Rainbow Trout", pondCount: 4, totalKg: 2100, avgWeight: "580g", status: "Monitor", healthStatus: "Under Watch", daysToHarvest: 35, color: "#3b82f6", statusColor: "bg-amber-100 text-amber-700" },
  { id: "CP-001", species: "Common Carp", pondCount: 3, totalKg: 1800, avgWeight: "850g", status: "Good", healthStatus: "Healthy", daysToHarvest: 42, color: "#10b981", statusColor: "bg-blue-100 text-blue-700" },
  { id: "LF-001", species: "Lungfish", pondCount: 2, totalKg: 980, avgWeight: "1.1kg", status: "Good", healthStatus: "Healthy", daysToHarvest: 60, color: "#8b5cf6", statusColor: "bg-purple-100 text-purple-700" },
  { id: "BS-001", species: "Largemouth Bass", pondCount: 2, totalKg: 560, avgWeight: "680g", status: "Good", healthStatus: "Healthy", daysToHarvest: null, color: "#ef4444", statusColor: "bg-red-100 text-red-700" },
];

const salesRecords = [
  { id: "SAL-2026-0326", date: "26 Mar 2026", customer: "Nakuru Supermart", species: "Tilapia", qty: "85kg", amount: "KES 29,750", status: "Completed", type: "Wholesale" },
  { id: "SAL-2026-0325a", date: "25 Mar 2026", customer: "Sarova Woodlands Hotel", species: "Trout", qty: "12kg", amount: "KES 7,800", status: "Completed", type: "Hotel" },
  { id: "SAL-2026-0325b", date: "25 Mar 2026", customer: "James Kamau (Farmer)", species: "Fingerlings (Tilapia)", qty: "500 pcs", amount: "KES 7,500", status: "Completed", type: "Farmer" },
  { id: "SAL-2026-0324", date: "24 Mar 2026", customer: "Nairobi Fish Market", species: "Catfish", qty: "120kg", amount: "KES 48,000", status: "Pending", type: "Wholesale" },
  { id: "SAL-2026-0323", date: "23 Mar 2026", customer: "Walk-in Customer", species: "Tilapia", qty: "5kg", amount: "KES 1,750", status: "Completed", type: "Retail" },
  { id: "SAL-2026-0322", date: "22 Mar 2026", customer: "Kenya Airways Catering", species: "Trout", qty: "30kg", amount: "KES 19,500", status: "Delivered", type: "Corporate" },
];

const suppliers = [
  { id: "SUP-001", name: "AquaFeed Kenya Ltd", category: "Fish Feed", contact: "+254 720 111 001", lastOrder: "15 Mar 2026", outstanding: "KES 0", status: "Active", rating: 5 },
  { id: "SUP-002", name: "NutriStart Animal Feeds", category: "Fingerling Feed", contact: "+254 720 111 002", lastOrder: "10 Mar 2026", outstanding: "KES 12,000", status: "Active", rating: 4 },
  { id: "SUP-003", name: "Rift Valley Equipment Co.", category: "Equipment & Parts", contact: "+254 720 111 003", lastOrder: "5 Mar 2026", outstanding: "KES 0", status: "Active", rating: 4 },
  { id: "SUP-004", name: "Solar Kenya Solutions", category: "Solar Energy", contact: "+254 720 111 004", lastOrder: "1 Feb 2026", outstanding: "KES 85,000", status: "Active", rating: 5 },
  { id: "SUP-005", name: "KenyaFish Chemicals", category: "Water Treatment", contact: "+254 720 111 005", lastOrder: "20 Feb 2026", outstanding: "KES 0", status: "Inactive", rating: 3 },
  { id: "SUP-006", name: "Naivasha Fingerlings Hub", category: "Fingerlings", contact: "+254 720 111 006", lastOrder: "18 Mar 2026", outstanding: "KES 3,500", status: "Active", rating: 4 },
];

const activityFeed = [
  { time: "08:42 AM", action: "Pond TS-007 water quality checked", type: "check", user: "John M." },
  { time: "07:15 AM", action: "85kg Tilapia delivered to Nakuru Supermart", type: "sale", user: "Grace W." },
  { time: "Yesterday", action: "500 Tilapia fingerlings sold to James Kamau", type: "sale", user: "John M." },
  { time: "Yesterday", action: "RT-003 aerator serviced — O₂ back to normal", type: "maintenance", user: "Tech Team" },
  { time: "2 days ago", action: "New supplier quote received from AquaFeed Kenya", type: "supplier", user: "System" },
  { time: "2 days ago", action: "Monthly revenue target exceeded by 8%", type: "achievement", user: "System" },
];

const revenueByChannel = [
  { channel: "Wholesale", value: 48, color: "#0d9488", kes: "KES 259,200" },
  { channel: "Hotel/Restaurant", value: 22, color: "#f59e0b", kes: "KES 118,800" },
  { channel: "Retail", value: 18, color: "#3b82f6", kes: "KES 97,200" },
  { channel: "Corporate", value: 8, color: "#10b981", kes: "KES 43,200" },
  { channel: "Farmer/Fingerlings", value: 4, color: "#8b5cf6", kes: "KES 21,600" },
];

type Tab = "overview" | "stock" | "sales" | "reports" | "suppliers";

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, isDark }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={`rounded-xl p-3 shadow-xl border text-sm ${isDark ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-100 text-gray-800"}`}>
      <p className="font-semibold mb-1.5 text-xs opacity-70">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-xs">{p.name}: <strong>{typeof p.value === "number" && p.value > 1000 ? `KES ${p.value.toLocaleString()}` : p.value}</strong></span>
        </div>
      ))}
    </div>
  );
};

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ title, value, change, up, icon: Icon, gradient, sparkData, isDark }: any) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 ${gradient} shadow-lg`}>
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
      <div className="absolute -right-2 -top-8 w-16 h-16 bg-white/10 rounded-full" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white/80 text-xs font-semibold uppercase tracking-wide">{title}</p>
          <div className="bg-white/20 p-2 rounded-xl">
            <Icon size={16} className="text-white" />
          </div>
        </div>
        <p className="text-white font-bold text-2xl mb-1">{value}</p>
        <div className={`flex items-center gap-1 text-xs font-medium ${up === true ? "text-green-200" : up === false ? "text-red-200" : "text-white/70"}`}>
          {up === true && <ArrowUpRight size={13} />}
          {up === false && <ArrowDownRight size={13} />}
          <span>{change}</span>
        </div>
        {sparkData && (
          <div className="mt-3 h-8">
            <ResponsiveContainer width="100%" height={32}>
              <LineChart data={sparkData}>
                <Line type="monotone" dataKey="v" stroke="rgba(255,255,255,0.6)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Water Quality Gauge ──────────────────────────────────────────────────────
function WaterGauge({ metric, isDark }: { metric: typeof waterQuality[0]; isDark: boolean }) {
  const pct = Math.min(100, Math.max(0, ((metric.value - metric.min) / (metric.max - metric.min)) * 100));
  return (
    <div className={`p-4 rounded-2xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{metric.name}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${metric.status === "Good" || metric.status === "Normal" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
          {metric.status}
        </span>
      </div>
      <div className={`text-xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        {metric.value}<span className="text-xs font-normal opacity-60 ml-1">{metric.unit}</span>
      </div>
      <div className={`h-2 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
        <div
          className="h-2 rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: metric.color }}
        />
      </div>
      <div className={`flex justify-between text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
        <span>{metric.min}{metric.unit}</span>
        <span>{metric.max}{metric.unit}</span>
      </div>
    </div>
  );
}

// ─── Main Dashboard Component ─────────────────────────────────────────────────
export function Dashboard() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchSales, setSearchSales] = useState("");

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Loading dashboard...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) return null;

  // Colors for dark/light
  const bg = isDark ? "bg-gray-900" : "bg-gray-100";
  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const cardBorder = isDark ? "border-gray-700" : "border-gray-100";
  const textPrimary = isDark ? "text-gray-100" : "text-gray-900";
  const textMuted = isDark ? "text-gray-400" : "text-gray-500";
  const textSub = isDark ? "text-gray-300" : "text-gray-600";
  const headerBg = isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const tableHover = isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50";
  const divideColor = isDark ? "divide-gray-700" : "divide-gray-50";

  const navItems: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "stock", label: "Fish Stock", icon: Fish },
    { id: "sales", label: "Sales", icon: TrendingUp },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "suppliers", label: "Suppliers", icon: Package },
  ];

  const kpiData = [
    {
      title: "Revenue (March)",
      value: "KES 540K",
      change: "+12.4% vs last month",
      up: true,
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-teal-600 to-teal-800",
      sparkData: revenueData.map(d => ({ v: d.revenue / 1000 })),
    },
    {
      title: "Fish Sold (March)",
      value: "1,680 kg",
      change: "+8.2% vs last month",
      up: true,
      icon: Fish,
      gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
      sparkData: salesData.map(d => ({ v: d.tilapia + d.catfish })),
    },
    {
      title: "Active Ponds",
      value: "31 / 32",
      change: "1 pond under maintenance",
      up: null,
      icon: Activity,
      gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700",
      sparkData: null,
    },
    {
      title: "Pending Orders",
      value: "7 orders",
      change: "+2 new today",
      up: false,
      icon: Package,
      gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
      sparkData: null,
    },
  ];

  const filteredSales = salesRecords.filter(s =>
    s.customer.toLowerCase().includes(searchSales.toLowerCase()) ||
    s.species.toLowerCase().includes(searchSales.toLowerCase())
  );

  return (
    <div className={`flex h-screen ${bg} pt-[98px] transition-colors duration-300`} style={{ fontFamily: "Inter, sans-serif" }}>
      {/* ── Sidebar ── */}
      <aside
        className={`${sidebarOpen ? "w-56" : "w-14"} flex-shrink-0 flex flex-col z-20 fixed top-[98px] bottom-0 left-0 transition-all duration-300 ${
          isDark ? "bg-gray-900 border-r border-gray-800" : "bg-teal-900"
        }`}
      >
        <div className={`p-3 flex items-center justify-between border-b ${isDark ? "border-gray-800" : "border-teal-800"}`}>
          {sidebarOpen && <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Admin Panel</span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1 rounded-lg transition-colors ml-auto ${isDark ? "hover:bg-gray-800" : "hover:bg-teal-800"}`}
          >
            <ChevronRight size={16} className={`text-white transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* User info */}
        {sidebarOpen && (
          <div className={`px-3 py-3 border-b ${isDark ? "border-gray-800" : "border-teal-800"}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user?.avatar}
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
                <p className="text-teal-300 text-[10px] capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? isDark ? "bg-teal-600/30 text-teal-300 border border-teal-600/30" : "bg-teal-700 text-white"
                    : isDark ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200" : "text-teal-300 hover:bg-teal-800 hover:text-white"
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className={`p-2 border-t space-y-1 ${isDark ? "border-gray-800" : "border-teal-800"}`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isDark ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200" : "text-teal-300 hover:bg-teal-800 hover:text-white"}`}
            title={!sidebarOpen ? (isDark ? "Light mode" : "Dark mode") : undefined}
          >
            {isDark ? <Sun size={16} className="flex-shrink-0" /> : <Moon size={16} className="flex-shrink-0" />}
            {sidebarOpen && <span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
          </button>
          <Link
            to="/"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isDark ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200" : "text-teal-300 hover:bg-teal-800 hover:text-white"}`}
          >
            <Home size={16} className="flex-shrink-0" />
            {sidebarOpen && <span>Back to Website</span>}
          </Link>
          <button
            onClick={() => { logout(); navigate("/"); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isDark ? "text-red-400 hover:bg-gray-800" : "text-red-300 hover:bg-teal-800 hover:text-white"}`}
            title={!sidebarOpen ? "Sign Out" : undefined}
          >
            <LogOut size={16} className="flex-shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? "ml-56" : "ml-14"} transition-all duration-300 overflow-hidden`}>
        {/* Header */}
        <header className={`border-b px-6 py-3 flex items-center justify-between flex-shrink-0 ${headerBg}`}>
          <div>
            <h1 className={`font-bold text-lg ${textPrimary}`}>
              {navItems.find(n => n.id === activeTab)?.label || "Dashboard"}
            </h1>
            <p className={`text-xs ${textMuted}`}>
              Last updated: {new Date().toLocaleString("en-KE")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className={`relative p-2 rounded-lg transition-colors ${isDark ? "text-gray-400 hover:bg-gray-700" : "text-gray-500 hover:bg-gray-100"}`}>
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className={`flex items-center gap-2 rounded-xl px-3 py-1.5 ${isDark ? "bg-gray-700" : "bg-teal-50"}`}>
              <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{user?.avatar}</div>
              <div className="hidden sm:block">
                <p className={`text-xs font-semibold ${textPrimary}`}>{user?.name}</p>
                <p className={`text-xs capitalize ${textMuted}`}>{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ══ OVERVIEW TAB ══ */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {kpiData.map((card, i) => (
                  <KpiCard key={i} {...card} isDark={isDark} />
                ))}
              </div>

              {/* Charts Row 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Revenue Chart */}
                <div className={`lg:col-span-3 rounded-2xl p-5 shadow-sm border ${cardBg} ${cardBorder}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className={`font-semibold ${textPrimary}`}>Revenue vs Target</h3>
                      <p className={`text-xs ${textMuted}`}>6-month performance overview</p>
                    </div>
                    <div className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium ${isDark ? "bg-teal-900/40 text-teal-400" : "bg-teal-50 text-teal-700"}`}>
                      <TrendingUp size={12} /> +12.4% MoM
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={230}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0d9488" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f0f0f0"} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? "#9ca3af" : "#6b7280" }} />
                      <YAxis tick={{ fontSize: 11, fill: isDark ? "#9ca3af" : "#6b7280" }} tickFormatter={v => `${v / 1000}k`} />
                      <Tooltip content={<CustomTooltip isDark={isDark} />} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Area type="monotone" dataKey="revenue" stroke="#0d9488" fill="url(#revGrad)" strokeWidth={2.5} name="Revenue (KES)" />
                      <Area type="monotone" dataKey="target" stroke="#f59e0b" fill="url(#targetGrad)" strokeWidth={2} strokeDasharray="6 3" name="Target (KES)" />
                      <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#expGrad)" strokeWidth={1.5} name="Expenses (KES)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Revenue by Channel */}
                <div className={`lg:col-span-2 rounded-2xl p-5 shadow-sm border ${cardBg} ${cardBorder}`}>
                  <h3 className={`font-semibold mb-1 ${textPrimary}`}>Revenue by Channel</h3>
                  <p className={`text-xs ${textMuted} mb-4`}>March 2026 breakdown</p>
                  <div className="space-y-3">
                    {revenueByChannel.map((ch, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-medium ${textSub}`}>{ch.channel}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold ${textPrimary}`}>{ch.value}%</span>
                            <span className={`text-xs ${textMuted}`}>{ch.kes}</span>
                          </div>
                        </div>
                        <div className={`h-2 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                          <div
                            className="h-2 rounded-full transition-all duration-700"
                            style={{ width: `${ch.value}%`, backgroundColor: ch.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Charts Row 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Species Bar Chart */}
                <div className={`lg:col-span-3 rounded-2xl p-5 shadow-sm border ${cardBg} ${cardBorder}`}>
                  <h3 className={`font-semibold mb-1 ${textPrimary}`}>Sales Volume by Species (kg)</h3>
                  <p className={`text-xs ${textMuted} mb-4`}>Monthly comparison — all species</p>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={salesData} barGap={2}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f0f0f0"} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? "#9ca3af" : "#6b7280" }} />
                      <YAxis tick={{ fontSize: 11, fill: isDark ? "#9ca3af" : "#6b7280" }} />
                      <Tooltip content={<CustomTooltip isDark={isDark} />} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="tilapia" fill="#0d9488" name="Tilapia" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="catfish" fill="#f59e0b" name="Catfish" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="trout" fill="#3b82f6" name="Trout" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="carp" fill="#10b981" name="Carp" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Stock Distribution Donut */}
                <div className={`lg:col-span-2 rounded-2xl p-5 shadow-sm border ${cardBg} ${cardBorder}`}>
                  <h3 className={`font-semibold mb-1 ${textPrimary}`}>Stock Distribution</h3>
                  <p className={`text-xs ${textMuted} mb-2`}>% by species</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={stockDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={72}
                        paddingAngle={3}
                      >
                        {stockDistribution.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: isDark ? "#1f2937" : "#fff", border: "none", borderRadius: 12, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    {stockDistribution.map((s, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.fill }} />
                        <span className={`text-xs ${textMuted} truncate`}>{s.name} <strong className={textSub}>{s.value}%</strong></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: Water Quality + Activity + Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Water Quality */}
                <div className={`rounded-2xl p-5 shadow-sm border ${cardBg} ${cardBorder}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`p-2 rounded-xl ${isDark ? "bg-blue-900/40" : "bg-blue-50"}`}>
                      <Droplets size={15} className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${textPrimary}`}>Water Quality</h3>
                      <p className={`text-xs ${textMuted}`}>Live pond readings</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {waterQuality.map((m, i) => <WaterGauge key={i} metric={m} isDark={isDark} />)}
                  </div>
                </div>

                {/* Activity Feed */}
                <div className={`rounded-2xl p-5 shadow-sm border ${cardBg} ${cardBorder}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`p-2 rounded-xl ${isDark ? "bg-purple-900/40" : "bg-purple-50"}`}>
                      <Activity size={15} className="text-purple-500" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${textPrimary}`}>Recent Activity</h3>
                      <p className={`text-xs ${textMuted}`}>Latest farm events</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {activityFeed.map((a, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
                            a.type === "sale" ? "bg-teal-500" :
                            a.type === "maintenance" ? "bg-amber-500" :
                            a.type === "achievement" ? "bg-green-500" :
                            a.type === "supplier" ? "bg-blue-500" : "bg-gray-400"
                          }`} />
                          {i < activityFeed.length - 1 && <div className={`w-0.5 flex-1 mt-1 ${isDark ? "bg-gray-700" : "bg-gray-100"}`} />}
                        </div>
                        <div className="pb-3 flex-1 min-w-0">
                          <p className={`text-xs leading-relaxed ${textSub}`}>{a.action}</p>
                          <div className={`flex items-center gap-2 mt-0.5 text-xs ${textMuted}`}>
                            <span>{a.time}</span>
                            <span>·</span>
                            <span>{a.user}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alerts */}
                <div className={`rounded-2xl p-5 shadow-sm border ${cardBg} ${cardBorder}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`p-2 rounded-xl ${isDark ? "bg-amber-900/30" : "bg-amber-50"}`}>
                      <Bell size={15} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${textPrimary}`}>Alerts</h3>
                      <p className={`text-xs ${textMuted}`}>Requires attention</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { type: "warning", msg: "Pond RT-003: O₂ dropped to 5.2 mg/L. Check aerator.", priority: "High" },
                      { type: "info", msg: "Tilapia Batch TS-007 ready for harvest in 3 days.", priority: "Medium" },
                      { type: "success", msg: "Catfish fingerlings delivery confirmed — April 2.", priority: "Info" },
                      { type: "warning", msg: "AquaFeed Kenya invoice overdue 5 days — KES 22,000.", priority: "High" },
                    ].map((alert, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs ${
                          alert.type === "warning" ? isDark ? "bg-amber-900/20 border-amber-800/40" : "bg-amber-50 border-amber-200" :
                          alert.type === "success" ? isDark ? "bg-green-900/20 border-green-800/40" : "bg-green-50 border-green-200" :
                          isDark ? "bg-blue-900/20 border-blue-800/40" : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        {alert.type === "warning" ? <AlertTriangle size={13} className="text-amber-500 flex-shrink-0 mt-0.5" /> :
                         alert.type === "success" ? <CheckCircle size={13} className="text-green-500 flex-shrink-0 mt-0.5" /> :
                         <Bell size={13} className="text-blue-500 flex-shrink-0 mt-0.5" />}
                        <div>
                          <span className={`${isDark ? "text-gray-200" : "text-gray-700"} leading-relaxed`}>{alert.msg}</span>
                          <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                            alert.priority === "High" ? "bg-red-100 text-red-600" : alert.priority === "Medium" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                          }`}>
                            {alert.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ FISH STOCK TAB ══ */}
          {activeTab === "stock" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className={`font-bold text-xl ${textPrimary}`}>Fish Stock Management</h2>
                  <p className={`text-sm ${textMuted}`}>All ponds — updated daily at 6:00 AM</p>
                </div>
                <button className="flex items-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                  <Plus size={15} /> Add Stock Record
                </button>
              </div>

              {/* Species Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                {fishStock.map((fish, i) => (
                  <div key={i} className={`rounded-2xl p-4 shadow-sm border text-center ${cardBg} ${cardBorder}`}>
                    <div className="w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: fish.color + "20" }}>
                      <Fish size={16} style={{ color: fish.color }} />
                    </div>
                    <p className={`font-semibold text-sm mb-1 ${textPrimary}`}>{fish.species.split(" ")[0]}</p>
                    <p className="font-bold text-xl" style={{ color: fish.color }}>{(fish.totalKg / 1000).toFixed(1)}T</p>
                    <p className={`text-xs ${textMuted}`}>{fish.pondCount} ponds</p>
                    <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full ${fish.statusColor}`}>{fish.status}</span>
                  </div>
                ))}
              </div>

              {/* Harvest Countdown */}
              <div className={`rounded-2xl p-5 shadow-sm border ${cardBg} ${cardBorder}`}>
                <h3 className={`font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                  <Calendar size={15} className="text-teal-500" /> Days to Harvest
                </h3>
                <div className="space-y-3">
                  {fishStock.filter(f => f.daysToHarvest).map((fish, i) => {
                    const maxDays = 70;
                    const progress = 100 - ((fish.daysToHarvest! / maxDays) * 100);
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-28 flex-shrink-0">
                          <p className={`text-xs font-semibold ${textSub}`}>{fish.species.split(" ").slice(0, 2).join(" ")}</p>
                        </div>
                        <div className="flex-1">
                          <div className={`h-3 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                            <div
                              className="h-3 rounded-full transition-all duration-700"
                              style={{ width: `${progress}%`, backgroundColor: fish.color }}
                            />
                          </div>
                        </div>
                        <div className="w-20 text-right">
                          <span className={`text-xs font-bold ${fish.daysToHarvest! <= 20 ? "text-green-500" : fish.daysToHarvest! <= 35 ? "text-amber-500" : textMuted}`}>
                            {fish.daysToHarvest} days
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Table */}
              <div className={`rounded-2xl shadow-sm border overflow-hidden ${cardBg} ${cardBorder}`}>
                <div className={`p-4 border-b flex items-center justify-between ${cardBorder}`}>
                  <h3 className={`font-semibold ${textPrimary}`}>Detailed Stock Records</h3>
                  <button className={`flex items-center gap-1 text-xs transition-colors ${isDark ? "text-teal-400 hover:text-teal-300" : "text-teal-700 hover:text-teal-600"}`}>
                    <RefreshCw size={12} /> Refresh
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDark ? "bg-gray-700/50 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
                        {["Batch ID", "Species", "Ponds", "Total Stock", "Avg Weight", "Health", "Days to Harvest", "Actions"].map((h) => (
                          <th key={h} className={`text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide ${textMuted}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${divideColor}`}>
                      {fishStock.map((fish, i) => (
                        <tr key={i} className={`transition-colors ${tableHover}`}>
                          <td className={`px-4 py-3 text-xs font-mono ${textMuted}`}>{fish.id}</td>
                          <td className={`px-4 py-3 text-sm font-semibold ${textPrimary}`}>{fish.species}</td>
                          <td className={`px-4 py-3 text-sm ${textSub}`}>{fish.pondCount}</td>
                          <td className="px-4 py-3 text-sm font-bold text-teal-500">{fish.totalKg.toLocaleString()} kg</td>
                          <td className={`px-4 py-3 text-sm ${textSub}`}>{fish.avgWeight}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${fish.statusColor}`}>{fish.healthStatus}</span>
                          </td>
                          <td className={`px-4 py-3 text-sm ${textSub}`}>{fish.daysToHarvest ? `${fish.daysToHarvest} days` : "Sport Fish"}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button className={`p-1.5 rounded-lg transition-colors ${isDark ? "text-blue-400 hover:bg-blue-900/30" : "text-blue-600 hover:bg-blue-50"}`}><Edit size={13} /></button>
                              <button className={`p-1.5 rounded-lg transition-colors ${isDark ? "text-red-400 hover:bg-red-900/30" : "text-red-500 hover:bg-red-50"}`}><Trash2 size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ SALES TAB ══ */}
          {activeTab === "sales" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className={`font-bold text-xl ${textPrimary}`}>Sales Management</h2>
                  <p className={`text-sm ${textMuted}`}>All sales records — March 2026</p>
                </div>
                <button className="flex items-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                  <Plus size={15} /> Record New Sale
                </button>
              </div>

              {/* Sales KPIs */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { label: "Revenue (Mar)", value: "KES 540,000", icon: DollarSign, color: "from-teal-500 to-teal-700" },
                  { label: "Orders (Mar)", value: "47 orders", icon: Package, color: "from-blue-500 to-blue-700" },
                  { label: "Pending Delivery", value: "7 orders", icon: Truck, color: "from-amber-500 to-amber-700" },
                  { label: "Top Customer", value: "Nakuru Supermart", icon: Star, color: "from-green-500 to-green-700" },
                ].map((k, i) => {
                  const Icon = k.icon;
                  return (
                    <div key={i} className={`bg-gradient-to-br ${k.color} rounded-2xl p-4 text-white shadow-lg relative overflow-hidden`}>
                      <div className="absolute -right-3 -top-3 w-16 h-16 bg-white/10 rounded-full" />
                      <Icon size={18} className="text-white/80 mb-3" />
                      <p className="text-white/70 text-xs font-medium">{k.label}</p>
                      <p className="text-white font-bold text-lg mt-0.5">{k.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Sales Chart */}
              <div className={`rounded-2xl p-5 shadow-sm border ${cardBg} ${cardBorder}`}>
                <h3 className={`font-semibold mb-4 ${textPrimary}`}>Sales Volume by Species (kg)</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f0f0f0"} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? "#9ca3af" : "#6b7280" }} />
                    <YAxis tick={{ fontSize: 11, fill: isDark ? "#9ca3af" : "#6b7280" }} />
                    <Tooltip content={<CustomTooltip isDark={isDark} />} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="tilapia" fill="#0d9488" name="Tilapia (kg)" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="catfish" fill="#f59e0b" name="Catfish (kg)" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="trout" fill="#3b82f6" name="Trout (kg)" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="carp" fill="#10b981" name="Carp (kg)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Sales Table */}
              <div className={`rounded-2xl shadow-sm border overflow-hidden ${cardBg} ${cardBorder}`}>
                <div className={`p-4 border-b flex items-center gap-3 ${cardBorder}`}>
                  <Search size={15} className={textMuted} />
                  <input
                    type="text"
                    placeholder="Search by customer or species..."
                    value={searchSales}
                    onChange={(e) => setSearchSales(e.target.value)}
                    className={`flex-1 text-sm focus:outline-none bg-transparent ${textPrimary} placeholder:${textMuted}`}
                  />
                  <button className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                    <Filter size={11} /> Filter
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDark ? "bg-gray-700/50 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
                        {["Invoice ID", "Date", "Customer", "Type", "Species", "Qty", "Amount", "Status", "Action"].map((h) => (
                          <th key={h} className={`text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide whitespace-nowrap ${textMuted}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${divideColor}`}>
                      {filteredSales.map((s, i) => (
                        <tr key={i} className={`transition-colors ${tableHover}`}>
                          <td className={`px-4 py-3 text-xs font-mono ${textMuted}`}>{s.id}</td>
                          <td className={`px-4 py-3 text-xs ${textSub}`}>{s.date}</td>
                          <td className={`px-4 py-3 text-sm font-medium ${textPrimary} max-w-[140px] truncate`}>{s.customer}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}>{s.type}</span>
                          </td>
                          <td className={`px-4 py-3 text-sm ${textSub}`}>{s.species}</td>
                          <td className={`px-4 py-3 text-sm ${textSub}`}>{s.qty}</td>
                          <td className="px-4 py-3 text-sm font-bold text-teal-500">{s.amount}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              s.status === "Completed" ? "bg-green-100 text-green-700" :
                              s.status === "Pending" ? "bg-amber-100 text-amber-700" :
                              "bg-blue-100 text-blue-700"
                            }`}>{s.status}</span>
                          </td>
                          <td className="px-4 py-3">
                            <button className={`p-1.5 rounded-lg transition-colors ${isDark ? "text-blue-400 hover:bg-blue-900/30" : "text-blue-600 hover:bg-blue-50"}`}><Edit size={13} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ REPORTS TAB ══ */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`font-bold text-xl ${textPrimary}`}>Reports & Analytics</h2>
                  <p className={`text-sm ${textMuted}`}>Download and view farm reports</p>
                </div>
                <button className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-colors ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                  <Download size={14} /> Export All
                </button>
              </div>

              {/* Report Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {[
                  { title: "Monthly Sales Report", desc: "Revenue, orders, and top customers for March 2026", date: "Mar 26, 2026", type: "Sales", gradient: "from-teal-500 to-teal-700", icon: TrendingUp },
                  { title: "Fish Stock Report", desc: "Current stock, health status, and harvest forecast", date: "Mar 26, 2026", type: "Operations", gradient: "from-blue-500 to-blue-700", icon: Fish },
                  { title: "Q1 2026 Financial Summary", desc: "Revenue, expenses, profit margins — Jan–Mar 2026", date: "Mar 26, 2026", type: "Finance", gradient: "from-emerald-500 to-emerald-700", icon: DollarSign },
                  { title: "Water Quality Report", desc: "Pond health metrics, dissolved oxygen, pH levels", date: "Mar 25, 2026", type: "Health", gradient: "from-cyan-500 to-cyan-700", icon: Droplets },
                  { title: "Supplier Performance Report", desc: "Delivery timelines, quality ratings, outstanding payments", date: "Mar 20, 2026", type: "Procurement", gradient: "from-amber-500 to-amber-700", icon: Truck },
                  { title: "Community Outreach Impact", desc: "Farmers supported, fingerlings distributed, training sessions", date: "Mar 15, 2026", type: "Community", gradient: "from-purple-500 to-purple-700", icon: Users },
                ].map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div key={i} className={`rounded-2xl shadow-sm border overflow-hidden ${cardBg} ${cardBorder}`}>
                      <div className={`bg-gradient-to-r ${r.gradient} p-4 flex items-center gap-3`}>
                        <div className="bg-white/20 p-2 rounded-xl">
                          <Icon size={16} className="text-white" />
                        </div>
                        <div>
                          <span className="text-white/70 text-xs font-medium">{r.type}</span>
                          <p className="text-white font-semibold text-sm leading-tight">{r.title}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className={`text-sm ${textSub} mb-3 leading-relaxed`}>{r.desc}</p>
                        <div className={`flex items-center justify-between text-xs ${textMuted}`}>
                          <span>Generated: {r.date}</span>
                          <button className="flex items-center gap-1 text-teal-500 font-semibold hover:text-teal-400 transition-colors">
                            <Download size={12} /> Download PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className={`rounded-2xl p-5 shadow-sm border ${cardBg} ${cardBorder}`}>
                <h3 className={`font-semibold mb-4 ${textPrimary}`}>Q1 2026 Quick Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Revenue", value: "KES 1.37M", sub: "Jan–Mar 2026", color: "text-teal-500" },
                    { label: "Fish Sold", value: "4,820 kg", sub: "All species", color: "text-blue-500" },
                    { label: "New Customers", value: "23", sub: "First-time buyers", color: "text-green-500" },
                    { label: "Training Sessions", value: "8", sub: "Conducted Q1", color: "text-amber-500" },
                  ].map((s, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${isDark ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-100"}`}>
                      <p className={`text-xs ${textMuted} mb-1`}>{s.label}</p>
                      <p className={`font-bold text-xl ${s.color}`}>{s.value}</p>
                      <p className={`text-xs ${textMuted} mt-0.5`}>{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ SUPPLIERS TAB ══ */}
          {activeTab === "suppliers" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className={`font-bold text-xl ${textPrimary}`}>Supplier Management</h2>
                  <p className={`text-sm ${textMuted}`}>{suppliers.filter(s => s.status === "Active").length} active suppliers</p>
                </div>
                <button className="flex items-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                  <Plus size={15} /> Add Supplier
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {suppliers.map((sup, i) => (
                  <div key={i} className={`rounded-2xl p-5 shadow-sm border ${cardBg} ${cardBorder}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className={`font-semibold ${textPrimary}`}>{sup.name}</p>
                        <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}>{sup.category}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sup.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{sup.status}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={11} className={j < sup.rating ? "text-amber-400 fill-amber-400" : isDark ? "text-gray-600" : "text-gray-200"} />
                      ))}
                    </div>
                    <div className={`space-y-1.5 text-xs ${textSub}`}>
                      <div className="flex justify-between"><span className={textMuted}>Contact</span><span>{sup.contact}</span></div>
                      <div className="flex justify-between"><span className={textMuted}>Last Order</span><span>{sup.lastOrder}</span></div>
                      <div className="flex justify-between">
                        <span className={textMuted}>Outstanding</span>
                        <span className={sup.outstanding !== "KES 0" ? "text-red-500 font-semibold" : "text-green-500 font-semibold"}>{sup.outstanding}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className={`flex-1 text-xs py-1.5 rounded-lg border font-medium transition-colors ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                        Contact
                      </button>
                      <button className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${isDark ? "bg-teal-700 hover:bg-teal-600" : "bg-teal-50 hover:bg-teal-100"} text-teal-700`}>
                        New Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
