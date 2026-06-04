"use client";
import {
  ShieldCheck,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import DashboardShell from "../../../../components/dashboard/DashboardShell";
import DashboardCard from "../../../../components/dashboard/DashboardCard";
import KpiCard from "../../../../components/dashboard/KpiCard";
import { useEffect, useState } from "react";

type Usuario = {
  id: string;
  correo: string;
  username: string;
  rol: string;
  enabled: boolean;
};

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    correo: "",
    contrasena: "",
    role: "USER",
  });

  const [usuarioSeleccionado, setUsuarioSeleccionado] =
    useState<Usuario | null>(null);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [editForm, setEditForm] = useState({
    correo: "",
    contrasena: "",
    rol: "",
  });

  const cargarUsuarios = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/users"
      );

      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }

      const data = await response.json();
      console.log(data);
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

const crearUsuario = async () => {
  console.log("ANTES DE ENVIAR:", nuevoUsuario);

  try {
    const response = await fetch(
      "http://localhost:8080/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      }
    );

    console.log("STATUS:", response.status);

    const texto = await response.text();
    console.log("RESPUESTA:", texto);

    if (!response.ok) {
      throw new Error("Error al crear usuario");
    }

    await cargarUsuarios();

    setNuevoUsuario({
      correo: "",
      contrasena: "",
      role: "USER",
    });

    setOpenModal(false);

    alert("Usuario creado correctamente");
  } catch (error) {
    console.error(error);
    alert("No se pudo crear el usuario");
  }
};

