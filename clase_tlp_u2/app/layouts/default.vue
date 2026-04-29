<script setup lang="ts">
const route = useRoute()

const isActive = (to: String) => route.path === to

const navigationItems = [
    { label: 'Inicio', to: '/' },
    { label: 'Cursos', to: '/cursos' },
    { label: 'Estudiantes', to: '/estudiantes' },
]
</script>

<template>
    <div class="min-h-screen bg-linear-to-br from-course-canvas-start via-course-canvas-glow to-course-canvas-end">
        <!-- Nav -->
        <header class="border-b border-course-line/80 bg-course-surface/85 backdrop-blur">
            <div
                class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.24em] text-course-accent">Escuela</p>
                    <h1 class="text-lg font-semibold text-course-text">Navegación principal</h1>
                </div>

                <nav class="flex flex-wrap gap-2">
                    <!-- Links -->
                    <NuxtLink v-for="item in navigationItems" :key="item.to" :to="item.to"
                        class="rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
                        :class="isActive(item.to) ?
                            'border-course-line-accent bg-course-surface-accent text-course-accent-strong shadow-sm'
                            : 'border-course-line-accent bg-course-surface text-course-text-soft hover:border-course-line-accent hover:text-course-accent-strong'">
                        {{ item.label }}
                    </NuxtLink>
                </nav>
            </div>
        </header>

        <!-- Contenido páginas -->
        <main class="p-4 sm:px-6 lg:px-6">
            <slot />
        </main>
    </div>

</template>