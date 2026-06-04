<script setup lang="ts">
definePageMeta({
    middleware: ['admin']
})

import type { Usuario } from '../types/usuario'

const { data: usuarios, pending, error, refresh } = await useFetch<Usuario[]>('/api/usuarios')

/* AGREGAR USUARIO */
const roles = ['Administrador', 'Funcionario']
const mostrarFormAgregar = ref(false)
const errorFormAgregar = ref('')
const guardandoNuevoUsuario = ref(false)

const formNuevoUsuario = reactive({
    nombreCompleto: '',
    password: '',
    rol: roles[1],
    activo: true,
    email: ''
})

function resetFormAgregar() {
    formNuevoUsuario.nombreCompleto = ''
    formNuevoUsuario.rol = roles[1]
    formNuevoUsuario.activo = true
    formNuevoUsuario.email = ''
    errorFormAgregar.value = ''
}

function cerrarFormAgregar() {
    mostrarFormAgregar.value = false
    resetFormAgregar()
}

async function guardarUsuario() { }

/* CAMBIAR CONTRASEÑA */
const mostrarFormContrasena = ref(false)
const errorContrasena = ref('')
const guardandoContrasena = ref(false)
const usuarioContrasena = ref<Usuario | null>(null)
const formContrasena = reactive({
    nueva: '',
    confirmar: ''
})

function resetFormContrasena() {
    formContrasena.nueva = ''
    formContrasena.confirmar = ''
    errorContrasena.value = ''
}

function abrirModalContrasena(usuario: Usuario) {
    usuarioContrasena.value = usuario
    resetFormContrasena()
    mostrarFormContrasena.value = true
}

function cerrarModalContrasena() {
    mostrarFormContrasena.value = false
    usuarioContrasena.value = null
    resetFormContrasena()
}

async function cambiarContrasena() { }

/* CAMBIAR ROL */
const mostrarFormCambiarRol = ref(false)
const guardandoCambioRol = ref(false)
const usuarioCambiarRol = ref<Usuario | null>(null)

const formCambiarRol = reactive({
    rol: roles[1]
})

function resetFormCambiarRol() {
    formCambiarRol.rol = roles[1]
}

function abrirModalCambiarRol(usuario: Usuario) {
    usuarioCambiarRol.value = usuario
    resetFormCambiarRol()
    formCambiarRol.rol = usuario.rol
    mostrarFormCambiarRol.value = true
}

function cerrarModalCambiarRol() {
    mostrarFormCambiarRol.value = false
    resetFormCambiarRol()
}
</script>

