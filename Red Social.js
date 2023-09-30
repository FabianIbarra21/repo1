class Usuario {
    constructor(idUsuario, nombre, edad, ciudad, profesion) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.edad = edad;
        this.ciudad = ciudad;
        this.profesion = profesion;
        this.amigos = [];
        this.publicaciones = [];
    }

    agregarAmigo(amigo) {
        this.amigos.push(amigo);
    }

    eliminarAmigo(amigo) {
        const indice = this.amigos.indexOf(amigo);
        if (indice !== -1) {
            this.amigos.splice(indice, 1);
        }
    }

    publicar(contenido) {
        const publicacion = new Publicacion(contenido, this);
        this.publicaciones.push(publicacion);
    }

    modificarPublicacion(indice, nuevoContenido) {
        if (indice >= 0 && indice < this.publicaciones.length) {
            this.publicaciones[indice].contenido = nuevoContenido;
        }
    }

    eliminarPublicacion(indice) {
        if (indice >= 0 && indice < this.publicaciones.length) {
            this.publicaciones.splice(indice, 1);
        }
    }

    obtenerInformacion() {
        return `
            Nombre: ${this.nombre}
            Edad: ${this.edad}
            Ciudad: ${this.ciudad}
            Profesión: ${this.profesion}
            Cantidad de amigos: ${this.amigos.length}
            Cantidad de publicaciones: ${this.publicaciones.length}`;
    }
}

class Publicacion {
    constructor(contenido, autor) {
        this.contenido = contenido;
        this.autor = autor;
        this.likes = 0;
        this.comentarios = [];
    }

    darLike() {
        this.likes++;
    }

    agregarComentario(comentario) {
        this.comentarios.push(comentario);
    }
}

class RedSocialSimplificada {
    constructor() {
        this.usuarios = new Map();
    }

    agregarUsuario(usuario) {
        this.usuarios.set(usuario.idUsuario, usuario);
    }

    buscarUsuarioPorId(idUsuario) {
        return this.usuarios.get(idUsuario);
    }
}

// Crear instancias de la Red Social y usuarios
const redSocial = new RedSocialSimplificada();
const usuario1 = new Usuario(1, "Pepito", 25, "Villa Eslisa", "Chofer");
const usuario2 = new Usuario(2, "Gustavo", 30, "Luque", "Piloto");

// Agregar amigos y publicaciones
usuario1.agregarAmigo(usuario2);
usuario1.publicar("¡Hola, esta es mi primera publicación!");
usuario2.publicar("Saludos desde la red social.");

// Dar likes y agregar comentarios
usuario1.publicaciones[0].darLike();
usuario1.publicaciones[0].agregarComentario("¡Me gusta!");

usuario2.publicaciones[0].agregarComentario("Hola desde usuario2.");

// Agregar usuarios a la red social
redSocial.agregarUsuario(usuario1);
redSocial.agregarUsuario(usuario2);

// Buscar usuario por ID y mostrar información
const usuarioEncontrado = redSocial.buscarUsuarioPorId(1);
if (usuarioEncontrado) {
    console.log("Información del usuario encontrado:");
    console.log(usuarioEncontrado.obtenerInformacion());

    console.log("Publicaciones:");
    for (const publicacion of usuarioEncontrado.publicaciones) {
        console.log("- " + publicacion.contenido);
        console.log("Likes: " + publicacion.likes);
        console.log("Comentarios: " + publicacion.comentarios.length);
    }
} else {
    console.log("Usuario no encontrado.");
}