"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setMessage("");

  //   try {
  //     const { success, user, sessionToken } = await AuthService.signIn(
  //       email,
  //       password
  //     );

  //     if (!success) throw Error;

  //     // Redirection gérée par le middleware
  //     router.replace("/dashboard");
  //     // Stocker le token et les données utilisateur
  //     SessionManager.setToken(sessionToken);
  //     SessionManager.setUserData(user);
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       setMessage(error.message);
  //     } else {
  //       setMessage(String(error));
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("")

    console.log(`Email and passe : ,${email} and ${password}`)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('xxxxxx',data)
      localStorage.setItem("clienti", data.user.id_client);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("nom", data.user.nom);

      if (!res.ok) throw new Error(data.error);

      router.replace("/dashboard");

    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <div className="px-3">
        <h1 className="text-2xl font-bold text-zinc-800">Duqah Stat</h1>
        <p className="mt-4 text-[#558455]">
          La statistique de vos produits pour mieux decider.
        </p>

        <p className="text-red-700">{message}</p>
        <form onSubmit={handleLogin}>
          <div className="mt-2">
            <label htmlFor="" className="text-gray-400">
              E-mail
            </label>
            <input
              type="text"
              className="mt-2 block w-full text-gray-500 rounded border border-zinc-300 bg-white px-3 py-3 shadow-sm placeholder:text-zinc-400 focus:border-[#558455] focus:outline-none focus:ring-1 focus:ring-[#558455]"
              placeholder="E-mail "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="" className="text-gray-400">
              Mot de passe
            </label>
            <input
              type="password"
              className="mt-2 block w-full text-gray-500 rounded border border-zinc-300 bg-white px-3 py-3 shadow-sm placeholder:text-zinc-400 focus:border-[#558455] focus:outline-none focus:ring-1 focus:ring-[#558455]"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-[#558455] px-4 py-3 font-medium text-white hover:bg-[#4a744a] transition-colors duration-200"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </div>
        </form>

        <p className="text-[12px] text-gray-400 mt-3 text-center">
          Pas de compte ?{" "}
          <span className="text-gray-600">
            veuillez contact le service client de Duqah.
          </span>
        </p>
      </div>
    </div>
  );
}