<template>
    <div class="space-y-8">
        <section class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
                    Usuarios del sistema
                </h1>
                <p class="mt-3 max-w-2xl text-base leading-7 text-brand-gray/80">
                    Visualice y administre los usuarios del sistema.
                </p>
            </div>

            <UButton @click="mostrarFormAgregar = true" variant="outline" color="neutral" icon="i-heroicons-plus"
                :ui="formBtnOutlineCTOUi">
                Agregar Usuario
            </UButton>
        </section>

        <section class="grid gap-4 md:grid-cols-2">
            <UsuarioCard v-for="usuario in usuarios" :key="usuario.email" :usuario="usuario"
                @cambiar-contrasena="abrirModalContrasena" @cambiar-rol="abrirModalCambiarRol" />
        </section>
    </div>

    <!-- Modal para nuevo usuario -->
    <BaseFormModal v-model:open="mostrarFormAgregar" title="Agregar Usuario"
        description="Completa los datos para registrar un nuevo usuario.">
        <form class="space-y-4" @submit.prevent="guardarUsuario">
            <UFormField label="Nombre y Apellido" name="nombreCompleto">
                <UInput v-model="formNuevoUsuario.nombreCompleto" color="neutral" variant="outline" class="w-full"
                    placeholder="Ej: Federico Santa Maria" />
            </UFormField>

            <UFormField label="Email" name="email">
                <UInput v-model="formNuevoUsuario.email" color="neutral" variant="outline" class="w-full"
                    placeholder="Ej: usuario@empresa.test" />
            </UFormField>

            <UFormField label="Constraseña" name="password">
                <UInput type="password" v-model="formNuevoUsuario.password" color="neutral" variant="outline"
                    class="w-full" placeholder="Al menos 6 caracteres" />
            </UFormField>

            <UFormField label="Estado" name="activo">
                <USwitch v-model="formNuevoUsuario.activo" unchecked-icon="i-lucide-x" checked-icon="i-lucide-check"
                    label="Usuario Activo" :ui=formSwitchUi />
            </UFormField>

            <UFormField label="Rol" name="rol">
                <URadioGroup v-model="formNuevoUsuario.rol" :items="roles" :ui="formRadioGroupUi" />
            </UFormField>

            <UAlert v-if="errorFormAgregar" color="error" variant="soft" icon="i-heroicons-exclamation-circle"
                :title="errorFormAgregar" />

            <div class="flex justify-end gap-3 pt-2">
                <UButton type="button" color="neutral" variant="subtle" @click="cerrarFormAgregar">
                    Cancelar
                </UButton>

                <UButton type="submit" color="neutral" icon="i-heroicons-check" :loading="guardandoNuevoUsuario"
                    :ui="formBtnCTOUi">
                    Agregar Usuario
                </UButton>
            </div>
        </form>
    </BaseFormModal>

    <!-- Modal para cambiar contraseña -->
    <BaseFormModal v-model:open="mostrarFormContrasena" title="Cambiar Contraseña" :description="usuarioContrasena
        ? `Actualiza la contraseña de ${usuarioContrasena.nombreCompleto}.`
        : 'Actualiza la contraseña del usuario seleccionado.'">
        <form class="space-y-4" @submit.prevent="cambiarContrasena">
            <UFormField label="Nueva contraseña" name="nueva-contrasena">
                <UInput v-model="formContrasena.nueva" type="password" color="neutral" variant="outline" class="w-full"
                    placeholder="Ingresa la nueva contraseña" />
            </UFormField>

            <UFormField label="Confirmar contraseña" name="confirmar-contrasena">
                <UInput v-model="formContrasena.confirmar" type="password" color="neutral" variant="outline"
                    class="w-full" placeholder="Repite la nueva contraseña" />
            </UFormField>

            <UAlert v-if="errorContrasena" color="error" variant="soft" icon="i-heroicons-exclamation-circle"
                :title="errorContrasena" />

            <div class="flex justify-end gap-3 pt-2">
                <UButton type="button" color="neutral" variant="subtle" @click="cerrarModalContrasena">
                    Cancelar
                </UButton>

                <UButton type="submit" color="neutral" icon="i-heroicons-key" :loading="guardandoContrasena"
                    :ui="formBtnCTOUi">
                    Guardar contraseña
                </UButton>
            </div>
        </form>
    </BaseFormModal>

    <!-- Modal para cambiar rol -->
    <BaseFormModal v-model:open="mostrarFormCambiarRol" title="Cambiar Rol" :description="usuarioCambiarRol
        ? `Cambia el rol de ${usuarioCambiarRol.nombreCompleto}.`
        : 'Cambia el rol del usuario seleccionado.'">
        <form>
            <UFormField label="Rol" name="rol">
                <URadioGroup v-model="formCambiarRol.rol" :items="roles" :ui="formRadioGroupUi" />
            </UFormField>

            <div class="flex justify-end gap-3 pt-2">
                <UButton type="button" color="neutral" variant="subtle" @click="cerrarModalCambiarRol">
                    Cancelar
                </UButton>

                <UButton type="submit" color="neutral" icon="i-lucide-shield-half" :loading="guardandoCambioRol"
                    :ui="formBtnCTOUi">
                    Cambiar Rol
                </UButton>
            </div>
        </form>
    </BaseFormModal>

    <!-- Modal de confirmación para borrar usuario -->
    <!-- <BaseFormModal v-model:open="mostrarConfirmBorrar" title="Borrar Usuario" :description="usuarioBorrar
        ? `¿Estás seguro que deseas borrar a ${usuarioBorrar.nombreCompleto}? Esta acción no se puede deshacer.`
        : ''">
        <div class="flex justify-end gap-3 pt-2">
            <UButton type="button" color="neutral" variant="subtle" @click="cerrarConfirmBorrar">
                Cancelar
            </UButton>
            <UButton type="button" icon="i-lucide-trash-2" :loading="borrandoUsuario" :ui="formBtnError">
                Borrar Usuario
            </UButton>
        </div>
    </BaseFormModal> -->
</template>