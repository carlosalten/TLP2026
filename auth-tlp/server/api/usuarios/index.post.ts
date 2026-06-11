import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  //obtener los datos enviados desde el form en el cliente
  const { email, password, nombreCompleto, activo, rol } = await readBody(event);

  //crear la constraseña
  const hash = await bcrypt.hash(password, 12);

  //insertar en la base de datos
  await prisma.usuario.create({
    data: {
      email: email.trim(),
      password: hash,
      nombreCompleto: nombreCompleto.trim(),
      activo: activo,
      rol: rol,
    },
  });

  return { ok: true };
});