const actualizarUsuario = async () => {
  try {
    const usuarioActualizado = {
      id: usuarioSeleccionado?.id,
      correo: editForm.correo,
      contrasena: editForm.contrasena,
      rol: editForm.rol,
      enabled: true,
    };

    console.log("🟡 Usuario a actualizar:", usuarioActualizado);

    const response = await fetch(
      `http://localhost:8080/api/user/${usuarioSeleccionado?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioActualizado),
      }
    );

    console.log("📌 Status:", response.status);

    const texto = await response.text();
    console.log("📌 Respuesta:", texto);

    if (!response.ok) {
      throw new Error("Error al actualizar usuario");
    }

    alert("Usuario actualizado correctamente");

    await cargarUsuarios();

    setOpenEditModal(false);

    setEditForm({
      correo: "",
      contrasena: "",
      rol: "",
    });

    setUsuarioSeleccionado(null);
  } catch (error) {
    console.error("❌ Error:", error);
    alert("No se pudo actualizar el usuario");
  }
};

  const eliminarUsuario = async (id: string) => {
    console.log("ID a eliminar:", id);
    console.log("Usuario seleccionado:", usuarioSeleccionado);
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${id}`,
        {
          method: "DELETE",
        }
      );

      console.log("Status:", response.status);

      const texto = await response.text();
    console.log("Respuesta:", texto);

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }

      setOpenEditModal(false);

      await cargarUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <DashboardShell
      title="Gestión de usuarios"
      subtitle="Administre cuentas, roles, accesos y estados de los usuarios del sistema."
      roleLabel="Administrador"
      activeRole="admin"
    >
      <div className="space-y-8">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Usuarios totales"
            value={usuarios.length.toString()}
            change=""
            icon={<Users size={18} />}
            tone="green"
          />
          <KpiCard
            title="Administradores"
            value={
  usuarios
    .filter((u) => u.rol === "ADMIN")
    .length
    .toString()
}
            change="Con acceso completo"
            icon={<ShieldCheck size={18} />}
            tone="cream"
          />

          <KpiCard
            title="Usuarios estándar"
            value={
  usuarios
    .filter((u) => u.rol === "USER")
    .length
    .toString()
}
            change="Procesos en curso"
            icon={<UserCog size={18} />}
            tone="green"
          />
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <DashboardCard
            title="Administración de cuentas"
            subtitle="Consulte usuarios, roles y actividad reciente."
            icon={<Users size={18} />}
            tone="white"
          >
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-3 w-full md:max-w-[420px]">
                <input
                  type="text"
                  placeholder="Buscar por nombre o correo"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
                />
              </div>

              <div className="flex gap-3">
                <select className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none">
                  <option>Todos los roles</option>
                  <option>Administrador</option>
                  <option>Revisor</option>
                  <option>Usuario</option>
                </select>

                <button 
                onClick={() => setOpenModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0f5c3a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4a2f]">
                  <UserPlus size={16} />
                  Nuevo usuario
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-neutral-200 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#f8faf8]">
                    <tr className="text-left text-neutral-600">
                      <th className="px-4 py-3 font-semibold">Nombre</th>
                      <th className="px-4 py-3 font-semibold">Correo</th>
                      <th className="px-4 py-3 font-semibold">Rol</th>
                      <th className="px-4 py-3 font-semibold">Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {usuarios.map((user) => (
                      <tr key={user.correo} className="border-t border-neutral-200">
                        <td className="px-4 py-3 font-semibold text-neutral-900">
                          {user.username}
                        </td>
                        <td className="px-4 py-3 text-neutral-700">{user.correo}</td>
                        <td className="px-4 py-3 text-neutral-700">{user.rol}</td>

                        
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setUsuarioSeleccionado(user);
                                
                                setEditForm({
                                  correo: user.correo,
                                  contrasena: "",
                                  rol: user.rol,
                                });
                                setOpenEditModal(true);
                              }}
                              className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
                            >
                              Editar
                            </button>
                            <button className="rounded-lg border border-[#0f5c3a] px-3 py-1.5 text-xs font-semibold text-[#0f5c3a] transition hover:bg-green-50">
                              Permisos
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DashboardCard>

        </div>
      </div>

                    {openModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-lg font-bold">
        Crear usuario
      </h2>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Correo"
          value={nuevoUsuario.correo}
          onChange={(e) =>
            setNuevoUsuario({
              ...nuevoUsuario,
              correo: e.target.value,
            })
          }
          className="w-full rounded-lg border border-neutral-300 p-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={nuevoUsuario.contrasena}
          onChange={(e) =>
            setNuevoUsuario({
              ...nuevoUsuario,
              contrasena: e.target.value,
            })
          }
          className="w-full rounded-lg border border-neutral-300 p-3"
        />

        <select
          value={nuevoUsuario.role}
          onChange={(e) => {
            console.log("ROL SELECCIONADO:", e.target.value);
            setNuevoUsuario({
              ...nuevoUsuario,
              role: e.target.value,
            })
          }}
          className="w-full rounded-lg border border-neutral-300 p-3"
        >
          <option value="USER">Usuario</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setOpenModal(false)}
          className="rounded-lg border border-neutral-300 px-4 py-2"
        >
          Cancelar
        </button>

        <button
          onClick={crearUsuario}
          className="rounded-lg bg-[#0f5c3a] px-4 py-2 text-white"
        >
          Crear usuario
        </button>
      </div>
    </div>
  </div>
)}
      

      {openEditModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-lg font-bold">
        Editar usuario
      </h2>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Correo"
          value={editForm.correo}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              correo: e.target.value,
            })
          }
          className="w-full rounded-lg border border-neutral-300 p-3"
        />

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={editForm.contrasena}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              contrasena: e.target.value,
            })
          }
          className="w-full rounded-lg border border-neutral-300 p-3"
        />

        <select
          value={editForm.rol}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              rol: e.target.value,
            })
          }
          className="w-full rounded-lg border border-neutral-300 p-3"
        >
          <option value="USER">Usuario</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => {
            if (!usuarioSeleccionado) return;
            eliminarUsuario(usuarioSeleccionado.id);
          }}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Eliminar
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => setOpenEditModal(false)}
            className="rounded-lg border border-neutral-300 px-4 py-2"
          >
            Cancelar
          </button>

          <button
            onClick={actualizarUsuario}
            className="rounded-lg bg-[#0f5c3a] px-4 py-2 text-white"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </DashboardShell>
  );
}

function RoleCard({
  title,
  description,
  users,
}: {
  title: string;
  description: string;
  users: string;
}) {
  return (
    <div className="rounded-[18px] border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-base font-bold text-neutral-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
      <p className="mt-3 text-sm font-semibold text-[#0f5c3a]">{users}</p>
    </div>
  );
}