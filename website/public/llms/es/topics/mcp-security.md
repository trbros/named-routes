# Seguridad y alcance

Topic: `mcp-security` · Named Routes v2.2.0

El servidor es local y de solo lectura mediante stdio. Analiza manifiestos estáticos como datos sin ejecutarlos. No ejecuta shell ni configuración, no escribe archivos, no llama a endpoints HTTP ni expone un servicio remoto.

Selecciona solo espacios de confianza. El manifiesto no es un sandbox para sistemas hostiles. Los agentes y clientes pueden tener permisos independientes; las anotaciones de solo lectura de MCP no son una garantía global. No pongas credenciales en defaults generados ni prompts.

Related topic IDs: mcp-project, mcp-tools, ai-agents
