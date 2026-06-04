<script setup lang="ts">
import type { Usuario } from '~/types/usuario'

const props = defineProps<{
    usuario: Usuario
}>()
</script>

<template>
    <UCard class="border border-brand-border bg-white/95">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <p class="text-lg font-bold text-brand-blue">
                    {{ props.usuario.nombreCompleto }}
                </p>
                <p class="text-sm text-brand-gray/70">
                    {{ props.usuario.email }}
                </p>
            </div>

            <div class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                :class="props.usuario.activo ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-red/10 text-brand-red'">
                {{ props.usuario.activo ? 'Activo' : 'Bloqueado' }}
            </div>
        </div>

        <div class="mt-6 flex items-center justify-start border-t border-brand-border pt-4 text-sm text-brand-gray/75">
            <span class="mr-1">Rol asignado: </span>
            <span class="font-semibold text-brand-gray">{{ props.usuario.rol }}</span>
        </div>

        <div class="mt-4 flex items-center justify-end gap-2">
            <UTooltip text="Cambiar contraseña">
                <UButton icon="i-lucide-key-round" aria-label="Cambiar contraseña" variant="soft" size="xs"
                    class="rounded-full bg-brand-yellow/20 text-brand-gray hover:bg-brand-yellow/35" />
            </UTooltip>

            <UTooltip text="Cambiar rol">
                <UButton icon="i-lucide-shield-half" aria-label="Cambiar rol" variant="soft" size="xs"
                    class="rounded-full bg-brand-cyan/15 text-brand-cyan hover:bg-brand-cyan/25" />
            </UTooltip>

            <UTooltip text="Eliminar usuario">
                <UButton icon="i-lucide-trash-2" aria-label="Eliminar usuario" variant="soft" size="xs"
                    class="rounded-full bg-brand-red/12 text-brand-red hover:bg-brand-red/24" />
            </UTooltip>

            <UTooltip :text="props.usuario.activo ? 'Bloquear usuario' : 'Activar usuario'">
                <UButton :icon="props.usuario.activo ? 'i-lucide-lock' : 'i-lucide-lock-open'"
                    :aria-label="props.usuario.activo ? 'Bloquear usuario' : 'Activar usuario'" variant="soft" size="xs"
                    :class="props.usuario.activo
                        ? 'rounded-full bg-brand-red/12 text-brand-red hover:bg-brand-red/24'
                        : 'rounded-full bg-brand-green/12 text-brand-green hover:bg-brand-green/24'" />
            </UTooltip>
        </div>
    </UCard>
</template>