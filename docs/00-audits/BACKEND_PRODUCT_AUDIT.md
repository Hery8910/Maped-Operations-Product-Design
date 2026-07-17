# Havenova — auditoría de producto del backend

**Fecha de lectura:** 2026-07-10  
**Alcance:** estado observable en `src/`, rutas montadas, modelos, servicios, validaciones y pruebas del repositorio. No se ha modificado código de aplicación.  
**Convención de certeza:** **IMPLEMENTADO** significa expuesto y conectado por ruta; **PARCIAL** significa que existe una parte utilizable pero faltan piezas de ciclo; **PREPARADO** significa que existen modelos o contratos sin flujo expuesto; **INFERIDO** es una lectura prudente del propósito, no un requisito confirmado.

## 1. Resumen funcional

El backend soporta una plataforma multi-tenant: cada `Client` representa una empresa/tenant configurable, con marca, dominios, operación semanal, plan comercial, módulos y funcionalidades habilitadas. El producto operativo principal hoy es **Home Services**: usuarios finales pueden crear solicitudes de servicios domésticos y el personal administrativo del tenant puede consultar, filtrar y avanzar esas solicitudes por una máquina de estados.

También contiene un segundo módulo funcionalmente independiente de **eventos e invitaciones**: una pareja/administrador crea y administra un evento y sus invitaciones; los invitados resuelven y responden mediante un token público. No hay una relación técnica observada entre este módulo y una solicitud de Home Services; comparten tenant, identidad, seguridad y plataforma.

Los actores reales son:

- **visitante público:** consulta bootstrap del tenant, envía contacto, usa recuperación/verificación de cuenta, resuelve/acepta invitaciones de usuario y responde invitaciones de evento;
- **cuenta global (`Auth`):** credenciales únicas por email, verificación y estado global;
- **miembro de tenant (`UserClient`):** la identidad efectiva dentro de una empresa, con un único rol por combinación `authId + clientId`;
- **usuario (`user`):** mantiene su perfil, crea y consulta sus propias solicitudes y recibe notificaciones;
- **worker:** tiene complemento operativo y puede administrar su propio registro; algunas rutas de listado/alta no exigen expresamente rol admin;
- **admin / super_admin:** administra datos de Home Services, solicitudes, directorio de usuarios e identidad complementaria; `super_admin` además gestiona tenants globalmente;
- **administrador de evento:** es un `admin` del tenant propietario del evento.

Capacidades activas principales:

- alta, verificación, acceso, recuperación, sesiones con cookies y CSRF;
- configuración/lectura de tenant y feature gating por módulo;
- perfiles, solicitudes de servicio, contacto y notificaciones del usuario;
- administración de administradores, workers, compañías, edificios, gestores de inmuebles, catálogo global de tareas y directorio/invitaciones de usuarios;
- evento, invitaciones de evento y RSVP público;
- retención/anonimización de algunos datos personales.

## 2. Mapa conceptual de entidades y lifecycle

```text
Client (tenant)
├── Auth ──1:N── UserClient (una pertenencia/rol por tenant)
│                 ├── Profile (0..1)
│                 ├── Admin / Worker (0..1, según rol; complementos)
│                 ├── ServiceRequest (0..N, usuario solicitante)
│                 ├── Notification (0..N, destinatario)
│                 └── TenantUserInvitation / DirectoryEntry (gestión de personas)
├── ContactMessage (0..N; público o vinculado a UserClient)
├── Home-service operations
│   ├── PropertyManager ──1:N── Building/Object
│   ├── Company
│   ├── Requirement [PREPARADO] ──> Building + Company
│   ├── WeeklyPlan [PREPARADO] ──> Building + Task Catalog
│   └── WorkOrder [PREPARADO] ──> Building + Company + Worker + Requirement
└── Event ──1:N── EventInvitation (token público y RSVP)
```

### Tenant (`Client`)

Representa a la empresa que opera la plataforma. Lo crea un `super_admin`; un admin local consulta una vista de dashboard y el público puede resolverlo por `tenantKey` para bootstrap. Contiene identidad pública, branding, dominios, horario/availability message, módulos y features, facturación, legales, estado de onboarding y estado de plataforma.

