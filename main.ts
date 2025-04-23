import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { date, z } from "zod";

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
  //   ejemplo 1
  // y aqui le decimos que haga lo que quermampos con la informacion  que el cliente nos manda
  //   async ({ city }) => {
  //     return {
  //       content: [
  //         {
  //           type: "text",
  //           text: `El clima de ${city} es soleado`,
  //         },
  //       ],
  //     };
  //   }




  //   ejemplo 2
  // conectarnos a una API de clima y obtener el clima en tiempo real
  async ({ city }) => {
    const infoCity = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    );
    const dataCity = await infoCity.json();
    if (dataCity.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No se encontraron datoss sobre ${city}`,
          },
        ],
      };
    }
    const respuestsaCity = dataCity.results[0];
    const { latitude, longitude } = respuestsaCity;
    console.log(respuestsaCity);
    const infoWeather = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,weather_code,apparent_temperature`
    );
    const dataWeather = await infoWeather.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(dataWeather, null, 2),
        },
      ],
    };
  }
);



// 3.  escuchar las conexiones del cliente
// creamos el trnasporete en nuestra maquina, no se tiene que conectar a interrnet ni nada
const transporte = new StdioServerTransport();
await server.connect(transporte);
