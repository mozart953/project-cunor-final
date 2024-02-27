-- CreateTable
CREATE TABLE "Rol" (
    "ID_Rol" SERIAL NOT NULL,
    "nombreRol" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("ID_Rol")
);

-- CreateTable
CREATE TABLE "Permiso" (
    "ID_Permiso" SERIAL NOT NULL,
    "nombrePermiso" TEXT NOT NULL,

    CONSTRAINT "Permiso_pkey" PRIMARY KEY ("ID_Permiso")
);

-- CreateTable
CREATE TABLE "Restriccion" (
    "ID_Restriccion" SERIAL NOT NULL,
    "nombreRestriccion" TEXT NOT NULL,

    CONSTRAINT "Restriccion_pkey" PRIMARY KEY ("ID_Restriccion")
);

-- CreateTable
CREATE TABLE "detalleRol" (
    "ID_Detalle" SERIAL NOT NULL,
    "ID_rol" INTEGER NOT NULL,
    "ID_permiso" INTEGER NOT NULL,
    "ID_restriccion" INTEGER NOT NULL,

    CONSTRAINT "detalleRol_pkey" PRIMARY KEY ("ID_Detalle")
);

-- CreateTable
CREATE TABLE "estadoUsuario" (
    "ID_Estado" SERIAL NOT NULL,
    "estado" INTEGER NOT NULL,

    CONSTRAINT "estadoUsuario_pkey" PRIMARY KEY ("ID_Estado")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "ID_Usuario" SERIAL NOT NULL,
    "DPI" TEXT NOT NULL,
    "primerNombre" TEXT NOT NULL,
    "primerApellido" TEXT NOT NULL,
    "nombreUsuario" TEXT NOT NULL,
    "Contrasenia" TEXT NOT NULL,
    "ID_rol" INTEGER NOT NULL,
    "ID_estado" INTEGER NOT NULL,
    "ID_carrera" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("ID_Usuario")
);

-- CreateTable
CREATE TABLE "registroUsuario" (
    "ID_Registro" SERIAL NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ID_usuario" INTEGER NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "registroUsuario_pkey" PRIMARY KEY ("ID_Registro")
);

-- CreateTable
CREATE TABLE "Carrera" (
    "ID_Carrera" SERIAL NOT NULL,
    "nombreCarrera" TEXT NOT NULL,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("ID_Carrera")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "ID_Categoria" SERIAL NOT NULL,
    "nombreCategoria" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("ID_Categoria")
);

-- CreateTable
CREATE TABLE "TrabajoGraduacion" (
    "ID_Trabajo" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "cantidadPaginas" INTEGER,
    "descripcion" TEXT,
    "tamanio" INTEGER,
    "direccionGuardado" TEXT NOT NULL,
    "paClave" TEXT,

    CONSTRAINT "TrabajoGraduacion_pkey" PRIMARY KEY ("ID_Trabajo")
);

-- CreateTable
CREATE TABLE "Formato" (
    "ID_Formato" SERIAL NOT NULL,
    "nombreFormato" TEXT NOT NULL,

    CONSTRAINT "Formato_pkey" PRIMARY KEY ("ID_Formato")
);

-- CreateTable
CREATE TABLE "estadoTrabajoGraduacion" (
    "ID_Estado" SERIAL NOT NULL,
    "estado" INTEGER NOT NULL,

    CONSTRAINT "estadoTrabajoGraduacion_pkey" PRIMARY KEY ("ID_Estado")
);

-- CreateTable
CREATE TABLE "Autor" (
    "ID_Autor" SERIAL NOT NULL,
    "primerNombre" TEXT NOT NULL,
    "segundoNombre" TEXT,
    "tercerNombre" TEXT,
    "primerApellido" TEXT NOT NULL,
    "segundoApellido" TEXT,
    "carnet" TEXT,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("ID_Autor")
);

-- CreateTable
CREATE TABLE "registroTrabajoGraduacion" (
    "ID_Detalle" SERIAL NOT NULL,
    "fechaCarga" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ID_trabajo" INTEGER NOT NULL,
    "ID_categoria" INTEGER NOT NULL,
    "ID_formato" INTEGER NOT NULL,
    "ID_carrera" INTEGER NOT NULL,
    "ID_usuario" INTEGER NOT NULL,
    "ID_estado" INTEGER NOT NULL,

    CONSTRAINT "registroTrabajoGraduacion_pkey" PRIMARY KEY ("ID_Detalle")
);

