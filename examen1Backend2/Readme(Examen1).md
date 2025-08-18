

###### **Modelo Curso:**



package com.example.Examen1Back2.modelos;



import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.\*;



@Entity

@Table(name = "curso") -**se agrego esta linea** (para crear la tabla cruso)

public class Curso {



@I -- se cambia por @Id

@Ge(strategy = IDENTITY)-**se cambia por** @GeneratedValue (strategy = GenerationType.IDENTITY)

private Integer id;



@Column(name =  "nombre", nullable = false, unique = false)-**se agrego esta linea** (crear columna "nombre" en tabla)

private String nombre;



&nbsp;@ManyToOne

&nbsp;   @JoinColumn(name="fk\_docente", referencedColumnName = "id")-- **se elimino el ";" al final de la linea**

&nbsp;   @JsonBackReference(value = "docente-curso")

&nbsp;    private Docente docente;   --**se agrego private**



&nbsp;public Curso() {

&nbsp;   }



&nbsp;   public Curso(Integer id, String nombre) {    --**no se realizaron cambios en constructores**

&nbsp;       this.id = id;

&nbsp;       this.nombre = nombre;

&nbsp;   } 





&nbsp;public Integer getId() {

&nbsp;       return id;

&nbsp;   }



&nbsp;   public void setId(Integer id) {     --**se agregaron los getter´s y setter´s**

        this.id = id;

&nbsp;   }



&nbsp;   public String getNombre() {

&nbsp;       return nombre;

&nbsp;   }



&nbsp;   public void setNombre(String nombre) {

&nbsp;       this.nombre = nombre;

&nbsp;   }



&nbsp;   public Docente getDocente() {

&nbsp;       return docente;

&nbsp;   }



&nbsp;   public void setDocente(Docente docente) {

&nbsp;       this.docente = docente;

&nbsp;   }

}







###### **Modelo Docente:**



package com.example.Examen1Back2.modelos;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.\*;



import java.util.List;



@Entity  -- **estaba mal escrita, faltaba "y"**

@Table(name = "docente") -**se agrego esta linea** (para crear la tabla docente)

public class Docente {



&nbsp;   

&nbsp;   @Id    --- **se agrego esta linea** (define que será el identificador)

&nbsp;   @GeneratedValue(strategy = GenerationType.IDENTITY)

&nbsp;   private Integer id;



&nbsp;   

&nbsp;   @Column(name =  "especialidad", nullable = false, unique = false) --**se agrega esta linea**

&nbsp;   private  String especialidad;



&nbsp;   @OneToMany(mappedBy = "docente")

&nbsp;   @JsonManagedReference(value = "docente-curso")

&nbsp;   private List<Curso> cursos;



&nbsp;   @OneToOne

&nbsp;   @JoinColumn(name = "fk\_usuario", referencedColumnName = "id\_usuario")

&nbsp;   @JsonManagedReference(value = "docente-usuario")

&nbsp;   private Usuario usuario;



&nbsp;   

&nbsp;    public Docente() {     -**se agregan constructores**

&nbsp;   }



&nbsp;   public Docente(Integer id, String especialidad, List<Curso> cursos, Usuario usuario) { -**se agregaron los constructores**

&nbsp;       this.id = id;

&nbsp;       this.especialidad = especialidad;

&nbsp;       this.cursos = cursos;

&nbsp;       this.usuario = usuario;

&nbsp;   }







&nbsp;   public Integer getId() {

&nbsp;       return id;

&nbsp;   }



&nbsp;   public void setId(Integer id) {

&nbsp;       this.id = id;

&nbsp;   }



&nbsp;   public String getEspecialidad() {

&nbsp;       return especialidad;

&nbsp;   }



&nbsp;   public void setEspecialidad(String especialidad) {

&nbsp;       this.especialidad = especialidad;

&nbsp;   }

&nbsp;   

&nbsp;     public List<Curso> getCursos() {

&nbsp;       return cursos;

&nbsp;   }



&nbsp;   public void setCursos(List<Curso> cursos) {     --**se agregaron getter y setter de cursos y usuario**

&nbsp;       this.cursos = cursos;

&nbsp;   }



&nbsp;   public Usuario getUsuario() {

&nbsp;       return usuario;

&nbsp;   }



&nbsp;   public void setUsuario(Usuario usuario) {

&nbsp;       this.usuario = usuario;

&nbsp;   }

}













