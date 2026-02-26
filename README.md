# Iglesia Betel — Sitio Web

Sitio web estático construido con [Hugo](https://gohugo.io/), administrado con [Decap CMS](https://decapcms.org/) y desplegado en [Netlify](https://netlify.com/).

---

## Primeros pasos

### Requisitos
- [Hugo Extended](https://gohugo.io/installation/) v0.147.1 o superior
- Git

### Correr localmente

```bash
# Clonar el repo
git clone https://github.com/TU-USUARIO/iglesia-betel.git
cd iglesia-betel

# Iniciar servidor de desarrollo
hugo server -D

# El sitio estará en http://localhost:1313
```

---

## Estructura del proyecto

```
├── content/
│   ├── _index.md              ← Textos del inicio (editable en CMS)
│   ├── nosotros/_index.md     ← Visión, misión, historia
│   ├── predicaciones/         ← Un .md por predicación
│   ├── eventos/               ← Un .md por evento
│   └── ministerios/           ← Un .md por ministerio
├── layouts/                   ← Templates HTML
├── static/
│   ├── admin/                 ← Decap CMS
│   ├── css/shared.css         ← Estilos globales
│   ├── js/main.js
│   └── img/logo.jpg           ← ⚠️ Agregar el logo aquí
├── data/
│   └── contacto.yaml          ← Dirección, teléfono, horarios
└── hugo.toml                  ← Configuración del sitio
```

---

## Agregar el logo

Copiá el archivo `betel-logo.jpg` (o `.png`) a:

```
static/img/logo.jpg
```

---

## Configurar Decap CMS en Netlify

1. En Netlify: **Site Settings → Identity → Enable Identity**
2. En **Identity → Registration**: cambiar a "Invite only"
3. En **Identity → Services → Git Gateway**: habilitar
4. Invitá al editor desde **Identity → Invite users**
5. El editor entra a `https://tu-sitio.netlify.app/admin/` con su email

---

## Cómo agregar contenido

### Nueva predicación

Crear `content/predicaciones/YYYY-MM-DD-titulo-slug.md`:

```yaml
---
title: "Título del mensaje"
date: 2025-06-01
predicador: "Pr. Nombre Apellido"
serie: "nombre-de-la-serie"   # minúsculas, con guiones
serie_ep: 1
pasaje: "Juan 3:16"
duracion: "45 min"
youtube_url: "https://www.youtube.com/watch?v=ID"
youtube_id: "ID_del_video"
destacado: false
tags: ["tag1", "tag2"]
---

Resumen e información adicional en markdown.
```

### Nuevo evento

```yaml
---
title: "Nombre del evento"
date: 2025-07-15
hora: "20:00 hs"
lugar: "Salón principal"
tipos: "culto-especial"   # ver opciones en admin/config.yml
estado: "proximo"         # proximo | realizado
entrada: "Libre y gratuita"
instagram_url: ""         # opcional
---

Descripción del evento.

## Crónica
Completar después del evento si hay algo para contar.
```

### Actualizar horarios o dirección

- Opción A: Editar `data/contacto.yaml` directamente
- Opción B: Entrar al CMS en `/admin/` → Configuración del sitio

---

## Deploy

Cada `git push` a `main` dispara un build automático en Netlify.

El tiempo de build es aproximadamente 30–60 segundos.

---

## Personalización pendiente

- [ ] Reemplazar `static/img/logo.jpg` con el logo real
- [ ] Actualizar datos de contacto en `data/contacto.yaml`
- [ ] Actualizar nombres del liderazgo en `layouts/nosotros/single.html`
- [ ] Activar Netlify Identity y Git Gateway
- [ ] Configurar formulario de contacto (Netlify Forms o Formspree)
- [ ] Agregar Google Analytics o Plausible si se desea
- [ ] Agregar foto de la iglesia para reemplazar el placeholder en la sección visión