- Estados de plataforma: `active`, `trial`, `inactive`, `suspended`, `archived`; facturación: `active`, `paused`, `cancelled`; onboarding: `pending`, `in_progress`, `completed`.
- El `tenantKey` y el dominio primario son únicos. `protectClient` exige que el tenant solicitado coincida con la sesión, salvo `super_admin`, y corta acceso si un módulo o feature está deshabilitado.
- El `PATCH /api/clients/admin/:clientId` es exclusivo de `super_admin`; permite bloques de configuración, pero prohíbe cambiar ownership y el `tenantKey` por esa ruta.
- **INFERIDO:** el tenant es una unidad comercial configurable que puede vender módulos, no sólo una partición técnica, porque almacena billing, onboarding y feature flags.

### Identidad: `Auth` y `UserClient`

`Auth` es la cuenta global: email único, hash de contraseña, `isVerified`, estado `active | invited | blocked`, versionado de refresh y datos temporales de cambio de email. `UserClient` es la pertenencia de esa cuenta a un tenant: rol `user | worker | admin | super_admin`, estado `active | inactive | invited | blocked`, aceptación de términos, consentimiento de cookies e información de invitación.

- Los crea registro, invitación o bootstrap administrativo. `Auth` no equivale por sí solo a tener acceso al producto.
- La unicidad `authId + clientId` implementa una regla monorole: una persona no puede tener dos memberships/roles distintos dentro del mismo tenant.
- `Auth.blocked` bloquea globalmente; `UserClient.blocked` bloquea solamente el acceso a ese tenant. `inactive` existe en el modelo pero el middleware `protect` no lo rechaza explícitamente.
- La sesión representa `authId + userClientId + clientId`; `tokenVersion` invalida refresh tokens previos.

### Complementos de persona: `Profile`, `Admin` y `Worker`

`Profile` es el perfil privado del usuario final (nombre, teléfono, idioma, direcciones/datos de preferencia según esquema). Sólo el titular autenticado lo crea, lee, modifica y elimina. Tener perfil es precondición para crear una solicitud.

`Admin` y `Worker` son complementos operativos ligados a `userClientId + clientId`, no roles adicionales: contienen datos de presentación/preferencias y, en admin, roles internos del complemento. Sus altas pueden crear o reutilizar la identidad/invitación correspondiente. El borrado de un complemento elimina la pertenencia del tenant y desencadena tratamiento de datos relacionados; no es una simple limpieza visual.

### `ServiceRequest`

Es una petición concreta de un usuario a un tenant. La crea el propio usuario con perfil existente; los admins la consultan y cambian su estado. Conserva snapshots inmutables de cliente (nombre/email/teléfono), configuración/versionado de intake, tipo de servicio, dirección, franja de visita, detalles y hasta cinco adjuntos.

- Tipos activos: `cleaning`, `painting`, `repairs_installations`, `furniture_assembly`, `kitchen_assembly`, `moving_help`.
- Se crea en `submitted`; la identidad, el tipo, la dirección, la franja, el intake y adjuntos son inmutables tras creación. Sólo se expone cambio de estado.
- Al anonimizarse se conservan el registro y estado, pero se sustituyen PII, dirección y texto descriptivo, se quitan adjuntos y se marca `anonymizedAt`.
- Efectos: proyecta directorio de usuarios, crea notificación al solicitante y trata de enviar email de recepción. Los dos últimos fallos no revierten la solicitud.

### `TenantUserInvitation` y `TenantUserDirectoryEntry`

La invitación V2 es una entidad persistida, separada de la cuenta, para invitar a un **usuario** al tenant. Guarda email normalizado, nombre/teléfono/idioma, hash de token opaco, vencimiento, contador/envíos, emisor y aceptación. El token nunca se persiste en claro.

- Ciclo externo: `pending → accepted` o `pending → revoked`; `accepting` es un lease interno de hasta cinco minutos para serializar la aceptación, no un estado que deba mostrarse.
- Dura 24 horas; reenvío rota token, prolonga vencimiento y aumenta `sendCount`. Una invitación pendiente vigente por email/tenant impide otra.
- Aceptar activa `Auth` + `UserClient`, verifica email y crea/actualiza Profile desde los datos de invitación. Hay transacción Mongo y fallback con lease si el despliegue no soporta transacciones.
- `TenantUserDirectoryEntry` es una proyección materializada para dashboard: combina persona/invitación con métricas de solicitudes, actividad, próxima visita y estado. Es derivada, no fuente de verdad; se actualiza en invitación, perfil y solicitud.

