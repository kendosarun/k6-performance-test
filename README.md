# 🚀 k6 Performance Test Framework

A reusable **k6-based performance testing framework** for API and web services.

This project is designed for **real-world Performance Engineering workflows**:
- Easy to run locally or via Docker
- CI/CD ready (GitHub Actions)
- Supports multiple test profiles (Smoke, Load, Stress, Spike, Endurance)
- Parameterized `BASE_URL`
- Supports scheduled execution (cron) for performance regression monitoring
- Built-in k6 Web Dashboard for live monitoring

---

## 🧰 Tech Stack

- k6 (JavaScript scripting)
- Docker / Docker Compose
- Shell script runners
- Makefile (local QuickPizza service testing)
- CI/CD integration (GitHub Actions + GitHub Pages reports)

---

## 📂 Test Scripts

- `tests/performance.js` — runs against any target via `BASE_URL` (used by `run-local.sh` / `run-docker.sh` and CI)
- `tests/local-service.js` — runs against a local QuickPizza instance at `http://0.0.0.0:8080/` (used by the `Makefile`)

---

## 🏁 Getting Started

### Install k6 locally

https://k6.io/docs/get-started/installation/

### ▶️ Run Test Locally (against any BASE_URL)

```
sh run-local.sh <BASE_URL> <PROFILE>
```

### Examples:
```
sh run-local.sh https://quickpizza.grafana.com load
sh run-local.sh https://quickpizza.grafana.com stress
sh run-local.sh https://quickpizza.grafana.com spike
sh run-local.sh https://quickpizza.grafana.com endurance
```

### 🐳 Run Test via Docker

```
sh run-docker.sh <BASE_URL> <PROFILE>
```

### Examples:
```
sh run-docker.sh https://quickpizza.grafana.com load
sh run-docker.sh https://quickpizza.grafana.com stress
```

### 🍕 Run Test Against a Local QuickPizza Service (Makefile)

If you have a local QuickPizza instance running on `http://0.0.0.0:8080/`:

```
make local-test PROFILE=<PROFILE>
```

### Example:
```
make local-test PROFILE=smoke
```

### ‼️ Make the runner scripts executable (IMPORTANT) ‼️
```
chmod +x run-local.sh run-docker.sh
```
Without this step, `sh run-local.sh` / `sh run-docker.sh` (or running them directly) **may fail with permission denied.**

### 📊 k6 Web Dashboard

While a test is running, the live dashboard is available at:
```
http://localhost:5665
```

### Latest report of Performance testing
[k6 report](https://kendosarun.github.io/k6-performance-test/)
