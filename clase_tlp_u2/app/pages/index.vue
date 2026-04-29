<template>
    <div class="mx-auto max-w-7xl space-y-6">
        <section class="rounded-xl border border-course-line-accent bg-course-surface p-8 shadow-md">
            <p class="text-sm font-semibold uppercase tracking-wider text-course-accent">Portada</p>
            <h2 class="mt-3 text-4xl font-bold tracking-tight text-course-text">
                Bienvenido al panel académico
            </h2>
            <p class="mt-4 max-w-3xl text-base leading-7 text-course-text-soft">
                Esta portada reúne accesos rápidos a las secciones principales del sitio. Desde aquí puedes
                navegar al listado de cursos o revisar la sección de estudiantes.
            </p>
        </section>

        <section class="grid gap-6 md:grid-cols-3">
            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-course-text">Portada</h3>
                <p class="mt-2 text-sm leading-6 text-course-text-muted">
                    Vista inicial con una síntesis breve del sistema y accesos a las demás páginas.
                </p>
            </article>

            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-course-text">Cursos</h3>
                <p class="mt-2 text-sm leading-6 text-course-text-muted">
                    Página con la tabla de cursos cargada desde la API y acciones para refrescar los datos.
                </p>
            </article>

            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-course-text">Estudiantes</h3>
                <p class="mt-2 text-sm leading-6 text-course-text-muted">
                    Sección estática preparada para añadir más adelante directorio, fichas o filtros de
                    estudiantes.
                </p>
            </article>
        </section>
    </div>

</template>