###### **Modelo Usuario:**





package com.example.Examen1Back2.modelos;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.\*;



@Entity   -**estaba mal escrita, se agrego "y"**

@Table(name = "usuarios")

public class Usuario {



@Id

@GeneratedValue(strategy = GenerationType.IDENTITY) -- **se agrego .IDENTITY**

@Colun(name = "id\_usuario")--**esta linea esta mal escrita, y no es necesaria, se elimina**

private Integer id;



@Column(nullable = false, length = 100)- **se reemplaza por** @Column(name = "correo\_electronico",nullable = false, length = 100, unique= false)

private String nombre;



&nbsp;   @Colun(name = "correo\_electronico", unique = true) -- **@column esta mal escrito, se agrega también nullable = false**

    private String correoElectronico;



&nbsp;   @Column(name = "contraseña", unique = false, nullable =false)- **se agrego esta linea**

&nbsp;   private String contrase?a;

&nbsp;   



&nbsp;   @Column(name = "telefono", unique = false, nullable =false) -**se agrego esta linea**

&nbsp;   private String telefono;



&nbsp;   @Enumerated(EnumType.STRING)

&nbsp;   private TipoUsuario tipoUsuario;    --**se elimina, la clase TipoUsuario no existe**



&nbsp;   //Estableciendo la relacion uno a uno con la tabla docente

&nbsp;   @OneToOne(mappedBy = "usuario")

&nbsp;   @JsonBackReference(value = "docente-usuario")

&nbsp;   private Docente docente;



&nbsp;   public Usuario() {      --**no se modificaron los constructores**

&nbsp;   }



&nbsp;   public Usuario(Integer id, String nombre, String correoElectronico, String contraseña, String telefono) {

&nbsp;       this.id = id;

&nbsp;       this.nombre = nombre;

&nbsp;       this.correoElectronico = correoElectronico;

&nbsp;       this.contraseña = contraseña;

&nbsp;       this.telefono = telefono;

&nbsp;   }







&nbsp;public Integer getId() {

&nbsp;       return id;

&nbsp;   }



&nbsp;   public void setId(Integer id) {        ---**se agregaron getter y setter**

&nbsp;       this.id = id;

&nbsp;   }



&nbsp;   public String getNombre() {

&nbsp;       return nombre;

&nbsp;   }



&nbsp;   public void setNombre(String nombre) {

&nbsp;       this.nombre = nombre;

&nbsp;   }



&nbsp;   public String getCorreoElectronico() {

&nbsp;       return correoElectronico;

&nbsp;   }



&nbsp;   public void setCorreoElectronico(String correoElectronico) {

&nbsp;       this.correoElectronico = correoElectronico;

&nbsp;   }



&nbsp;   public String getContraseña() {

&nbsp;       return contraseña;

&nbsp;   }



&nbsp;   public void setContraseña(String contraseña) {

&nbsp;       this.contraseña = contraseña;

&nbsp;   }



&nbsp;   public String getTelefono() {

&nbsp;       return telefono;

&nbsp;   }



&nbsp;   public void setTelefono(String telefono) {

&nbsp;       this.telefono = telefono;

&nbsp;   }



&nbsp;   public Docente getDocente() {

&nbsp;       return docente;

&nbsp;   }



&nbsp;   public void setDocente(Docente docente) {

&nbsp;       this.docente = docente;

&nbsp;   }



}




###### **properties:**

spring.application.name=Examen1Back2

spring.datasource.url=jdbc:mysql://localhost:3306/develop_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Opcional: JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect