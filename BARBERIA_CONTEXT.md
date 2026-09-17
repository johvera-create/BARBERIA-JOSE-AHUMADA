# 💈 Barbería José Ahumada — Contexto Global y Despliegue

Este archivo documenta la arquitectura actual, el despliegue en producción y la conexión con el CRM PYME Flow para que cualquier conversación de Antigravity conozca el estado exacto del proyecto.

---

## 🌐 1. Despliegue y URLs de Producción
- **Dominio Público Oficial**: [https://barberia.pymeflowapp.cl](https://barberia.pymeflowapp.cl)
- **Servidor VPS**: 13.140.39.136 (Ubuntu en AWS / Docker Swarm)
- **Servicio Docker**: barberia_app (Nginx Alpine con proxy Traefik y SSL automático Let's Encrypt / Cloudflare).
- **Redes Docker**: easypanel (Traefik) y easypanel-crm (comunicación interna).

---

## 🔗 2. Integración con el CRM PYME Flow
- **Endpoint de Reservas**: POST https://pymeflowapp.cl/api/v1/booking
- **Organización en CRM**:
  - name: Barbería José Ahumada
  - slug: barberia
  - id: cmtuwwtz70000rvi4ct4b92lr
- **Payload enviado desde src/components/Booking.tsx**:
  name, phone, serviceTitle, date, time, price, notes, orgSlug: 'barberia'
- **Comportamiento en CRM**:
  - Se crea o actualiza el Contacto en la organización de Barbería.
  - Se crea un Trato (Deal) en la etapa 'Cita Agendada' con el valor real del servicio (ej. $12.000) de forma 100% aislada de PYME Flow o Audicontab.
- **Respaldo por correo**:
  - https://formsubmit.co/ajax/joseaahumadaperez@gmail.com

---

## ✂️ 3. Servicios y Precios Actuales (src/data.ts)
- Cortes: Clásico Adulto ($10.000), Degradado ($12.000), Solo Tijeras ($12.000), Lavado ($5.000)
- Barba: Perfilado ($8.000), Ritual Toalla ($10.000)
- Combos: Clásico + Barba ($16.000), Degradé + Barba ($18.000), Toalla Caliente ($18.000), Completo Premium ($20.000)

---

## 🚀 4. Flujo para Compilar y Desplegar Cambios
Cada vez que se modifique un diseño o precio en este proyecto:
1. `npm run build`
2. Empaquetar `dist` y enviar vía SSH/Docker al VPS (13.140.39.136).
