"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  Search,
  UserPlus,
  LogIn,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();

  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("admin@udea.edu.co");
  const [password, setPassword] = useState("123456");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setInfoMessage("");

    if (tab === "register") {
      setInfoMessage(
        "El diseño de registro quedó listo, pero aún no hemos conectado el endpoint de registro. Por ahora puedes ingresar con un usuario demo."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.message || "Credenciales inválidas");
        return;
      }

      router.push(data.redirectTo);
      router.refresh();
    } catch {
      setError("Ocurrió un error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#e9dfdf] px-4 py-8 md:px-8">
      <section className="mx-auto w-full max-w-6xl overflow-hidden rounded-[22px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
        {/* Topbar */}
        <div className="flex flex-col gap-3 bg-[#0f5c3a] px-6 py-3 text-white md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm">
            <span className="flex items-center gap-2">
              <Phone size={14} />
              +57 (604) 219 0000
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} />
              posgrados@universidad.edu.co
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs md:text-sm">
            <button
              type="button"
              onClick={() => {
                setTab("register");
                setError("");
                setInfoMessage("");
              }}
              className="flex items-center gap-1 hover:text-green-200"
            >
              <UserPlus size={14} />
              Registrarse
            </button>

            <button
              type="button"
              onClick={() => {
                setTab("login");
                setError("");
                setInfoMessage("");
              }}
              className="flex items-center gap-1 hover:text-green-200"
            >
              <LogIn size={14} />
              Iniciar sesión
            </button>
          </div>
        </div>

        {/* Navbar */}
        <div className="flex flex-col gap-4 border-b border-neutral-200 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-[#0f5c3a]">
              U
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">Universidad</p>
              <p className="text-xs text-neutral-500">Portal de Posgrados</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-neutral-600 lg:flex">
            <Link href="#" className="hover:text-[#0f5c3a]">
              Inicio
            </Link>
            <Link href="#" className="hover:text-[#0f5c3a]">
              Programas
            </Link>
            <Link href="#" className="hover:text-[#0f5c3a]">
              Admisiones
            </Link>
            <Link href="#" className="hover:text-[#0f5c3a]">
              Campus
            </Link>
            <Link href="#" className="hover:text-[#0f5c3a]">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg bg-[#0f5c3a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0b4a2f]"
            >
              Convocatorias
            </button>

            <button
              type="button"
              className="rounded-full border border-neutral-300 p-2 text-neutral-600 transition hover:bg-neutral-100"
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="grid min-h-[620px] lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div className="flex items-center px-6 py-10 md:px-10 lg:px-12">
            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold text-[#0f5c3a]">
                Bienvenido al Portal de Inscripciones de Posgrados
              </p>

              <h1 className="text-4xl font-extrabold leading-tight text-neutral-950 md:text-5xl">
                Continúa tu formación con una experiencia de acceso moderna y clara
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-neutral-600">
                Consulta convocatorias, crea tu cuenta, inicia sesión y gestiona tu
                proceso de inscripción desde una interfaz más limpia, institucional
                y fácil de usar.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-lg bg-[#0f5c3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4a2f]"
                >
                  Ver convocatorias
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-[#0f5c3a] px-5 py-3 text-sm font-semibold text-[#0f5c3a] transition hover:bg-green-50"
                >
                  Conocer programas
                </button>
              </div>

              <div className="mt-10 rounded-2xl border border-neutral-200 bg-[#fbfaf5] p-5">
                <p className="text-sm font-semibold text-neutral-900">
                  Usuarios demo conectados al dashboard
                </p>

                <div className="mt-3 space-y-2 text-sm text-neutral-600">
                  <p>
                    <span className="font-semibold text-[#0f5c3a]">Admin:</span>{" "}
                    admin@udea.edu.co / 123456
                  </p>
                  <p>
                    <span className="font-semibold text-[#0f5c3a]">Usuario:</span>{" "}
                    usuario@udea.edu.co / 123456
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-neutral-500">
                <span>Admisiones abiertas</span>
                <span>Acompañamiento al aspirante</span>
                <span>Proceso 100% digital</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative overflow-hidden bg-[#114d36] px-6 py-10 md:px-10">
            {/* Imagen de fondo real */}
            <div className="absolute inset-0">
              <Image
                src="/images/udea-campus.jpg"
                alt="Campus universitario"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[#114d36]/65" />
            </div>

            {/* Decoración */}
            <div className="absolute right-0 top-0 z-10 h-44 w-44 rounded-bl-[60px] bg-[#0b3d2b]/65" />
            <div className="absolute bottom-0 left-0 z-10 h-32 w-32 rounded-tr-[50px] bg-[#0b3d2b]/55" />

            <div className="relative z-20 flex h-full items-center justify-center">
              <div className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl md:p-8">
                <p className="text-sm font-medium text-[#0f5c3a]">Acceso al portal</p>
                <h2 className="mt-2 text-2xl font-bold text-neutral-900">
                  {tab === "login" ? "Iniciar sesión" : "Crear cuenta"}
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  {tab === "login"
                    ? "Ingresa tus datos para continuar con tu proceso."
                    : "Regístrate para iniciar tu proceso de inscripción."}
                </p>

                <div className="mt-6 grid grid-cols-2 rounded-xl bg-neutral-100 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setTab("login");
                      setError("");
                      setInfoMessage("");
                    }}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      tab === "login"
                        ? "bg-white text-[#0f5c3a] shadow-sm"
                        : "text-neutral-500"
                    }`}
                  >
                    Iniciar sesión
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTab("register");
                      setError("");
                      setInfoMessage("");
                    }}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      tab === "register"
                        ? "bg-white text-[#0f5c3a] shadow-sm"
                        : "text-neutral-500"
                    }`}
                  >
                    Registrarse
                  </button>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  {tab === "register" && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-neutral-700">
                        Nombre completo
                      </label>
                      <div className="flex items-center rounded-xl border border-neutral-200 px-4 py-3 focus-within:border-[#0f5c3a] focus-within:ring-4 focus-within:ring-green-100">
                        <User size={17} className="mr-2 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Escribe tu nombre"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-transparent text-sm outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Correo
                    </label>
                    <div className="flex items-center rounded-xl border border-neutral-200 px-4 py-3 focus-within:border-[#0f5c3a] focus-within:ring-4 focus-within:ring-green-100">
                      <Mail size={17} className="mr-2 text-neutral-400" />
                      <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Contraseña
                    </label>
                    <div className="flex items-center rounded-xl border border-neutral-200 px-4 py-3 focus-within:border-[#0f5c3a] focus-within:ring-4 focus-within:ring-green-100">
                      <Lock size={17} className="mr-2 text-neutral-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent text-sm outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-neutral-400 hover:text-neutral-700"
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  {tab === "login" && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 text-neutral-600">
                        <input type="checkbox" className="accent-[#0f5c3a]" />
                        Recordarme
                      </label>
                      <a href="#" className="font-medium text-[#0f5c3a] hover:underline">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                      {error}
                    </div>
                  )}

                  {infoMessage && (
                    <div className="rounded-xl border border-amber-200 bg-[#fffaf0] px-4 py-3 text-sm text-[#8a6d1f]">
                      {infoMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#0f5c3a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4a2f] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading
                      ? "Procesando..."
                      : tab === "login"
                      ? "Ingresar al portal"
                      : "Crear cuenta"}
                  </button>
                </form>

                <p className="mt-5 text-center text-sm text-neutral-500">
                  {tab === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setTab(tab === "login" ? "register" : "login");
                      setError("");
                      setInfoMessage("");
                    }}
                    className="font-semibold text-[#0f5c3a] hover:underline"
                  >
                    {tab === "login" ? "Regístrate" : "Inicia sesión"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}