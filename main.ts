import { McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// 1. crear el servidor 
// es la interfaz principal con el protocolo MCP. MANEJA LA CONMUNICACION ENTRE EL CLIENTE Y EL SERVIDOR 


const server = new McpServer( {
    name: "Demo",
    version: "1.0.0"
})


// 2. herramientas 
server.tool(
    'fetch-wather',
    'Tool to fetch the weather of city ',
    {
        
    }
)