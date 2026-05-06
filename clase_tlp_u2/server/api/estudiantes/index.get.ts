export default defineEventHandler(async () => {
    return await prisma.estudiante.findMany({
        orderBy: { apellidos: 'asc' },
        include: { curso:true }
    })
})