import type { Curso } from "~/types/curso"

export interface Estudiante{
    run: string
    nombres: string
    apellidos: string
    email: string | null
    fechaNac: string | null
    cursoId: number
    curso: Curso
}