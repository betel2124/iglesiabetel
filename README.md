# Iglesia Betel - Sitio Web

Sitio web estático construido con [Hugo](https://gohugo.io/), administrado con [Decap CMS](https://decapcms.org/) y desplegado en [Netlify](https://netlify.com/).

## Primeros pasos

### Requisitos
- [Hugo Extended](https://gohugo.io/installation/) v0.147.1 o superior
- Git

### Correr localmente

```bash
git clone https://github.com/TU-USUARIO/iglesia-betel.git
cd iglesia-betel
hugo server -D
```

El sitio estará en `http://localhost:1313`.

## Estructura del proyecto

```text
├── content/
│   ├── _index.md
│   ├── nosotros/_index.md
│   ├── predicaciones/
│   └── ministerios/
├── layouts/
├── static/
│   ├── admin/
│   ├── css/shared.css
│   ├── js/main.js
│   └── img/logo.jpg
└── hugo.toml
```

## Configuración

- La configuración global del sitio vive en `hugo.toml`.
- Los datos de contacto y horarios están en `[params]` dentro de `hugo.toml`.
- `anios_ministerio` también se define en `hugo.toml` y se usa en la home y en la sección Nosotros.

## Contenido

### Nueva predicación

Crear `content/predicaciones/YYYY-MM-DD-titulo-slug.md`:

```yaml
---
title: "Título del mensaje"
date: 2025-06-01
predicador: "Pr. Nombre Apellido"
serie: "nombre-de-la-serie"
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

### Actualizar horarios o dirección

Editar la sección `[params]` en `hugo.toml`.

## Decap CMS

1. En Netlify: `Site Settings > Identity > Enable Identity`
2. En `Identity > Registration`: cambiar a `Invite only`
3. En `Identity > Services > Git Gateway`: habilitar
4. Invitar al editor desde `Identity > Invite users`
5. El editor entra a `/admin/`

## Deploy

Cada `git push` a `main` dispara un build automático en Netlify.

## Pendientes

- Reemplazar `static/img/logo.jpg` con el logo real
- Actualizar datos de contacto en `hugo.toml`
- Actualizar nombres del liderazgo en `layouts/nosotros/single.html`
- Activar Netlify Identity y Git Gateway
- Configurar formulario de contacto
- Agregar analítica si se desea
