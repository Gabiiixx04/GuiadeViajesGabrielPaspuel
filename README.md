# GuiadeViajesGabrielPaspuel

## Ibarra Viva · Guía de viaje

Web interactiva sobre Ibarra (Ecuador), con diseño adaptable a móvil y escritorio y modos claro y oscuro.

### Funciones

- Lugares turísticos y restaurantes con sus fuentes y ubicaciones.
- Espacios deportivos con filtros para actividades individuales y en equipo.
- Búsqueda, favoritos y lista de equipaje.
- Itinerario editable de uno a tres días: añadir, ordenar y quitar paradas.
- Descarga del itinerario en texto y preparación de un correo mediante Gmail, Outlook.com o la aplicación de correo del visitante. El usuario confirma el envío en su correo.
- Enlaces a Iberia y Skyscanner para buscar vuelos a Quito (UIO) y continuar por carretera hasta Ibarra.
- Bandera de Ecuador y preferencias guardadas en el navegador.

### Ejecutar en local

No necesita instalación de dependencias ni compilación. Desde esta carpeta, inicia un servidor HTTP:

```bash
python3 -m http.server 5173
```

Abre **http://localhost:5173**. Los módulos JavaScript necesitan un servidor HTTP; abrir `index.html` directamente como archivo no es suficiente.

### Archivos

- `index.html`: estructura de la aplicación.
- `app.js`: pantallas e interacciones.
- `data.js`: lugares, restaurantes, deportes y proveedores de vuelos.
- `itinerary-share.js`: generación del itinerario y preparación de los correos.
- `styles.css`: estilos, transiciones, temas y diseño adaptable.
- `assets/`: fotografías, bandera, iconos y fuentes locales.

### Fuentes y créditos

Las referencias turísticas y los créditos fotográficos están en la pantalla **Fuentes y créditos** de la web. Las fotografías y las fuentes conservan la autoría de sus respectivos creadores.

El código corresponde a la versión publicada de Ibarra Viva con Iberia y la función de compartir itinerarios por correo.
