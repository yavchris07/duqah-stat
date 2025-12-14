
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
    <div className="">
      <h1 className="text-2xl font-bold text-zinc-800">Duqah Stat</h1>
      <p className="mt-4 text-[#558455]">
        La statistique de vos produits pour mieux decider.
      </p>
      <div className="mt-2">
        <label htmlFor="" className="text-gray-400">Telephone</label>
        <input
          type="text"
          className="mt-2 block w-full text-gray-500 rounded border border-zinc-300 bg-white px-3 py-3 shadow-sm placeholder:text-zinc-400 focus:border-[#558455] focus:outline-none focus:ring-1 focus:ring-[#558455]"
          placeholder="+1 (555) 555-5555"
        />
      </div>
      <div className="mt-2">
        <label htmlFor="" className="text-gray-400">Mot de passe</label>
        <input
          type="password"
          className="mt-2 block w-full text-gray-500 rounded border border-zinc-300 bg-white px-3 py-3 shadow-sm placeholder:text-zinc-400 focus:border-[#558455] focus:outline-none focus:ring-1 focus:ring-[#558455]"
          placeholder="Votre mot de passe"
        />
      </div>
      <div className="mt-4">
        <button className="w-full rounded bg-[#558455] px-4 py-3 font-medium text-white hover:bg-[#4a744a] transition-colors duration-200">
          Se connecter
        </button>
      </div>
    </div>
    </div>
  );
}
