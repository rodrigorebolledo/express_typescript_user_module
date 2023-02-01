# Guía instalación proyecto

---

## Inicializar base de datos Mysql y servidor Node

### Base de datos Mysql:

[Adjunto URL de la documentación oficial](https://dev.mysql.com/doc/refman/8.0/en/installing.html)

### Servidor Node:

- Instalar dependencias

```sh
npm i
```

- Ejecutar el ambiente de desarrollo

```sh
npm run dev
```

---

## **Cargar base de datos**

- Crear una instancia de base de datos
- En la carpeta <u>database_scripts</u>, ejecutar la lista de comandos contenidos en el script
- Actualizar el la variable de entorno DATABASE_URL con los datos correspondientes

---

## **Probar solución**

Se debe utilizar algún cliente que permita realizar peticiones HTTP. Se recomienda **Postman**.

- El protocolo definido para este caso corresponde al: <u>http</u>

* El host definido para este caso corresponde al: <u>localhost</u>
* El puerto definido para este caso corresponde al: <u>3000</u>

**Se adjunta colección de Postman para probar.**

---
