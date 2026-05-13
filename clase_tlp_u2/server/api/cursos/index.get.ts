export default defineEventHandler(async () => {
    // await new Promise(resolve=>setTimeout(resolve,3000))

    return await prisma.curso.findMany({
        orderBy:[{nivel:'asc'},{nombre:'asc'}]
    })
})