# Sistema de recomendaciones de Nutrifork

## Descripción

Este sistema de recomendaciones se basa en la popularidad de las recetas asi como también en el rating que los usuarios han realizado.


## Tecnologias

- Python 3
- Numpy
- Surprise (para el modelo de ML)
- FastAPI
- Prisma (para conectar con la base de datos)

## Requisitos

1. Tener instalado python en el ordenador
2. Tener una URL con acceso a la base de datos
3. Tener una version de Linux (Pop Os, Mint o Ubuntu) para ejecutar ciertos paquetes.

## Instalación

1. Ejecutar el comando 
```python -m venv venv```

2. Luego ejecutar el comando 
```
. ./venv/bin/activate
```

3. A continuación ejecutar el comando 
```
pip3 install -r requirements.txt
```

4. Luego copiamos el ejemplo de nuestro archivo **.dev.env** dentro de un archivo .env dentro el mismo directorio donde esta **main.py**, y seteamos las variables de entorno con nuestras propias variables.

5. Luego debemos generar el esquema de la base de datos, por lo que ejecutamos el comando 
```
prisma generate
```

Y de esa manera ya podríamos utilizar el sistema de recomendaciones.

## Encender la API

Para levantar la API ejecutaremos el comando siguiente:

```bash
$ uvicorn main:app --host 0.0.0.0 --reload
```

Y de esa manera ya podríamos utilizar el endpoint de recomendaciones, si deseamos ver los endpoints de la API podemos acceder a la documentación de Swagger en la direccion [localhost:8080/docs](localhost:8080/docs)


## Licencias de software utilizado

- [FastAPI](https://github.com/tiangolo/fastapi/blob/master/LICENSE)
- [Surprise](https://github.com/NicolasHug/Surprise/blob/master/LICENSE.md)