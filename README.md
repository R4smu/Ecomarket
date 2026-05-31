# 🛍️ Ecomarket - IES Albarregas

Plataforma web Full-Stack desarrollada para la gestión del Mercadillo Solidario del centro. Permite a los usuarios consultar artículos disponibles y solicitar reservas, mientras que ofrece a los administradores un panel de control completo para gestionar el inventario y las solicitudes.

---

## 💻 Tecnologías Empleadas

Este proyecto ha sido construido utilizando las siguientes tecnologías modernas:

* **Frontend:** React 18 con TypeScript.
* **Herramienta de Construcción:** Vite (por su rapidez y optimización).
* **Estilos y Diseño:** Tailwind CSS y Shadcn UI (Componentes accesibles y personalizables).
* **Backend y Base de Datos:** Supabase (PostgreSQL, Autenticación y Storage para imágenes).
* **Despliegue:** Vercel (Hosting serverless y CI/CD integrado).

---

## 🚀 Instalación y Despliegue Local

Sigue estos pasos para ejecutar el proyecto en tu propia máquina.

### Requisitos Previos
* Tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior).
* Tener instalado [Git](https://git-scm.com/).

### Instrucciones paso a paso

1. **Clonar el repositorio:**
   Abre tu terminal y ejecuta el siguiente comando para descargar el código a tu equipo:
   ```bash
   git clone [https://github.com/TU_USUARIO/TU_REPOSITORIO.git](https://github.com/R4smu/Ecomarket)
   ```

2. **Acceder al directorio del proyecto:**
   ```bash
   cd ecomarket
   ```

3. **Instalar las dependencias:**
   Vite y React necesitan descargar los paquetes necesarios (como Tailwind o Radix UI) para funcionar. Ejecuta:
   ```bash
   npm install
   ```

4. **Configuración de la Base de Datos (Supabase):**
   El proyecto ya cuenta con el archivo `src/supabase.ts` configurado para conectar con el backend. Asegúrate de tener las tablas `products` y `reservations` creadas en tu proyecto de Supabase, así como un *Bucket* público en Storage llamado `product-images`.

5. **Arrancar el servidor de desarrollo:**
   Una vez instaladas las dependencias, levanta el proyecto ejecutando:
   ```bash
   npm run dev
   ```
   La terminal te mostrará un enlace (generalmente `http://localhost:5173/`). Haz `Ctrl + Clic` sobre él para abrir la aplicación en tu navegador.

---

## 👥 Usuarios de Prueba (Testing)

Para facilitar la evaluación del proyecto, se han habilitado botones de autocompletado en la pantalla de inicio con los siguientes usuarios de prueba:

**Rol Administrador** (Acceso al CRUD y panel de gestión):
* **Email:** `admin@iesalbarregas.com`
* **Contraseña:** `Admin2026`

**Rol Usuario Peticionario** (Acceso al catálogo y reservas):
* **Email:** `user@iesalbarregas.com`
* **Contraseña:** `User2026!`

---

## 📖 Instrucciones de Uso

### 1. Pantalla de Acceso (Login)
Al entrar en la aplicación, la pasarela de enrutamiento determinará tu rol. Puedes usar los botones inferiores de "Atajos de Evaluación" para probar rápidamente los perfiles.

### 2. Panel Público (Vista de Usuario)
Si accedes como usuario normal, serás redirigido al catálogo interactivo. 
* Puedes usar la barra superior para **filtrar los artículos por categorías**.
* Al pulsar en "Solicitar Reserva", se abrirá una ventana flotante (Modal) para introducir tus datos de contacto y un mensaje para el administrador.

### 3. Panel de Administración (Gestión Integral)
Si accedes con credenciales de administrador, entrarás a la zona privada de gestión dividida en tres secciones clave:
* **Añadir/Editar Producto:** Formulario para subir nuevos artículos con su fotografía, o modificar los datos de uno ya existente.
* **Catálogo Actual:** Tabla interactiva para cambiar rápidamente el estado de un producto (Disponible, Reservado, Vendido), editarlo o eliminarlo de la base de datos.
* **Bandeja de Reservas:** Registro en tiempo real de las peticiones de los usuarios, con opción de marcar los mensajes como leídos tras gestionarlos.


---
*Proyecto desarrollado para el módulo Organismo Equiparado - Curso 2025/2026.*