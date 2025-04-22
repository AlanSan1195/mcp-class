import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. crear el servidor
// es la interfaz principal con el protocolo MCP. MANEJA LA CONMUNICACION ENTRE EL CLIENTE Y EL SERVIDOR
const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});



// 2. herramientas
server.tool(
  "fetch-wather",
  "Herramienta para ver el clima en tiempo real creada en visual studio por Alan sAN como ejemplo de la herramienta",
  // le tenemos que decior que parametros necesita esta herramienta para funcioar
  {
    city: z.string().describe("City name"),
  },
  // y aqui le decimos que haga lo que quermampos con la informacion  que el cliente nos manda
  async ({ city }) => {
    return {
      content: [
        {
          type: "text",
          text: `El clima de ${city} es soleado`,
        },
      ],
    };
  }
);



// 3.  escuchar las conexiones del cliente 
// creamos el trnasporete en nuestra maquina, no se tiene que conectar a interrnet ni nada 
const transporte = new StdioServerTransport();
await server.connect(transporte);