### Mensajes, notificaciones y comunicaciones

`ContactMessage` registra una consulta a la empresa. Puede ser anónima/pública o quedar asociada al `UserClient` autenticado. Mantiene remitente, asunto/cuerpo, origen y una respuesta administrativa. Los admins listan, responden y eliminan; la respuesta intenta enviar email y, si el origen tenía usuario, crea una notificación. Los fallos de entrega se devuelven como warnings, no revierten la respuesta.

`Notification` es una bandeja personal tenant-scoped, con categoría, prioridad, contenido traducible por códigos/parámetros, actor, entidad, acción navegable, `seenAt`, `readAt` y expiración opcional. No existe endpoint público para crear notificaciones arbitrarias: los dominios las producen internamente.

### Operación inmobiliaria

`PropertyManager` representa un administrador/gestor de inmuebles; admin crea, busca, lista y actualiza. Tiene estado `active | inactive`, contacto y conteo agregado de edificios.

`Building` (implementado como `HomeServiceObject`) representa un inmueble: dirección, número interno, gestor obligatorio, características y datos operativos de limpieza/acceso. Admin puede crear, listar, ver y modificar; se evitan duplicados por dirección completa y por número de objeto dentro del tenant.

`Company` representa una empresa ejecutora subcontratada. Tiene estados `active | inactive | pending`, pero sólo tiene ruta de creación: no hay consulta, actualización, asignación ni baja expuestas.

`Requirement`, `ObjectWeeklyPlan` y `WorkOrder` tienen modelos con relaciones y estados, pero sus routers no exponen operaciones. Por tanto son **PREPARADOS**, no un flujo funcional: no hay generación, scheduling, asignación ni ejecución observables desde API.

`GlobalTaskCatalog` sí es administrable. Es un catálogo por tenant, con a lo sumo un catálogo activo, bundles, pasos, recurrencia y contadores derivados. Permite seed/restore de contenido de sistema y operaciones de alta, edición, desactivación lógica de bundles y pasos.

### Eventos e invitaciones de evento

`Event` pertenece al tenant y tiene propietario `userClientId`; el admin propietario puede crear, obtener el actual y actualizarlo. `EventInvitation` pertenece a un evento y ofrece CRUD privado y resolución/RSVP público mediante token. Las invitaciones llevan datos de grupo/invitado y respuesta; el backend calcula un summary agregado de invitaciones. Esta familia no usa la entidad `TenantUserInvitation`.

## 3. Actores y permisos reales

| Actor | Acceso implementado | Límites / observaciones |
|---|---|---|
| Público | tenant bootstrap, auth pública, contacto, resolver/aceptar invitación de usuario, resolver/responder invitación de evento | rate limits en auth e invitaciones públicas; no acceso a datos de tenant salvo payload público mínimo |
| Usuario | su perfil, crear solicitud, listar sólo `/service-request/mine`, notificaciones propias | no puede leer solicitud individual por id ni modificar/cancelar solicitud; crear requiere Profile |
| Worker | complemento propio, y rutas worker de listado/alta/reenvío/edición/borrado | **parcial/inconsistente:** varias rutas no aplican middleware `worker` ni `admin`; `protectClient` sólo verifica tenant+feature |
| Admin | CRUD operativo de complementos, solicitudes, edificios, gestores, catálogo, usuarios/invitaciones, datos de dashboard y eventos propios | siempre limitado a su tenant por `protectClient`; el ownership de evento añade límite por `userClientId` |
| Super admin | todo lo que admite `admin` y creación/lectura/edición global de tenants | `protectClient` permite solicitar otro tenant, pero el middleware de rol continúa aplicándose |

**Autorización parcial observada:** las rutas state-changing de Home Services no montan `csrfProtect`, aunque auth y eventos sí lo usan en rutas sensibles/state-changing. No es una intención de producto confirmable; es una diferencia de frontera de seguridad a considerar.

## 4. Flujos de negocio

### Registro, verificación y acceso

**ENTRY:** registro con email, contraseña, tenant, aceptación literal de términos y opcionalmente consentimiento de cookies.  
**STEPS:** crea `Auth` y `UserClient`, o vincula Auth existente al tenant sólo tras comprobar contraseña; envía verificación.  
**VALIDATIONS:** tenant existe; cuenta/membership no bloqueadas; términos aceptados; email global único; cuenta ya verificada en ese tenant da conflicto.  
**STATE CHANGES:** nueva cuenta queda no verificada; verificar token marca identidad y produce magic token; magic login crea sesión.  
**SIDE EFFECTS:** email de verificación; el email depende de un origen de frontend válido.  
**ERROR CONDITIONS:** bloqueos, relación inexistente/bloqueada, password incorrecta para vincular, token inválido/expirado, rate limit.  
**FINAL RESULT:** login/magic login establecen cookies de acceso/refresh y header CSRF; `verify-email` por sí solo no crea sesión.

### Recuperación, cambio de contraseña y email

**ENTRY:** forgot-password, reset con token, cambio autenticado de email, confirmación de cambio, actualización autenticada de contraseña.  
**STEPS:** forgot/resend responden de forma deliberadamente ambigua; reset valida token y contraseña; email change envía verificación al nuevo correo.  
**STATE CHANGES:** reset verifica/reactiva Auth y UserClient sólo si no estaban bloqueados; la actualización de contraseña no invalida automáticamente todas las sesiones.  
**SIDE EFFECTS:** emails transaccionales.  
**FINAL RESULT:** acceso recuperable sin revelar existencia de cuenta en los flujos ambiguos.

### Sesión, renovación y salida

**ENTRY:** login o magic login; posterior refresh/logout.  
**STEPS:** acceso dura 15 minutos; refresh requiere cookie refresh y header CSRF; si frontend perdió CSRF, `GET /auth/csrf` lo reemite antes de refresh.  
**STATE CHANGES:** refresh rota refresh token; logout limpia sesión actual; logout-all incrementa `tokenVersion`.  
**SIDE EFFECTS:** emite CSRF en login, magic-login, `/me` y refresh.  
**FINAL RESULT:** sesiones de usuario duran hasta 30 días por refresh; admin/worker hasta 16 horas por refresh.

### Invitación V2 de usuario de tenant

**ENTRY:** admin invita desde `/dashboard/users/invite`.  
**STEPS:** crea/reutiliza identidad invitada y membership `user`, persiste invitación/token hash y envía email; público resuelve token para preview y lo acepta con contraseña.  
**VALIDATIONS:** no Auth/UserClient bloqueados; no usuario activo/inactivo existente; no pending vigente por mismo email/tenant; token válido/no vencido.  
**STATE CHANGES:** `pending → accepting → accepted` internamente; Auth/UserClient pasan a `active`, email a verificado, profile se crea/actualiza. Revoke finaliza `pending` sin activar.  
**SIDE EFFECTS:** reenvío rota token; actualización de directorio.  
**FINAL RESULT:** nuevo usuario ya activo dentro del tenant, sin sesión creada automáticamente por aceptación.

### Solicitud de servicio

**ENTRY:** usuario autenticado con feature `serviceRequests` y Profile.  
**STEPS:** envía tipo, detalle específico, dirección, franja y opcionales adjuntos; backend crea snapshot de perfil/auth.  
**VALIDATIONS:** todos los datos de intake tipados; máximo cinco adjuntos, 3 MiB cada uno; no hay validación observable de que `end > start` ni disponibilidad/solapamiento.  
**STATE CHANGES:** nace `submitted`; sólo admin puede avanzar/cancelar por transiciones fijas.  
**SIDE EFFECTS:** notificación de creación, email de acuse, auditoría y refresh de directorio.  
**FINAL RESULT:** el usuario puede verla en su historial; admin la gestiona desde lista/detalle.

### Contacto y respuesta

**ENTRY:** formulario público o autenticado.  
**STEPS:** se persiste mensaje; admin lo lista/filtra, responde y puede eliminar uno o varios.  
**SIDE EFFECTS:** al crear, email de recepción y notificación administrativa; al responder, email al remitente y notificación al usuario si hay `source.userClientId`.  
**FAILURE BEHAVIOR:** comunicación fallida no deshace persistencia; el resultado devuelve warnings.  
**FINAL RESULT:** conversación de un solo intercambio de respuesta, no un hilo bidireccional modelado.

### Evento e invitación pública

**ENTRY:** admin crea/actualiza su evento e invitaciones; invitado recibe/usa token público.  
**STEPS:** propietario obtiene evento actual, crea/lista/edita/borra invitaciones y consulta resumen; público resuelve token y envía RSVP.  
**VALIDATIONS:** acceso privado requiere admin y ownership del evento; endpoints públicos tienen limiter.  
**FINAL RESULT:** invitación conserva respuesta de asistencia y el summary agrega el estado del evento. No se observó envío de email desde este módulo.

## 5. Estados y máquinas de estado

| Dominio | Estados y transiciones implementadas | Ejecuta | Terminales / notas |
|---|---|---|---|
| ServiceRequest | `submitted → under_review/cancelled → visit_scheduled/cancelled → visit_completed/cancelled → converted_to_work_order`; mismo estado es idempotente | admin | `converted_to_work_order`, `cancelled`; no crea WorkOrder automáticamente |
| Auth | `invited/active/blocked`; reset/invitación aceptada activan salvo bloqueado | auth público o invitación; bloqueo no expuesto aquí | no hay ruta de desbloqueo observada |
| UserClient | `invited → active`; `inactive`, `blocked` existen | aceptación/reset; gestión interna | `inactive` no se trata como no-accesible por `protect` |
| TenantUserInvitation | `pending → accepting → accepted`; `pending → revoked`; lease accepting recuperable | admin/public acceptance | `accepted`, `revoked`; expiración se valida pero no cambia un campo a `expired` |
| Profile | existente / eliminado | titular | borrado destructivo del complemento + anonimización relacionada |
| ContactMessage | sin estado formal; `response` ausente/presente y `anonymizedAt` | admin / proceso de borrado | cleanup elimina físicamente por retención |
| Notification | unseen/unread → seen/read; read-all | destinatario | no hay estado terminal; cleanup borra por expiración/edad |
| Company / building / manager / requirement | active/inactive/pending según entidad | admin donde hay ruta | no hay máquina de transición formal |
| WorkOrder | `open`, `assigned`, `in-progress`, `completed`, `cancelled` | nadie por API actual | **PREPARADO** |

## 6. Reglas de negocio relevantes

| Tipo | Regla observada |
|---|---|
| **EXPLICIT RULE** | La identidad de acceso es membership tenant-scoped; `Auth.email` es globalmente único y `UserClient(authId, clientId)` es único. |
| **EXPLICIT RULE** | Un usuario debe tener Profile antes de crear una solicitud. |
| **EXPLICIT RULE** | Solicitud inmutable excepto estado; sus transiciones están codificadas y sólo admin las ejecuta. |
| **EXPLICIT RULE** | Una invitación de usuario es opaca, single-use, de 24 h, con una pending vigente por email/tenant; resend rota token. |
| **EXPLICIT RULE** | Un tenant no puede tener más de un catálogo global activo; bundles/pasos se desactivan en vez de borrarse. |
| **EXPLICIT RULE** | Contact messages se retienen 365 días por defecto; notifications 30 días, salvo `expiresAt` anterior. |
| **OBSERVED BEHAVIOR** | Registro de Auth existente en otro tenant exige contraseña correcta antes de crear membership; evita que conocer un email conceda acceso a otro tenant. |
| **OBSERVED BEHAVIOR** | Forgot-password y resend-verification no revelan si la cuenta/relación existe, está bloqueada o ya verificada. |
| **OBSERVED BEHAVIOR** | La creación de solicitud no falla si no puede entregar email/notificación; se registra advertencia. |
| **OBSERVED BEHAVIOR** | El buscador admin de solicitudes busca dirección, no nombre/email del cliente. |
| **INFERENCE** | Los snapshots de solicitud priorizan conservar evidencia histórica frente a reflejar cambios posteriores de perfil. |
| **INFERENCE** | La proyección DirectoryEntry existe para un dashboard de personas de lectura rápida, no como entidad de negocio primaria. |

## 7. Comunicaciones del sistema

| Trigger | Destinatario / propósito | Persistencia y fallo |
|---|---|---|
| Registro, login no verificado, resend | email de verificación | email no persistido como entidad; requiere origen frontend; fallo puede impedir el flujo que lo invoca |
| Forgot password | email de reset | respuesta externa ambigua; no revela cuenta |
| Cambio de email | correo nuevo para confirmación | token temporal; requiere origen frontend |
| Invitación admin/worker/usuario | email de incorporación | admin/worker conservan flujo propio; tenant user V2 persiste la invitación y hash, no token claro |
| Crear ServiceRequest | solicitante: acuse | request persiste aunque falle email; notification interna también best-effort |
| Crear ContactMessage | empresa/admin: aviso y remitente: acuse | mensaje persiste; creación de notification/email es best-effort |
| Responder ContactMessage | remitente y, si aplica, usuario autenticado | respuesta persiste; warnings si fallan email o notification |
| Cambio de estado de request | notification de usuario para tipos soportados (`under_review`, `visit_scheduled`, `cancelled`) | implementación utiliza factory; no hay garantía de email de transición |

No hay outbox, reintentos persistidos ni garantía de entrega observables. La auditoría técnica registra fallos, pero no crea una cola de comunicaciones.

## 8. API entendida como producto

| Dominio | Qué permite hacer | Datos preparados |
|---|---|---|
| Auth | registrar, verificar, magic login, recuperar/resetear/cambiar password/email, sesión y CSRF, resolver invitación admin | errores de dominio precisos, rate limits, sesión y rol efectivos |
| Tenant | bootstrap público por key; dashboard/admin config | vistas sanitizadas según consumidor; módulos/features/legales/operación |
| Perfil | gestionar “mi perfil” y borrar identidad local | datos de perfil; no es directorio admin |
| Service requests | crear, historial propio, listado y detalle admin, transición | offset pagination (1..100), filtros status/tipo/customerType, búsqueda por dirección |
| Personas dashboard | summary, directory cursorizado, detalle de entry, invitar/re-enviar/revocar | proyección con contadores de requests, actividad, próxima visita; no busca directamente colecciones fuente |
| Workers/admins | alta/lista/propio/detalle/edición/borrado/reenvío | directorios básicos; permisos desiguales por ruta |
| Operación inmueble | gestores: CRUD/list/lookup; edificios: CRUD/list | paginación/filtros y building count para gestores |
| Catálogo | catálogo activo, bundle detalle, seed/restore y edición de bundles/pasos | conteos calculados, filtrado/paginación de bundles en memoria |
| Contacto | crear, listar, responder, borrar individual/masivo | filtros/paginación; respuesta y warnings de comunicación |
| Notificaciones | feed, bell, unread count, seen/read/read all | prioridad, unread, filtros por entidad, orden por prioridad o fecha |
| Eventos | current event, edición, invitaciones privadas y RSVP pública | summary agregado de invitaciones |

No se puede afirmar desde este repositorio qué calcula el frontend. Sí puede afirmarse que backend ya entrega: pagination/meta en listados clásicos, una proyección materializada para personas, conteos de gestores, summary de invitaciones de evento, bell con prioridades/totales unread y serialización de solicitudes. En cambio, no existe endpoint de dashboard global de Home Services, calendario operativo, métricas de solicitudes ni agregación de work orders.

## 9. Soporte real para dashboard y operación

Existe soporte concreto para:

- bootstrap/configuración del tenant y feature gating;
- directorio de users/invitaciones con cursor, búsqueda por prefijo, filtros y relación resumida con solicitudes;
- usuarios admins/workers y sus complementos;
- listado administrativo de solicitudes con filtros y paginación offset;
- edificios, gestores y lookup; catálogo de tareas; notifications bell/feed;
- conteos aislados: unread, high-priority unread, building count por gestor, totals del catálogo, summary de invitaciones de evento.

Falta, aunque los modelos sugieran una futura operación: resumen consolidado de negocio, cola/calendario de trabajo, asignación de workers, disponibilidad/vacaciones, generación de work orders, reporting o métricas temporales de solicitudes.

## 10. Decisiones de producto materializadas

- **Invitaciones separadas de usuarios:** la invitación V2 persiste lifecycle, expiración y envío de modo independiente de Auth/UserClient; permite invitar antes de que exista contraseña/perfil.
- **Identidad global + acceso local:** un email puede reutilizarse entre tenants, pero la autorización y rol se resuelven en `UserClient`.
- **Snapshot de customer/request:** la solicitud no depende de datos actuales del perfil para conservar quién y qué se pidió en ese momento.
- **Proyección de personas:** dashboard no debe componer toda la información client-side; recibe una entrada derivada y materializada.
- **Configuración comercial del tenant:** los módulos/features pueden hacer inaccesible una familia funcional aunque el rol sea válido.
- **Operación basada en estados:** solicitud y invitación V2 tienen guardas explícitas; otros modelos de operación aún sólo definen enums.
- **Privacidad progresiva:** borrar Profile/Worker/Admin anonimiza ciertas dependencias y borra notifications; no equivale a borrar toda actividad histórica.

## 11. Estado real de implementación

| Área | Estado | Evidencia funcional |
|---|---|---|
| Auth/sesiones/CSRF | **IMPLEMENTED** | rutas, servicios y suite de pruebas extensa |
| Tenant y configuración | **IMPLEMENTED** | bootstrap, vista admin/dashboard y gating |
| Perfil / solicitudes | **IMPLEMENTED** | CRUD propio + intake y máquina de estado admin |
| Contacto / notifications | **IMPLEMENTED** | rutas, flows, retention y scheduler opcional |
| Admin/worker complementos | **IMPLEMENTED con autorización parcial** | rutas y lifecycle existen; algunas rutas worker no exigen rol específico |
| Tenant Users V2 | **IMPLEMENTED** | invitación persistida, aceptación transaccional/fallback y directory projection |
| Gestores y edificios | **IMPLEMENTED** | CRUD/listados admin |
| Company | **PARTIAL** | modelo y creación, sin lectura/edición/borrado/asignación |
| Global task catalog | **IMPLEMENTED** | catálogo y edición de bundles/pasos; seed/restore expuestos a admin |
| Requirement / weekly plan / work order | **PREPARADO** | modelos e índices, routers explícitamente vacíos |
| Eventos / RSVP | **IMPLEMENTED** | rutas privadas y públicas, ownership y limiter |
| Scheduling de retención | **PARTIAL** | runner se activa sólo con `SCHEDULER_ENABLED=true`, in-process y sin lock distribuido |

No se hallaron mocks de aplicación montados como rutas. Los `TODO` funcionales más claros son los routers vacíos de requirement, annual plan y work order. Hay documentos históricos de auditoría/migración: sirven de contexto, no son prueba de que el flujo esté activo.

## 12. Datos técnicos con efecto de producto/UX

- **Sesión:** access token 15 min; refresh 30 días para user y 16 h para worker/admin/super_admin. Logout-all invalida refresh previos por versión.
- **CSRF:** contrato header `x-csrf-token`, no cookie legible por frontend. Es relevante para recuperación de sesión y mutaciones de auth/eventos; no está aplicado de forma uniforme a Home Services.
- **Rate limits:** endpoints públicos sensibles de auth, invitación tenant y RSVP evento limitan por IP; login/registro y acciones sensibles usan 5 intentos/15 min, refresh 30/15 min.
- **Paginación:** requests/contacto/gestores/notificaciones usan offset y límites validados; directorio de personas usa cursor, mejor adaptado a listados mutables. Catálogo pagina bundles después de cargarlos en memoria.
- **Adjuntos de solicitud:** máximo 5, máximo 3 MiB por metadato, URL externa aceptada; no se observa flujo de upload/escaneo asociado en este dominio.
- **Idiomas:** de/en/es en perfiles e invitación V2; parte de operación legacy usa de/en. La elección de idioma alimenta emails de dominio.
- **Fechas:** franjas y planificación se almacenan como `Date`; weekly plan usa año ISO. No se observó una política explícita de timezone por tenant.
- **Retención:** contact 365d y notifications 30d por defecto; la ejecución automática depende de una instancia con scheduler habilitado. Sin locking distribuido, varias instancias pueden ejecutar el mismo cleanup.

## 13. Ownership, cascadas y datos derivados

- `Client` es dueño de todos los datos tenant-scoped; la mayor parte de consultas filtra `clientId`.
- `Auth` es dueño de credenciales globales; `UserClient` es dueño del acceso/rol/consentimiento contextual. La relación es 1:N desde Auth a tenants y 1:1 por Auth+tenant.
- Profile, Admin y Worker dependen 1:1 de UserClient+tenant en su familia. El borrado del complemento elimina la membership y trata dependencias, pero no borra necesariamente Auth global.
- ServiceRequest pertenece al usuario/tenant; contiene snapshots duplicados intencionales de PII. La anonimización cambia esos snapshots y detalles, no borra la solicitud.
- DirectoryEntry es una proyección derivada de Auth, UserClient, Profile, Invitation y ServiceRequest. Puede quedar desfasada si alguna escritura no llama al proyector o falla tras la escritura fuente.
- ContactMessage puede tener ownership público o `source.userClientId`; se anonimiza por esa fuente. Notifications pertenecen a un único recipient UserClient y se borran al eliminar dicho perfil/complemento.
- Building pertenece a tenant y a un PropertyManager; Requirement/WeeklyPlan/WorkOrder sólo expresan relaciones referenciales, sin cascadas o flujos API implementados.

