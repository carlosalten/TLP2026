export default defineEventHandler(async () => {
    return await prisma.curso.findMany({
        orderBy:{id:'desc'}
    })
})