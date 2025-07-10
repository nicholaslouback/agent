import { fastify } from "fastify";
import { 
  type ZodTypeProvider, 
  serializerCompiler, 
  validatorCompiler 
} from "fastify-type-provider-zod";

import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts"; 
import { getRoomsRoute } from "./http/routes/getRooms.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5432'
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'OK'
})

app.register(getRoomsRoute)

app.listen({ port: env.PORT})