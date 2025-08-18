# Examen1Back2 — Resumen final (generado con IA)

> Documento generado con IA a partir del código y notas de corrección del proyecto.


## 1) Descripción del proyecto
Backend REST en **Spring Boot** con **JPA/Hibernate** para gestionar **Usuarios, Docentes y Cursos**.  
- Persistencia en **MySQL (XAMPP)** con creación/actualización automática de tablas.  
- Relaciones principales:
  - `Docente 1..* Curso` (un Docente dicta muchos Cursos).
  - `Usuario 1..1 Docente` (un Usuario puede estar asociado a un Docente).


## 2) Errores corregidos (antes → después + explicación)

### 2.1. `modelos/Curso.java`
- **Identificador de entidad**: `@I` → `@Id`.  
  *La anotación estaba incompleta; JPA no reconocía el ID.*
- **Generación de PK**: `@Ge(strategy = IDENTITY)` → `@GeneratedValue(strategy = GenerationType.IDENTITY)`.  
  *`@Ge` no existe; se usa `@GeneratedValue` con `GenerationType.IDENTITY`.*
- **Nombre de tabla**: se añadió `@Table(name = "curso")`.  
  *Evita ambigüedad de naming y documenta el nombre final.*
- **Columna `nombre`**: se añadió `@Column(name = "nombre", nullable = false)`.  
  *Restringe nulos y crea la columna explícitamente.*
- **Anotación con punto y coma**: `@JoinColumn(...);` → `@JoinColumn(...)`.  
  *Las anotaciones no llevan `;` al final.*
- **Encapsulamiento**: `Docente docente;` → `private Docente docente;`.  
  *Buenas prácticas de POO/JPA.*
- **Accesores**: se agregaron getters y setters de `id`, `nombre` y `docente`.

### 2.2. `modelos/Docente.java`
- **Entidad**: `@Entit` → `@Entity`.  
  *Typo en la anotación.*
- **Nombre de tabla**: `@Table(name = "docente")`.  
  *Consistencia de nombres.*
- **PK autogenerada**: `@Id` + `@GeneratedValue(strategy = GenerationType.IDENTITY)`.  
  *Autoincremento típico en MySQL.*
- **Columna `especialidad`**: `@Column(name = "especialidad", nullable = false)`.  
- **Relación con cursos**:  
  ```java
  @OneToMany(mappedBy = "docente")
  @JsonManagedReference(value = "docente-curso")
  private List<Curso> cursos;
  ```
  *Lado inverso de la relación, evita recursión en JSON.*
- **Relación con usuario (propietario)**:  
  ```java
  @OneToOne
  @JoinColumn(name = "fk_usuario", referencedColumnName = "id")
  @JsonManagedReference(value = "docente-usuario")
  private Usuario usuario;
  ```
- **Constructores**: se agregó constructor vacío (requerido por JPA) y constructor con argumentos.

### 2.3. `modelos/Usuario.java`
- **Entidad**: `@Entit` → `@Entity`.  
- **Nombre de tabla**: `@Table(name = "usuarios")`.  
- **PK autogenerada**: `@GeneratedValue(strategy = GenerationType.IDENTITY)` (se añadió `.IDENTITY`).  
- **Anotaciones mal escritas**: `@Colun(...)` → *eliminar o usar `@Column` correcto solo cuando sea necesario* (por ejemplo, para `name`, `nullable`, `unique`, `length`).  
- **Campos**:
  - `nombre`, `correoElectronico`, `telefono`, `contraseña` → definir `@Column(...)` explícitas si se requieren restricciones.  
  - **Sugerencia**: evitar caracteres especiales en nombres de variables (por ejemplo, usar `contrasena` o `password` en lugar de `contraseña`, para evitar problemas de codificación).  
- **Enum inexistente**: se eliminó  
  ```java
  @Enumerated(EnumType.STRING) 
  private TipoUsuario tipoUsuario;
  ```
  *El enum `TipoUsuario` no existe en el proyecto; para restringir valores, usar `String` o crear el enum.*
- **Relación 1..1 inversa con Docente**:  
  ```java
  @OneToOne(mappedBy = "usuario")
  @JsonBackReference(value = "docente-usuario")
  private Docente docente;
  ```

### 2.4. `application.properties`
- Configuración incorporada para MySQL (XAMPP), puerto **3306**, usuario `root` y contraseña vacía.


## 3) Guía paso a paso: conexión a la base de datos (MySQL/XAMPP)

1) **Crear la base** (si no existe):  
```sql
CREATE DATABASE develop_db;
```
2) **Iniciar MySQL en XAMPP** y confirmar que corre en el puerto **3306**.  
3) **Configurar `src/main/resources/application.properties`:**
```properties
spring.application.name=Examen1Back2

spring.datasource.url=jdbc:mysql://localhost:3306/develop_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```
4) **Levantar la aplicación** (Gradle): `./gradlew bootRun` (Windows: `gradlew.bat bootRun`).  
5) **Verificar tablas** en phpMyAdmin (`http://localhost/phpmyadmin`) dentro de `develop_db`.


## 4) Recomendaciones para evitar errores similares

- **JDK 17**: usa Java 17 y configura `JAVA_HOME`; en IntelliJ, Gradle JVM = JDK 17.
- **Constructor vacío** en todas las entidades JPA.
- **Encapsulamiento**: campos `private` + getters/setters; evita campos públicos.
- **Tipado y nombres**: corrige typos en anotaciones (`@Entity`, `@Column`, `@GeneratedValue`), y usa nombres consistentes.
- **Relaciones bidireccionales**: controla recursión JSON con `@JsonManagedReference` / `@JsonBackReference` (o `@JsonIgnore`).
- **Enums**: si los usas, persístelos como `EnumType.STRING`; si no existe el enum, usa `String`.
- **Especiales/acentos**: evita `ñ` o acentos en nombres de variables para prevenir problemas de codificación.
- **Caches de Gradle**: si aparece el error de *GradleWorkerMain*, borra `.gradle` del proyecto y `~/.gradle`, y vuelve a ejecutar el wrapper.

---

### Fin
Este documento resume cambios y pasos clave para compilar, ejecutar y conectar correctamente el proyecto con MySQL.