## 14. Riesgos de producto detectados

1. **Planificación representada pero no operable.** Requirement, annual plan y work order tienen modelos/README conceptual, pero sus routers contienen sólo “Routes will be added”. Una UI podría interpretarlos como capacidades activas sin que exista API funcional.
2. **“Converted to work order” no crea orden.** La máquina de `ServiceRequest` permite el estado terminal `converted_to_work_order`, pero no hay servicio que cree/linkee un WorkOrder. El nombre afirma un efecto que el backend no materializa.
3. **Permisos worker ambiguos.** `GET /worker/list`, `POST /worker`, resend, patch y delete no añaden middleware `admin`/`worker`; su protección efectiva es sesión+tenant+feature. Esto puede habilitar gestión de trabajadores a un `user` autenticado del mismo tenant si la feature está activa.
4. **CSRF desigual entre mutaciones.** Auth y eventos aplican `csrfProtect` en acciones relevantes, mientras que routes Home Services state-changing no lo montan. Es un riesgo de seguridad que afecta la confianza del producto, no una deducción de UX.
5. **`inactive` no tiene semántica de acceso cerrada.** El modelo de membership introduce `inactive`, pero `protect` rechaza sólo `blocked`; falta evidencia de una experiencia funcional distinta para el usuario inactivo.
6. **Comunicación best-effort sin reintentos.** Solicitud/contacto se persisten aun si falla email/notification; no hay outbox ni retry persistido. La UI no puede interpretar que “email enviado” sea garantía de entrega.
7. **La proyección de directorio es consistencia eventual manual.** La actualización está invocada por flujos conocidos, no por mecanismo de eventos/transacciones global. Puede mostrar métricas antiguas tras fallos parciales o escrituras futuras no integradas.
8. **Acceso admin a detalle de solicitud no excluye `anonymizedAt`.** Las listas y get no filtran explícitamente solicitudes anonimizadas; la información se sanea, pero seguirá apareciendo como historial. Es una decisión posible, no documentada como UX.
9. **Conflicto conceptual entre `Company` y `Worker`.** Company usa `ownerId` con referencia legacy `UserClientWorker`; Worker pertenece a tenant, pero no hay flujos de asociación, consulta o asignación. No se puede confirmar el modelo de proveedor ejecutor.
10. **Scheduler sólo in-process.** En despliegue multiinstancia puede ejecutar cleanup repetido; en despliegue sin flag no ejecuta retención automática. La retención prometida depende de operación de infraestructura.

## 15. PRODUCT QUESTIONS TO RESOLVE

1. ¿Qué acción de negocio real convierte una `ServiceRequest` en `WorkOrder`, quién la ejecuta y qué campos/relaciones debe crear? Actualmente sólo existe el estado.
2. ¿Debe `UserClient.status = inactive` impedir login/acceso, reducir capacidades o ser sólo una etiqueta administrativa? El middleware no lo diferencia de active.
3. ¿Qué roles pueden crear, editar, reenviar y borrar workers? La documentación de producto y los middlewares efectivos no expresan la misma restricción fina.
4. ¿`Company` es el proveedor ejecutor definitivo, una organización de workers o un concepto legacy? No hay flujo que lo conecte a workers/buildings/work orders por API.
5. ¿Cómo debe resolverse disponibilidad, solapamiento y timezone de `preferredVisitSlot`? Hoy se acepta la franja tipada pero no hay reglas de conflicto ni calendario.
6. ¿Las notificaciones/email de cambios de solicitud deben cubrir todos los estados, y deben tener reintento/estado visible para el usuario? Sólo hay tratamiento best-effort observable.
7. ¿Cuál es la garantía deseada para el directorio de personas cuando falla una actualización de proyección? El modelo promete resumen operativo, pero no hay reconciliación automática continua observada.
8. ¿El módulo Events forma parte del mismo producto Havenova de Home Services, de una oferta multi-producto del mismo backend o de una migración temporal? Técnicamente comparte plataforma pero no dominio.

