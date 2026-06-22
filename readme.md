```markdown
# 🚀 AssetIntel — Next-Gen Asset Intelligence Core & Field Operations Copilot

**AssetIntel** is an enterprise-grade, edge-capable Industrial Knowledge Management platform engineered specifically for high-risk plant environments, heavy equipment diagnostics, and safety compliance tracking. 

It completely bridges the gap between unstructured engineering manuals and on-site frontline execution by converting dense data silos (OEM handbooks, layout schematics, and lock-out/tag-out (LOTO) procedures) into real-time operational answers and mandatory pre-work clearance verification streams.

---

## 🎨 Visual System Identity

The platform utilizes a **Mission-Critical Command Center Layout** mapped out with a high-fidelity color profile:
* **Base Workspace Canvas:** Deep Dark Navy & Slate (`#050816` / `#0f172a`) to minimize operational visual fatigue.
* **Action & Warn Targets:** High-Visibility Safety Orange & Amber to emphasize critical parameters.
* **Clearance Indicators:** Crisp Emerald Green for confirmed safety compliance gates.
* **Visual Telemetry Line:** Sharp Cyan and Magenta vectors for operational activity trend lines.

---

## ⚡ Core Operational Features

### 📊 1. Operations Control Dashboard
A high-fidelity central command center loaded with real-time system indicators:
* **KPI Bento Telemetry Grid:** Tracks active asset volumes, parsed vector node blocks, mean time to isolate parameters, and live technician readiness rate factors.
* **Daily Activity Line Stream:** Measures scannable text intake metrics vs runtime copilot routing queries.
* **Plant Sector Saturation:** Multi-variable bar charts displaying cross-reference compliance coverage over specific facility sectors (e.g., Mechanical SOPs, Electrical Safety, LOTO Boundaries).

### 🛠️ 2. Expert Field Copilot (RAG Interface)
A context-aware, sandboxed conversational layer designed to extract concrete hardware boundaries instantly:
* **Targeted Ingestion Filtering:** Restricts query context pipelines to a single target document or scans the entire plant workspace corpus concurrently.
* **Zero-Hallucination Constraints:** Restricts answers strictly to approved site documentation to protect hardware life cycles.
* **Pre-loaded Dialogue Profiles:** Initialized with active engineering reference queries (e.g., pulling exact $210\text{ Nm}$ cross-pattern bolt arrays or isolation configurations for `EQ-PUMP-101`).

### 🛡️ 3. Compliance Audit & Safety Validator
A rigid check gate deployed to clear technical field technicians before initiating high-risk site works:
* **SOP Parameter Generation:** Generates situational questions derived directly from localized facility procedures.
* **Multi-Key Evaluation Core:** Features a zero-lag array mapping script verifying operator inputs against literal strings, key index indicators, and numerical sequences seamlessly.
* **Clearance Gate Logger:** Flashes immediate field safety clearances upon passing evaluation nodes, recording authorization bounds within session history logs.

### 📈 4. Predictive Reliability Metrics
An automated audit log mapping operator readiness indicators across plant layers:
* **Dynamic Database Translation Layer:** Automatically intercepts legacy database indices on the fly, translating technical table markers (like old NoSQL arrays) into human-readable plant modules like *Gearbox Mechanical Systems*.
* **Risk Categorization Grids:** Isolates weak performance fields (accuracy $< 60\%$) from verified nominal zones to trigger proactive training cycles.

---

## 🏗️ System Architecture Pipeline

The ingestion pipeline converts unstructured technical text logs into low-latency local vectors through a high-availability processing loop:

$$\text{PDF Input} \longrightarrow \text{Text Extraction} \longrightarrow \text{Semantic Chunking} \longrightarrow \text{Embedding Generation} \longrightarrow \text{FAISS Indexing}$$

* **Edge Capabilities:** Driven entirely by local model architectures via Ollama, keeping secure data completely on-premises and eliminating public API token fees.
* **Fault-Tolerant Context Interceptors:** Integrates background error-handling parameters to handle missing, unscannable, or corrupted schema documents without front-end crash drops.

---

## ⚙️ Tech Stack & Dependencies

### Frontend Infrastructure
* **Framework:** Next.js 15 (App Router, Client Side Optimization)
* **Language:** TypeScript 5
* **Styling Matrix:** TailwindCSS
* **Visual Graphics Core:** Recharts (Vectorized Telemetry Graphics)
* **Icon Library:** Lucide React

### Backend Core
* **Framework:** Python FastAPI
* **Vector Vectorization Layer:** FAISS (Facebook AI Similarity Search)
* **Intelligence Processing Engine:** Ollama (Local Embedding & Inference Matrix Model Pipelines)

---

## 🚀 Deployment & Quick Start Guide

### Prerequisites
Ensure your local terminal instance has `Node.js 18+`, `Python 3.10+`, and `Ollama` initialized.

### 1. Backend Ingest Setup
```bash
# Navigate to core root backend folder
cd backend

# Initialize isolated virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install pipeline dependencies
pip install -r requirements.txt

# Fire up the active engine node server (Port 8000)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

```

### 2. Frontend Interface Setup

```bash
# Navigate to frontend folder
cd ../frontend

# Install package architecture
npm install

# Initialize development asset server interface (Port 4028)
npm run dev -- -p 4028

```

Open browser routing layer to `http://localhost:4028/login` to inspect the live interface workspace.

---

## 📋 Security Classification Protocol

```text
System Node Access Vector: SECURE // LAYER-03 PLANT NETWORK VALIDATED
Active Operator Identification Target: Sanskar5544
Core Status Matrix Verification: 100% NOMINAL PIPELINES STABLE

```

```

```