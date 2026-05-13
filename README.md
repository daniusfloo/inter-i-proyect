# Smart Ambulance

Proyecto basico para simular despacho de ambulancias y priorizacion de semaforos.

## Estructura

```text
smart-ambulance/
├── backend/
├── frontend/
├── simulation/
├── README.md
└── .gitignore
```

## Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

La API queda disponible en `http://127.0.0.1:8000`.

## Frontend

Abre `frontend/index.html` en el navegador. El frontend espera que el backend este corriendo en `http://127.0.0.1:8000`.

## Simulacion

```bash
python simulation/simulator.py
```
