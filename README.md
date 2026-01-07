# Proyecto: Deploy automático con Render + Tests

## Descripción
Este proyecto demuestra un **pipeline profesional CI/CD** usando Render para desplegar una aplicación HTML/Node sencilla, integrando **tests automáticos**, **despliegue controlado** y **rollback manual**.  

La idea es que **cualquier push a la rama `main`** Render despliega la versión. En caso de fallo, el deploy se bloquea, y el rollback manual restaura la versión estable.

---

## Flujo conceptual del pipeline

### Lista paso a paso
1. Push a la rama `main` en GitHub.
2. Render detecta el push automáticamente.
3. Render ejecuta el **Build Command**:
   - `npm install` → instala dependencias
   - `npm test` → corre tests unitarios e integración
4. Si los tests pasan → deploy automático en Render.
5. Si los tests fallan → deploy bloqueado, versión estable intacta.
6. Rollback manual disponible desde Render si es necesario.

### Diagrama ASCII
![alt text](<Diagrama sin título.drawio.png>)

---

## Estrategia CI/CD implementada
- **Separación clara de test y deploy:** Los tests se ejecutan primero; si fallan, el deploy no ocurre.  
- **Despliegue automático:** Build exitoso → Render publica automáticamente la versión.  
- **Rollback manual:** Permite restaurar una versión estable en caso de problemas en producción.  
- **Control de versiones:** Cada deploy corresponde al commit correcto en `main`.  
- **Entornos diferenciados:**
  - **Local:** Tests ejecutados manualmente (`npm test`)  
  - **Repositorio:** Historial de commits y cambios versionados  
  - **Render:** Build/Deploy/Runtime logs, rollback y versión publicada

---

## Estructura del proyecto
![alt text](image.png)

# Configurar Render

## 1. Crear cuenta y entrar a Render

1. Ve a https://render.com
2. Regístrate o inicia sesión 
3. Asegúrate de tener acceso al repositorio que quieres desplegar.

## 2. Crear nuevo Web Service

1. En tu Dashboard, haz click en New → Web Service
2. Selecciona tu repositorio (GitHub, GitLab o Bitbucket)
3. Autoriza a Render a acceder al repositorio si es la primera vez.

## 3. Configurar los parámetros del servicio

En la pantalla de creación:
- **Name:** Nombre de tu servicio (ej. mi-app)
- **Environment:** Node (o el que corresponda según tu proyecto)
- **Branch:** main (o la rama que quieras desplegar automáticamente)
- **Build Command:**
    
    ```bash
    npm install && npm test
    ```
    Esto instalará dependencias y ejecutará los tests. Si fallan, el deploy se bloquea.

## 4. Habilitar despliegue automático

Marca la opción Auto Deploy en **On Commit**

Cada vez que hagas un commit se despliega solo en Render.



# Pipeline de Despliegue con Render y Tests Automáticos

Este pipeline está basado en **Render** + **Build Command** y ejecuta automáticamente los tests antes de desplegar.

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPO>
cd <NOMBRE_DEL_REPO>
```

## 2. Instalar dependencias localmente

```bash
npm install
```

## 3. Ejecutar los test manualmente

```bash
npm test
```
- **Si los tests pasan → listo para deploy**
- **Si algún test falla → corregir antes de push**

## 4. Hacer un cambio y preparar commit
1. Modificar archivos (`src/` o `test/`)
2. Agregar cambios:

```bash
git add .
```

3. Hacer commit:

```bash
git commit -m "<Mensaje>"
```

## 5. Push a la rama principal

```bash
git push origin main
```

**Render ejecuta automáticamnte:**

```bash
npm install
npm test
```

## 6. Verificar resultado en Render

1. Abre tu servicio en Render → Build & Deploy logs
2. Confirma:
    - Tests ejecutados y pasan
    - Deploy exitoso
    - Versión publicada corresponde al commit

## 7. Probar fallo controlado

1. Modificar Test para que falle:

```bash
expect(sum(2,3)).toBe(6); // fallo intencionado
```

2. Commit y push → Render ejecutará Build Command
3. Comprobar logs en Render

## 8. Rollback manual

1. En Render → pestaña Deploys / Events
2. Selecciona el commit estable anterior
3. Haz click en Rollback
4. Verifica que la web vuelve a funcionar
