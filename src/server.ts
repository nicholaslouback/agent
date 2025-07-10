import { fastify } from "fastify";
import { sql } from "./db/connection.ts";
import { 
  type ZodTypeProvider, 
  serializerCompiler, 
  validatorCompiler 
} from "fastify-type-provider-zod";

import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts"; 

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5432'
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'OK'
})

app.listen({ port: env.PORT})