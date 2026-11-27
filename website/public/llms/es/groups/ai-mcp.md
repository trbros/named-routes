# Agentes de IA y MCP

# Agentes de IA y MCP

Topic: `ai-agents` · Named Routes v2.2.0

Usa llms.txt como índice y llms-full.txt como referencia versionada. Consulta el manifiesto generado y la configuración real del framework antes de escribir código. Hay ejemplos con y sin base path.

El servidor MCP stdio de solo lectura está incluido en @triooo/named-routes. Ejecuta pnpm exec named-routes mcp o pnpm exec named-routes-mcp; añade --root <proyecto> y opcionalmente --manifest <archivo-relativo> para consultar rutas. Sin root solo está disponible la documentación. Las dependencias opcionales se instalan por defecto; habilítalas si se omitieron. No ejecuta código de la aplicación ni modifica archivos.

Usa pnpm run docs, pnpm run test:mcp y pnpm run test:package antes de publicar el paquete principal. Consulta mcp/README.md para clientes de IA e Inspector. La versión del catálogo coincide con la biblioteca, pero un manifiesto puede estar desactualizado.

Related topic IDs: overview, cli, configuration, public-url, mcp-installation, mcp-project, mcp-tools, mcp-workflow, mcp-security
---

# Instalar e iniciar MCP

Topic: `mcp-installation` · Named Routes v2.2.0

El servidor Model Context Protocol forma parte de @triooo/named-routes. Instala solo el paquete principal con las dependencias opcionales habilitadas. No necesitas otro paquete, servidor web, clave API ni cuenta.

Usa Node.js 22.12 o posterior. Ejecuta --help y --version para verificar el lanzador. El comando mcp inicia un servidor stdio que espera un cliente; no es un endpoint HTTP. Ejecuta los comandos por separado.

Los comandos npm y pnpm son alternativas. Usa el gestor de tu proyecto. Tras la publicación, npx puede ejecutar el paquete sin añadirlo al proyecto; fija una versión con MCP para reproducibilidad.

```sh
pnpm add @triooo/named-routes
# or: npm install @triooo/named-routes

pnpm exec named-routes mcp --help
pnpm exec named-routes-mcp --version

# Start the server (alternative commands):
pnpm exec named-routes mcp
npm exec --package=@triooo/named-routes -- named-routes mcp
npx -y @triooo/named-routes mcp
```

Related topic IDs: mcp-project, mcp-claude, mcp-troubleshooting
---

# Conectar un proyecto local

Topic: `mcp-project` · Named Routes v2.2.0

Sin --root, el servidor solo ofrece documentación. Para inspeccionar rutas, configura explícitamente un directorio de confianza. El servidor no ejecuta el framework para descubrir rutas. Genera primero el módulo en el consumidor con su integración o CLI.

Usa --manifest para salidas personalizadas o varios módulos generados. Su valor es relativo a --root. Salidas habituales: src/routes.generated.ts, app/routes.generated.ts y src/lib/routes.generated.ts. En monorepos, usa el directorio de la aplicación.

El archivo debe ser un manifiesto TS/JS estático reconocido dentro de la raíz de confianza, menor de 2 MiB. El inventario no verifica vigencia, métodos HTTP, autorización, assets, defaults ni páginas desplegadas.

```sh
pnpm exec named-routes generate
# In the MCP client, choose one invocation:
pnpm exec named-routes mcp --root "C:/dev/my-app"
pnpm exec named-routes-mcp --root "C:/dev/my-app" --manifest "src/routes.generated.ts"
```

Related topic IDs: mcp-installation, mcp-tools, mcp-workflow, mcp-troubleshooting
---

# Claude Desktop y Claude Code

Topic: `mcp-claude` · Named Routes v2.2.0

En Claude Desktop, añade el servidor bajo mcpServers en la configuración MCP local (ajustes de desarrollador). Combina la entrada con el JSON existente sin sustituir otros servidores. Reinicia el cliente y revisa las herramientas.

En Claude Code, usa la configuración MCP o claude mcp add --transport stdio named-routes -- npx -y @triooo/named-routes mcp --root C:/dev/my-app. Verifica con claude mcp list. Fija la versión si es necesario. En Windows, el lanzador Node absoluto de la guía evita problemas de shims.

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
---

# Configuración de Cursor

Topic: `mcp-cursor` · Named Routes v2.2.0

Añade la entrada a .cursor/mcp.json del proyecto (o configuración MCP global equivalente). Combina las entradas existentes de mcpServers. Autoriza el servidor solo para un proyecto de confianza.

El ejemplo supone que la versión con MCP está disponible en npm. Para un checkout local o un shim roto en Windows, usa el lanzador directo de Node.

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
---

# Configuración de Codex

Topic: `mcp-codex` · Named Routes v2.2.0

Añade una tabla de servidor a ~/.codex/config.toml o usa los comandos de gestión MCP. Sustituye el directorio de ejemplo por el proyecto propietario del módulo generado.

Para un paquete instalado localmente, también puedes usar command = "node" y args con la ruta absoluta a bin/named-routes-mcp.js. Reinicia la sesión si es necesario y verifica codex mcp list.

```toml
[mcp_servers.named_routes]
command = "npx"
args = ["-y", "@triooo/named-routes", "mcp", "--root", "C:/dev/my-app"]
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
---

# VS Code / GitHub Copilot

Topic: `mcp-vscode` · Named Routes v2.2.0

Crea o combina .vscode/mcp.json en el espacio de confianza. VS Code usa servers y type stdio en lugar de mcpServers. Inicia el servidor desde los controles MCP del editor y comprueba sus herramientas.

```json
{
  "servers": {
    "named-routes": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
---

# Windows y lanzador Node directo

Topic: `mcp-windows` · Named Routes v2.2.0

Si npx o un shim .cmd falla con MODULE_NOT_FOUND antes de iniciar la CLI, resuelve el paquete instalado y ejecuta su bin directamente con node. Evita depender del shim del gestor.

La configuración usa barras normales en JSON y una ruta absoluta. En pnpm los enlaces de node_modules suelen resolver el paquete. Si hace falta, localiza package.json con node -p "require.resolve('@triooo/named-routes/package.json')" desde el consumidor y usa bin/named-routes-mcp.js relativo a su directorio.

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "node",
      "args": [
        "C:/dev/my-app/node_modules/@triooo/named-routes/bin/named-routes-mcp.js",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-installation, mcp-project, mcp-troubleshooting
---

# Herramientas y recursos

Topic: `mcp-tools` · Named Routes v2.2.0

Usa get_agent_contract para las convenciones versionadas; search_docs para descubrir IDs; get_topic para leer un tema completo; get_framework_guide para listar temas de un framework. Las consultas aceptan locale en, pt, es o ja.

list_routes filtra por nombre o patrón y pagina con offset y limit (1–100). get_route busca un nombre exacto. Ambos requieren --root. El recurso named-routes://agent-contract proporciona el mismo contrato.

El JSON muestra payloads individuales de tools/call, agrupados en un array solo como ilustración. Invoca cada herramienta por separado desde el cliente MCP; no es una API por lotes.

```json
[
  {
    "name": "get_agent_contract",
    "arguments": {}
  },
  {
    "name": "search_docs",
    "arguments": {
      "query": "Astro base path",
      "locale": "en",
      "limit": 5
    }
  },
  {
    "name": "get_topic",
    "arguments": {
      "id": "astro",
      "locale": "pt"
    }
  },
  {
    "name": "get_framework_guide",
    "arguments": {
      "framework": "astro",
      "locale": "en"
    }
  },
  {
    "name": "list_routes",
    "arguments": {
      "filter": "admin.alunos",
      "offset": 0,
      "limit": 20
    }
  },
  {
    "name": "get_route",
    "arguments": {
      "name": "admin.alunos.edit"
    }
  }
]
```

Related topic IDs: mcp-project, mcp-workflow, mcp-security
---

# Ejemplo: crear un enlace con rutas reales

Topic: `mcp-workflow` · Named Routes v2.2.0

Ejemplo de prompt: "Lee el contrato Named Routes y lista las rutas admin.alunos; crea un enlace Next.js para editar un alumno. No inventes nombres ni modifiques el manifiesto generado." El agente usa get_agent_contract, list_routes y get_route si hace falta.

Supón que la ruta devuelta es admin.alunos.edit con patrón /admin/alunos/[aluno]/edit. Es ilustrativa, no una ruta integrada. Si el nombre o parámetro difiere, usa el manifiesto real.

En Next.js Link, route devuelve la URL interna y Next añade su base. Para una URL pública usa route.url. Sin base, la ruta pública es /admin/alunos/42/edit; con base /app es /app/admin/alunos/42/edit. Valida con el comprobador de tipos del consumidor.

## Sin base path

Con la app en la raíz, Link interno y URL pública apuntan a la misma ruta.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
route.url("admin.alunos.edit", { params: { aluno: 42 } });
// /admin/alunos/42/edit
```

## Con base path

Con basePath: "/app" en Next, mantén Link interno. route.url incluye el prefijo para anclas y enlaces compartidos.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
// Next Link adds /app
<a href={route.url("admin.alunos.edit", { params: { aluno: 42 } })}>Edit</a>;
// /app/admin/alunos/42/edit
```

Related topic IDs: mcp-tools, mcp-project, helper-route, base-path
---

# Seguridad y alcance

Topic: `mcp-security` · Named Routes v2.2.0

El servidor es local y de solo lectura mediante stdio. Analiza manifiestos estáticos como datos sin ejecutarlos. No ejecuta shell ni configuración, no escribe archivos, no llama a endpoints HTTP ni expone un servicio remoto.

Selecciona solo espacios de confianza. El manifiesto no es un sandbox para sistemas hostiles. Los agentes y clientes pueden tener permisos independientes; las anotaciones de solo lectura de MCP no son una garantía global. No pongas credenciales en defaults generados ni prompts.

Related topic IDs: mcp-project, mcp-tools, ai-agents
---

# Inspector y solución de problemas

Topic: `mcp-troubleshooting` · Named Routes v2.2.0

Usa MCP Inspector para inspeccionar herramientas y resultados sin un modelo. Ejecuta el lanzador instalado desde el consumidor. El mantenedor puede ejecutar pnpm run test:mcp y pnpm run test:package en la raíz.

Dependencias opcionales ausentes: reinstala habilitándolas, por ejemplo npm install --include=optional. En pnpm, elimina no-optional y reinstala. Un manifiesto ausente o ambiguo requiere generación o --manifest. Comprueba --root si no hay rutas. Para MODULE_NOT_FOUND en Windows usa el lanzador Node directo.

Un servidor stdio que espera sin imprimir logs normales es correcto. El protocolo usa stdout y los diagnósticos stderr. Si la documentación difiere de la aplicación, compara la versión instalada con la del catálogo y regenera las rutas antes de reiniciar.

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

Related topic IDs: mcp-windows, mcp-installation, mcp-project, mcp-tools