-- CreateTable
CREATE TABLE "EnlaceTrabajoAutor" (
    "ID_Autor" INTEGER NOT NULL,
    "ID_Detalle" INTEGER NOT NULL,

    CONSTRAINT "EnlaceTrabajoAutor_pkey" PRIMARY KEY ("ID_Autor","ID_Detalle")
);

-- CreateTable
CREATE TABLE "ArchivoAnexo" (
    "ID_Archivo" SERIAL NOT NULL,
    "direccionGuardado" TEXT NOT NULL,
    "ID_detalle" INTEGER NOT NULL,

    CONSTRAINT "ArchivoAnexo_pkey" PRIMARY KEY ("ID_Archivo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombreUsuario_key" ON "Usuario"("nombreUsuario");

-- AddForeignKey
ALTER TABLE "detalleRol" ADD CONSTRAINT "detalleRol_ID_rol_fkey" FOREIGN KEY ("ID_rol") REFERENCES "Rol"("ID_Rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleRol" ADD CONSTRAINT "detalleRol_ID_permiso_fkey" FOREIGN KEY ("ID_permiso") REFERENCES "Permiso"("ID_Permiso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleRol" ADD CONSTRAINT "detalleRol_ID_restriccion_fkey" FOREIGN KEY ("ID_restriccion") REFERENCES "Restriccion"("ID_Restriccion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_ID_rol_fkey" FOREIGN KEY ("ID_rol") REFERENCES "Rol"("ID_Rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_ID_estado_fkey" FOREIGN KEY ("ID_estado") REFERENCES "estadoUsuario"("ID_Estado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_ID_carrera_fkey" FOREIGN KEY ("ID_carrera") REFERENCES "Carrera"("ID_Carrera") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registroUsuario" ADD CONSTRAINT "registroUsuario_ID_usuario_fkey" FOREIGN KEY ("ID_usuario") REFERENCES "Usuario"("ID_Usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registroTrabajoGraduacion" ADD CONSTRAINT "registroTrabajoGraduacion_ID_trabajo_fkey" FOREIGN KEY ("ID_trabajo") REFERENCES "TrabajoGraduacion"("ID_Trabajo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registroTrabajoGraduacion" ADD CONSTRAINT "registroTrabajoGraduacion_ID_categoria_fkey" FOREIGN KEY ("ID_categoria") REFERENCES "Categoria"("ID_Categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registroTrabajoGraduacion" ADD CONSTRAINT "registroTrabajoGraduacion_ID_formato_fkey" FOREIGN KEY ("ID_formato") REFERENCES "Formato"("ID_Formato") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registroTrabajoGraduacion" ADD CONSTRAINT "registroTrabajoGraduacion_ID_carrera_fkey" FOREIGN KEY ("ID_carrera") REFERENCES "Carrera"("ID_Carrera") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registroTrabajoGraduacion" ADD CONSTRAINT "registroTrabajoGraduacion_ID_usuario_fkey" FOREIGN KEY ("ID_usuario") REFERENCES "Usuario"("ID_Usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registroTrabajoGraduacion" ADD CONSTRAINT "registroTrabajoGraduacion_ID_estado_fkey" FOREIGN KEY ("ID_estado") REFERENCES "estadoTrabajoGraduacion"("ID_Estado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnlaceTrabajoAutor" ADD CONSTRAINT "EnlaceTrabajoAutor_ID_Autor_fkey" FOREIGN KEY ("ID_Autor") REFERENCES "Autor"("ID_Autor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnlaceTrabajoAutor" ADD CONSTRAINT "EnlaceTrabajoAutor_ID_Detalle_fkey" FOREIGN KEY ("ID_Detalle") REFERENCES "registroTrabajoGraduacion"("ID_Detalle") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivoAnexo" ADD CONSTRAINT "ArchivoAnexo_ID_detalle_fkey" FOREIGN KEY ("ID_detalle") REFERENCES "registroTrabajoGraduacion"("ID_Detalle") ON DELETE RESTRICT ON UPDATE CASCADE;
