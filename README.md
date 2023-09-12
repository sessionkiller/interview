# PRUEBA TÉCNICA FRONTEND DEVELOPER


Utilizando el el comando ***git clone[ ](https://github.com/iRepo/technical-interview.git)<https://github.com/iRepo/technical-interview.git> --depth*** que es un boilerplate de una aplicación de Next.js con Typescript, Jest y React testing library y la API pública de Rick y Morty (<https://rickandmortyapi.com/>) se requiere que exista un listado de personajes con paginación y al hacer clic en uno de los personajes se muestre el detalle del personaje en cuestión en una ventana modal.

Será necesario que la aplicación tenga el testing unitario y de ui correspondiente.

Será necesario desplegar la aplicación en Vercel (Gratuito). En el repositorio ofrecemos un script de deploy creado para realizar despliegues automáticos cuando detecte un commit con la palabra “deploy”, para que esto funcione has de tener un repository previamente creado en Vercel (**El repositorio no puede estar conectado con el bot de Vercel**) y añadir los siguientes secrets en tu repositorio de github:

**ORG\_ID**: Tu id personal de usuario

**VERCEL\_TOKEN**: Token de acceso único para Vercel

**VERCEL\_ID**: Token ID del proyecto creado previamente

Puntos extra:

- Utilizar styled components o emotion
- Uso de Storybook para el testing de UI (Únicamente el renderizado de los componentes para utilizarlos con react testing library/jest)
- Responsiveness
- Implementar sistema de caché local para las peticiones
- Lanzar automáticamente testing a través de Github actions. Deberás crear tu propio archivo yml que lance automáticamente el testing siguiendo los scripts del package.json

Dispones de 3 horas para realizar la parte básica del ejercicio desde que recibas esta prueba. Por cada punto extra que quieras abordar, dispones de una hora adicional.
