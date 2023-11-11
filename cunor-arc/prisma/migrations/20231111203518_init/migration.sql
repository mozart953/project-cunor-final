-- CreateTable
CREATE TABLE "Rol" (
    "ID_Rol" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreRol" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Permiso" (
    "ID_Permiso" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombrePermiso" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Restriccion" (
    "ID_Restriccion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreRestriccion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "detalleRol" (
    "ID_Detalle" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ID_rol" INTEGER NOT NULL,
    "ID_permiso" INTEGER NOT NULL,
    "ID_restriccion" INTEGER NOT NULL,
    CONSTRAINT "detalleRol_ID_rol_fkey" FOREIGN KEY ("ID_rol") REFERENCES "Rol" ("ID_Rol") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "detalleRol_ID_permiso_fkey" FOREIGN KEY ("ID_permiso") REFERENCES "Permiso" ("ID_Permiso") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "detalleRol_ID_restriccion_fkey" FOREIGN KEY ("ID_restriccion") REFERENCES "Restriccion" ("ID_Restriccion") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "estadoUsuario" (
    "ID_Estado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estado" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "ID_Usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DPI" TEXT NOT NULL,
    "primerNombre" TEXT NOT NULL,
    "primerApellido" TEXT NOT NULL,
    "nombreUsuario" TEXT NOT NULL,
    "Contrasenia" TEXT NOT NULL,
    "ID_rol" INTEGER NOT NULL,
    "ID_estado" INTEGER NOT NULL,
    "ID_carrera" INTEGER NOT NULL,
    CONSTRAINT "Usuario_ID_rol_fkey" FOREIGN KEY ("ID_rol") REFERENCES "Rol" ("ID_Rol") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_ID_estado_fkey" FOREIGN KEY ("ID_estado") REFERENCES "estadoUsuario" ("ID_Estado") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_ID_carrera_fkey" FOREIGN KEY ("ID_carrera") REFERENCES "Carrera" ("ID_Carrera") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "registroUsuario" (
    "ID_Registro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ID_usuario" INTEGER NOT NULL,
    "descripcion" TEXT,
    CONSTRAINT "registroUsuario_ID_usuario_fkey" FOREIGN KEY ("ID_usuario") REFERENCES "Usuario" ("ID_Usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Carrera" (
    "ID_Carrera" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreCarrera" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categoria" (
    "ID_Categoria" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreCategoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TrabajoGraduacion" (
    "ID_Trabajo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "cantidadPaginas" INTEGER,
    "descripcion" TEXT,
    "tamanio" INTEGER,
    "direccionGuardado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Archivo" (
    "ID_Archivo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "formato" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "estadoTrabajoGraduacion" (
    "ID_Estado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estado" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Autor" (
    "ID_Autor" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "primerNombre" TEXT NOT NULL,
    "segundoNombre" TEXT,
    "tercerNombre" TEXT,
    "primerApellido" TEXT NOT NULL,
    "segundoApellido" TEXT
);

-- CreateTable
CREATE TABLE "registroTrabajoGraduacion" (
    "ID_Detalle" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fechaCarga" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ID_trabajo" INTEGER NOT NULL,
    "ID_categoria" INTEGER NOT NULL,
    "ID_archivo" INTEGER NOT NULL,
    "ID_carrera" INTEGER NOT NULL,
    "ID_autor" INTEGER NOT NULL,
    "ID_usuario" INTEGER NOT NULL,
    "ID_estado" INTEGER NOT NULL,
    CONSTRAINT "registroTrabajoGraduacion_ID_trabajo_fkey" FOREIGN KEY ("ID_trabajo") REFERENCES "TrabajoGraduacion" ("ID_Trabajo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroTrabajoGraduacion_ID_categoria_fkey" FOREIGN KEY ("ID_categoria") REFERENCES "Categoria" ("ID_Categoria") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroTrabajoGraduacion_ID_archivo_fkey" FOREIGN KEY ("ID_archivo") REFERENCES "Archivo" ("ID_Archivo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroTrabajoGraduacion_ID_carrera_fkey" FOREIGN KEY ("ID_carrera") REFERENCES "Carrera" ("ID_Carrera") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroTrabajoGraduacion_ID_autor_fkey" FOREIGN KEY ("ID_autor") REFERENCES "Autor" ("ID_Autor") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroTrabajoGraduacion_ID_usuario_fkey" FOREIGN KEY ("ID_usuario") REFERENCES "Usuario" ("ID_Usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroTrabajoGraduacion_ID_estado_fkey" FOREIGN KEY ("ID_estado") REFERENCES "estadoTrabajoGraduacion" ("ID_Estado") ON DELETE RESTRICT ON UPDATE CASCADE
);
