<script setup lang="ts">
import type { Curso } from '~/types/curso'
import type { TableColumn } from '@nuxt/ui'
import { defaultColumnMeta } from '~/utils/tableStyle'

const { data: cursos, pending, error, refresh } = await useFetch<Curso[]>('/api/cursos')

// console.log('Hola Mundo')
// console.log(cursos.value)

const columns: TableColumn<Curso>[] = [
    { accessorKey: 'id', header: 'ID', meta: defaultColumnMeta },
    { accessorKey: 'nombre', header: 'Nombre', meta: defaultColumnMeta },
    { accessorKey: 'nivel', header: 'Nivel', meta: defaultColumnMeta },
    { accessorKey: 'anio', header: 'Año', meta: defaultColumnMeta },
]

const tableMeta = createTableMeta<Curso>()
</script>

<template>
    <div class="mx-auto max-w-7xl space-y-4">
        <!-- Panel Título -->
        <div class="rounded-xl border border-course-line-accent bg-course-surface p-6 shadow-lg backdrop-blur sm:p-6">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="space-y-2">
                    <p class="text-sm font-semibold uppercase tracking-widest text-course-accent">
                        Panel Académico
                    </p>
                    <h1 class="text-2xl font-bold tracking-tight text-course-text sm:text-3xl">Cursos</h1>
                    <p class="max-w-2xl text-sm leading-6 text-course-text-soft">
                        Consulta el listado actualizado de cursos en una vista clara y fácil de revisar.
                    </p>
                </div>

                <!-- Botón Actualizar -->
            </div>
        </div>

        <!-- Listado de Cursos -->
        <div class="rounded-xl border border-course-line bg-course-surface p-4 shadow-lg backdrop-blur sm:p-6">
            <div class="mb-4 flex items-center justify-between border-b border-course-line-soft pb-4">
                <div>
                    <h2 class="text-lg font-semibold text-course-text">Listado de cursos</h2>
                    <p class="text-sm text-course-text-muted">Se muestran los cursos del año 2026.</p>
                </div>
            </div>

            <!-- Cargando -->

            <!-- Error -->

            <!-- Tabla de cursos -->
            <UTable v-if="cursos && cursos.length > 0" :data="cursos" :columns="columns" :meta="tableMeta"
                class="overflow-hidden rounded-lg border border-course-line bg-course-surface" />

            <!-- Mensaje si no hay cursos -->
            <EmptyState v-if="!pending && (!cursos || cursos.length == 0)" mensaje="No hay cursos actualmente" />
        </div>
    </div>

</template>