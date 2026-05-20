# 💬 Chat-App Fullstack

Aplicación web de chat en tiempo real desarrollada con **React + TypeScript en el frontend** y **Node.js + Express en el backend**, utilizando **Socket.io para comunicación en tiempo real**.

Incluye sistema de autenticación, chats privados, estado de usuarios en línea y mensajería instantánea.

---

# 🚀 Demo

🔗 [Chat App Live Demo](https://react-chat-w4wh.onrender.com/)

---

# ✨ Características

- 💬 Chat en tiempo real con Socket.io
- 🔐 Autenticación de usuarios (registro, login, logout)
- 👤 Perfil de usuario
- 🟢 Estado online / offline de usuarios
- 📩 Mensajes privados entre usuarios
- 📜 Historial de conversaciones persistente
- 🔎 Lista de usuarios registrados
- ⚡ Mensajes instantáneos sin recargar
- 📱 Diseño responsive
- 🔔 Notificaciones de mensajes nuevos
- 🧠 Estado global con Zustand / Context API
- 🔒 Rutas protegidas (Protected Routes)

---

# 🛠️ Tecnologías

## Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Zustand / Context API
- Socket.io-client
- Axios

## Backend

- Node.js
- Express
- Socket.io
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- CORS
- dotenv

---

# 📦 Instalación

Clona el repositorio:

git clone https://github.com/Lainercaceres11/react-chat.git

Backend:

cd backend  
npm install  
npm run dev

Frontend:

cd frontend  
npm install  
npm run dev

---

# 🔑 Variables de entorno

## Backend (.env)

PORT=5000  
MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=cloud_name  
CLOUDINARY_API_KEY=cloud_key  
CLOUDINARY_API_SECRET=cloud_api_secret

---

# 📁 Estructura del proyecto

server/
- src/
  - controllers/
  - models/
  - routes/
  - middleware/
  - sockets/
  - config/

client/
- src/
  - components/
  - pages/
  - hooks/
  - store/
  - services/
  - context/
  - types/
  - assets/

---

# ⚡ Tiempo real

- Conexión y desconexión de usuarios
- Chat instantáneo entre usuarios
- Actualización automática sin recargar página
- Indicador de escritura (typing...)

---

# 🔐 Seguridad

- Autenticación con JWT
- Contraseñas encriptadas con bcrypt
- Rutas protegidas en frontend y backend
- Validación de sesiones activas

---

# 📸 Preview

- Login y registro de usuarios
- Lista de usuarios conectados
- Chat en tiempo real estilo WhatsApp
- Indicador de escritura
- Mensajes instantáneos

---

# 📄 Licencia

Proyecto creado con fines educativos y de portafolio.

---

# 👨‍💻 Autor

Desarrollado por Lainer Cáceres 🚀
