"use client";

import { Skeleton } from "@/component/skeleton";
import {
  ArrowDown,
  ArrowUp,
  CircleUser,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#1b7045", "#353535", "#fc5d02", "#558455"];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const date = new Date();

  // Fake loading (remplace par API plus tard)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { title: "Nombre de visiteurs", value: "12 480" },
    { title: "Taux de conversion", value: "3.4%" },
    { title: "Taux d'hésitation", value: "18%" },
  ];

  const deviceData = [
    { name: "Ordinateur", value: 55 },
    { name: "Téléphones", value: 35 },
    { name: "Tablettes", value: 10 },
  ];

  const countryData = [
    { country: "France", value: 4200 },
    { country: "USA", value: 3100 },
    { country: "Canada", value: 1800 },
    { country: "Allemagne", value: 1500 },
  ];

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
        <Skeleton className="h-40" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <CircleUser className="text-[#353535]" />
          <h2 className="text-[#353535]">Utilisateur</h2>
        </div>
        <div>
          <LogOut className="text-red-600" />
          {/* <h2 className="text-[#353535]"> Se deconnecter</h2> */}
        </div>
      </div>
      {/* SECTION 1 — CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="
              bg-white rounded-xl p-6 border shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-md
            "
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <div className="flex items-center justify-between">
              <p className="mt-2 text-3xl font-bold text-[#558455]">
                {stat.value}
              </p>
              {Number(stat.value) > 50 ? (
                <ArrowUp className="text-[#558455]" />
              ) : (
                <ArrowDown className="text-red-600" />
              )}
            </div>
          </div>
        ))}
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
                data={deviceData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                // label
              >
                {deviceData.map((_, index) => (
                  <Cell key={index}  fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend/>
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
            <BarChart data={countryData}>
              <XAxis dataKey="country" />
              {/* <YAxis /> */}
              <Tooltip />
              <Bar dataKey="value" fill="#fc5d02" radius={[6, 6, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <footer>
        <div></div>
        <div className="flex gap-6 justify-center">
          <span className="text-gray-400 text-[14px]">
            Copy right | {date.getFullYear()}{" "}
          </span>
          <div className="text-gray-700">Logo</div>
        </div>
      </footer>
    </div>
  );
}
