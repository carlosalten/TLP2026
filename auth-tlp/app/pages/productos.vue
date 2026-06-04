<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { Producto } from '~/types/producto';

const productos: Producto[] = [
    { marca: 'Intel', modelo: 'Core i5-12400', tipo: 'Procesador', stock: 14, precio: 189990 },
    { marca: 'AMD', modelo: 'Ryzen 5 5600', tipo: 'Procesador', stock: 10, precio: 149990 },
    { marca: 'Kingston', modelo: 'NV2 1TB', tipo: 'SSD NVMe', stock: 18, precio: 58990 },
    { marca: 'Corsair', modelo: 'Vengeance LPX 16GB', tipo: 'Memoria RAM', stock: 22, precio: 46990 },
    { marca: 'ASUS', modelo: 'Prime B550M-A', tipo: 'Placa madre', stock: 7, precio: 124990 },
    { marca: 'Gigabyte', modelo: 'RTX 4060 Windforce', tipo: 'Tarjeta grafica', stock: 5, precio: 389990 },
    { marca: 'Cooler Master', modelo: 'MWE 650 Bronze V2', tipo: 'Fuente de poder', stock: 11, precio: 67990 },
    { marca: 'Western Digital', modelo: 'Blue 2TB', tipo: 'Disco duro', stock: 9, precio: 72990 }
]

const columns: TableColumn<Producto>[] = [
    { accessorKey: 'marca', header: 'Marca' },
    { accessorKey: 'modelo', header: 'Modelo' },
    { accessorKey: 'tipo', header: 'Tipo' },
    { accessorKey: 'stock', header: 'Stock' },
    {
        accessorKey: 'precio', header: 'Precio en CLP',
        cell: ({ row }) => `$ ${row.original.precio.toLocaleString('es-CL')}`
    }
]

const tableMeta = createTableMeta<Producto>()
</script>

<template>
    <div class="space-y-8">
        <section class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
                    Inventario de Productos
                </h1>
                <p class="mt-3 max-w-2xl text-base leading-7 text-brand-gray/80">
                    Vista para control de stock de productos.
                </p>
            </div>

            <UButton variant="outline" color="neutral" icon="i-heroicons-plus" :ui="formBtnOutlineCTOUi">
                Agregar Producto
            </UButton>
        </section>

        <section>
            <UTable :data="productos" :columns="columns" :meta=tableMeta
                class="rounded-2xl border border-brand-border bg-white/95" />
        </section>
    </div>
</template>