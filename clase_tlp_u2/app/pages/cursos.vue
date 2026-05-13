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

// ref significa variable reactiva.
// cuando cambian de valor, VUE actualiza la página
const mostrarFormulario = ref(false)
const guardandoCurso = ref(false)
const errorFormulario = ref('')

// objeto reactivo
// se usa ref para variables.
// se usa reactive para objetos y arrays.
const formCurso = reactive({
    nombre: '',
    nivel: '',
    anio: new Date().getFullYear()
})

function limpiarFormulario() {
    formCurso.nombre = ''
    formCurso.nivel = ''
    formCurso.anio = new Date().getFullYear()
    errorFormulario.value = ''
}

function cerrarFormulario() {
    mostrarFormulario.value = false
    limpiarFormulario()
}

async function guardarCurso() {
    errorFormulario.value = ''
    guardandoCurso.value = true

    try {
        await $fetch('/api/cursos', {
            method: 'POST',
            body: {
                nombre: formCurso.nombre,
                nivel: formCurso.nivel,
                anio: formCurso.anio
            }
        })
        cerrarFormulario()
        await refresh()
    } catch (err: any) {
        errorFormulario.value = getApiErrorMessage(err, 'No se pudo guardar el curso.')
    }
    finally {
        guardandoCurso.value = false
    }
}
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
                <UButton icon="i-heroicons-arrow-path" color="primary" variant="soft" :loading="pending"
                    @click="() => refresh()" class="self-start rounded-full px-5 text-course-accent-strong shadow-sm">
                    Actualizar
                </UButton>
            </div>
        </div>

        <!-- Listado de Cursos -->
        <div class="rounded-xl border border-course-line bg-course-surface p-4 shadow-lg backdrop-blur sm:p-6">
            <div class="mb-4 flex items-center justify-between border-b border-course-line-soft pb-4">
                <div>
                    <h2 class="text-lg font-semibold text-course-text">Listado de cursos</h2>
                    <p class="text-sm text-course-text-muted">Se muestran los cursos del año 2026.</p>
                </div>

                <!-- botón para mostrar formulario -->
                <UButton icon="i-heroicons-plus" variant="soft" @click="mostrarFormulario = true"
                    class="selft-start rounded-full px-5 text-course-accent-strong shadow-sm">
                    Agregar Curso
                </UButton>
            </div>

            <!-- Cargando -->
            <div v-if="pending" class="space-y-4 rounded-3xl border border-course-line bg-course-surface-soft p-6">
                <div class="space-y-1">
                    <p class="text-sm font-semibold text-course-header">Cargando cursos...</p>
                    <p class="text-sm text-course-text-muted">Estamos actualizando la información de la tabla.</p>
                </div>
                <USkeleton class="h-96 w-full rounded-3xl bg-course-line-soft" />
            </div>

            <!-- Error -->
            <UAlert v-if="error" color="error" variant="soft"
                class="rounded-3xl border border-course-line-accent bg-course-surface-accent text-course-header"
                :title="error.statusMessage || 'Error al cargar los cursos'" icon="i-heroicons-exclamation-triangle" />

            <!-- Tabla de cursos -->
            <UTable v-if="cursos && cursos.length > 0" :data="cursos" :columns="columns" :meta="tableMeta"
                class="overflow-hidden rounded-lg border border-course-line bg-course-surface" />

            <!-- Mensaje si no hay cursos -->
            <EmptyState v-if="!error && !pending && (!cursos || cursos.length == 0)"
                mensaje="No hay cursos actualmente" />
        </div>
    </div>

    <!-- Modal Agregar Curso -->
    <BaseFormModal v-model:open="mostrarFormulario" title="Agregar Curso"
        description="Completa los datos para registrar un nuevo curso.">
        <form class="space-y-4" @submit.prevent="guardarCurso">
            <!-- nombre -->
            <UFormField label="Nombre" name="nombre" :ui="modalFormFieldUi">
                <UInput v-model="formCurso.nombre" color="neutral" variant="outline" :ui="modalInputUi" class="w-full"
                    placeholder="Ej: 1° Básico" />
            </UFormField>

            <!-- nivel -->
            <UFormField label="Nivel" name="nivel" :ui="modalFormFieldUi">
                <UInput v-model="formCurso.nivel" color="neutral" variant="outline" :ui="modalInputUi" class="w-full"
                    placeholder="Ej: 1, 2, 3, ..." />
            </UFormField>

            <!-- año -->
            <UFormField label="Año" name="anio" :ui="modalFormFieldUi">
                <UInput v-model="formCurso.anio" color="neutral" variant="outline" :ui="modalInputUi" class="w-full"
                    placeholder="Ej: 2026" />
            </UFormField>

            <!-- mensaje de error -->
            <UAlert v-if="errorFormulario" color="error" variant="soft" icon="i-heroicons-exclamation-circle"
                :title="errorFormulario" />

            <!-- botones -->
            <div class="flex justify-end gap-3 pt-2">
                <!-- botón cancelar -->
                <UButton type="button" color="neutral" variant="subtle" @click="cerrarFormulario">
                    Cancelar
                </UButton>

                <!-- botón para guardar -->
                <UButton type="submit" color="primary" icon="i-heroicons-check" :loading="guardandoCurso">
                    Guardar Curso
                </UButton>
            </div>
        </form>
    </BaseFormModal>
</template>