import hashlib
import json
import os
import base64
import io
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import qrcode

app = Flask(__name__)
CORS(app)

# ── Config ───────────────────────────────────────────────
MANUFACTURER_SECRET = "verifyx-secret-2025"
LEDGER_FILE = "blockchain.json"

# ── Blockchain helpers ───────────────────────────────────

def compute_hash(index, timestamp, product_details, previous_hash):
    payload = json.dumps({
        "index": index,
        "timestamp": timestamp,
        "product_details": product_details,
        "previous_hash": previous_hash,
    }, sort_keys=True)
    return hashlib.sha256(payload.encode()).hexdigest()


def create_genesis_block():
    ts = datetime.utcnow().isoformat()
    details = {"name": "GENESIS", "brand": "VerifyX", "price": 0}
    h = compute_hash(0, ts, details, "0")
    return {
        "index": 0,
        "timestamp": ts,
        "product_details": details,
        "previous_hash": "0",
        "hash": h,
    }


def load_ledger():
    if os.path.exists(LEDGER_FILE):
        try:
            with open(LEDGER_FILE, "r") as f:
                data = json.load(f)
            if not isinstance(data, list) or len(data) == 0:
                raise ValueError("Invalid ledger")
            return data
        except Exception as e:
            print(f"[WARN] Corrupted ledger: {e}")

    ledger = [create_genesis_block()]
    save_ledger(ledger)
    return ledger


def save_ledger(ledger):
    with open(LEDGER_FILE, "w") as f:
        json.dump(ledger, f, indent=2)


def generate_qr_base64(data: str) -> str:
    qr = qrcode.make(data)
    buffer = io.BytesIO()
    qr.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")


# Init ledger
blockchain_ledger = load_ledger()

# ── Routes ───────────────────────────────────────────────

@app.route("/api/register", methods=["POST"])
def register_product():
    data = request.get_json()

    if data.get("secret") != MANUFACTURER_SECRET:
        return jsonify({"error": "Unauthorized"}), 403

    name = data.get("name")
    brand = data.get("brand")
    price = data.get("price")

    if not name or not brand or price is None:
        return jsonify({"error": "Missing fields"}), 400

    previous_block = blockchain_ledger[-1]
    index = len(blockchain_ledger)
    timestamp = datetime.utcnow().isoformat()

    product_details = {
        "name": name,
        "brand": brand,
        "price": price
    }

    new_hash = compute_hash(index, timestamp, product_details, previous_block["hash"])

    block = {
        "index": index,
        "timestamp": timestamp,
        "product_details": product_details,
        "previous_hash": previous_block["hash"],
        "hash": new_hash,
    }

    blockchain_ledger.append(block)
    save_ledger(blockchain_ledger)

    qr_base64 = generate_qr_base64(new_hash)

    return jsonify({
        "message": "Product registered",
        "product_hash": new_hash,
        "qr_code": qr_base64
    })


@app.route("/api/verify", methods=["POST"])
def verify_product():
    data = request.get_json()
    product_hash = data.get("hash")

    if not product_hash:
        return jsonify({"error": "Missing hash"}), 400

    for block in blockchain_ledger:
        if block["hash"] == product_hash or block["hash"] == product_hash.replace("0x", ""):
            return jsonify({
                "status": "authentic",
                "block": block
            })

    return jsonify({
        "status": "fake"
    })


@app.route("/api/blocks", methods=["GET"])
def get_blocks():
    return jsonify({
        "chain_length": len(blockchain_ledger),
        "blocks": list(reversed(blockchain_ledger))[:10]
    })


# ── RUN SERVER (IMPORTANT) ───────────────────────────────

if __name__ == "__main__":
    print(" Backend running at http://127.0.0.1:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)