"use client";

import { Skeleton } from "@/component/skeleton";
import { VerticalLabel } from "@/component/vertical-label";
import { ArrowDown, ArrowUp, CircleUser, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

const COLORS = ["#1b7045", "#353535", "#fc5d02", "#558455"];

type TotalStats = {
  visites: number;
};


export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  // const [nom, setNom] = useState<string | null>(null);
  const [devices, setDevices] = useState([]);
  const [total, setTotal] = useState<TotalStats | null>(null);
  const [countries, setCountries] = useState([]);

  const [nom] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("nom");
  });

  const [id] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("clienti");
  });

  console.log("Client id ", id);
  // Fake loading (remplace par API plus tard)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    async function loadStats() {
      const [d, t, c] = await Promise.all([
        fetch(`/api/stats/devices?client_id=${id}`).then((r) => r.json()),
        fetch(`/api/stats/total?client_id=${id}`).then((r) => r.json()),
        fetch(`/api/stats/country?client_id=${id}`).then((r) => r.json()),
      ]);

      setDevices(d);
      setTotal(t);
      setCountries(c);
    }
    loadStats();
  }, []);

  console.log("device ", devices);
  console.log(" total ", total);
  console.log(" countries ", countries);

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>

        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <CircleUser className="text-[#353535]" />
          <h2 className="text-[#353535]">{nom}</h2>
        </div>
        <div>
          <LogOut className="text-red-600" />
        </div>
      </div>
      {/* SECTION 1 — CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="
              bg-white rounded-xl p-6 border shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-md
            "
        >
          <p className="text-sm text-gray-500">Nombre de visite</p>
          <div className="flex items-center justify-between">
            <p className="mt-2 text-3xl font-bold text-[#558455]">
              {total?.visites ?? 0}
            </p>
            {Number(total?.visites ?? 0) > 50 ? (
              <ArrowUp className="text-[#558455]" />
            ) : (
              <ArrowDown className="text-red-600" />
            )}
          </div>
        </div>
        <div
          className="
              bg-white rounded-xl p-6 border shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-md
            "
        >
          <p className="text-sm text-gray-500">Nombre de visite</p>
          <div className="flex items-center justify-between">
            <p className="mt-2 text-3xl font-bold text-[#558455]">
              {total?.visites ?? 0}
            </p>
            {Number(total?.visites ?? 0) > 50 ? (
              <ArrowUp className="text-[#558455]" />
            ) : (
              <ArrowDown className="text-red-600" />
            )}
          </div>
        </div>
        <div
          className="
              bg-white rounded-xl p-6 border shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-md
            "
        >
          <p className="text-sm text-gray-500">Nombre de visite</p>
          <div className="flex items-center justify-between">
            <p className="mt-2 text-3xl font-bold text-[#558455]">
              {total?.visites ?? 0}
            </p>
            {Number(total?.visites ?? 0) > 50 ? (
              <ArrowUp className="text-[#558455]" />
            ) : (
              <ArrowDown className="text-red-600" />
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2 — PIE CHART (DEVICE) */}
      <section
        className="
          group bg-white rounded-xl p-6 border shadow-sm
          transition-all duration-300
          hover:shadow-md
        "
      >
        {/* Titre */}
        <h2
          className="
            text-lg font-semibold mb-4
            text-gray-600 text-center
            opacity-100
            transition-opacity duration-300
          "
        >
          Répartition par appareil
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={devices}
                dataKey="visites"
                nameKey="device_type"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
              >
                {devices.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* SECTION 3 — BAR CHART (COUNTRIES) */}
      <section
        className="
          bg-white rounded-xl p-6 border shadow-sm
          transition-all duration-300
          hover:shadow-md
        "
      >
        <h2 className="text-lg text-gray-600 font-semibold mb-4 text-center">
          Visiteurs par pays
        </h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={countries}>
              <Tooltip />

              <Bar dataKey="visites" fill="#fc5d02" radius={[6, 6, 0, 0]}>
                {/* <LabelList
                  dataKey="country"
                  content={(props: DataPoint) => <VerticalLabel {...props} />}
                /> */}
                <LabelList
                  dataKey="country"
                  content={(props) => <VerticalLabel {...props} />}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <footer>
        <div></div>
        <div className="flex gap-6 justify-center">
          <span className="text-gray-400 text-[14px]">
            Copy right | {new Date().getFullYear()}{" "}
          </span>
          <div className="text-gray-700">Logo</div>
        </div>
      </footer>
    </div>
  );
}


