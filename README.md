# 🚀 k6 Performance Test Framework

A reusable **k6-based performance testing framework** for API and web services.

This project is designed for **real-world Performance Engineering workflows**:
- Easy to run locally or via Docker
- CI/CD ready (GitHub Actions)
- Supports multiple test profiles (Load, Stress, Spike, Endurance)
- Parameterized `BASE_URL`
- Supports scheduled execution (cron) for performance regression monitoring
- Ready to extend with InfluxDB + Grafana dashboards

---

## 🧰 Tech Stack

- k6 (JavaScript scripting)
- Docker
- Shell script runner
- CI/CD integration

---


## 🏁 Getting Started

### Install k6 locally

https://k6.io/docs/get-started/installation/

### ▶️ Run Test Locally

``` 
sh run.sh <BASE_URL> <PROFILE>
```

### Examples:
```
sh run.sh https://quickpizza.grafana.com load
sh run.sh https://quickpizza.grafana.com stress
sh run.sh https://quickpizza.grafana.com spike
sh run.sh https://quickpizza.grafana.com endurance
```

### ‼️ Make the runner script executable (IMPORTANT)‼️
``` chmod +x run.sh ``` Without this step, sh run.sh or ./run.sh **may fail with permission denied.**