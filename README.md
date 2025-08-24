# 🎉 Bingo Stream Controller

Este es un sistema interactivo de **Bingo en vivo** diseñado para transmisiones por OBS, ideal para eventos, rifas universitarias o streamings solidarios.

## 📦 Contenido del Proyecto

- `server.js`: Servidor Node.js con WebSocket para sincronizar números en tiempo real.
- `public/control.html`: Panel de control para agregar, deshacer y resetear números.
- `public/overlay.html`: Overlay vertical con últimos números y tablero.
- `public/overlayhorizontal.html`: Overlay horizontal con letras BINGO iluminadas y tablero por secciones.

## 🚀 Cómo usarlo

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/bingo-stream.git
cd bingo-stream

### 2. Instalar dependencias (solo express y ws)
npm install

### 3. Iniciar el servidor
node server.js

### 4. Acceder desde el navegador

Control
http://localhost:3000/control.html

Overlay vertical
http://localhost:3000/overlay.html

Overlay horizontal
http://localhost:3000/overlayhorizontal.html

