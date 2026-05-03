from __future__ import annotations

import pytest

from api import app, calculate_hba1c


@pytest.fixture()
def client():
    app.config["TESTING"] = True
    with app.test_client() as test_client:
        yield test_client


def test_predict_returns_http_200(client):
    response = client.post("/predict", json={"glucoseLevel": 100})

    assert response.status_code == 200


def test_predict_response_contains_required_fields(client):
    response = client.post("/predict", json={"glucoseLevel": 100})
    payload = response.get_json()

    assert "hba1c" in payload
    assert "risk_category" in payload
    assert payload["status"] == "success"


@pytest.mark.parametrize(
    ("glucose_level", "expected_hba1c"),
    [
        (100, 5.11),
        (154, 6.99),
    ],
)
def test_glucose_to_hba1c_formula(glucose_level, expected_hba1c):
    assert calculate_hba1c(glucose_level) == expected_hba1c


def test_missing_input_is_handled_gracefully(client):
    response = client.post("/predict", json={})
    payload = response.get_json()

    assert response.status_code == 400
    assert payload["status"] == "error"
    assert "glucoseLevel is required" in payload["error"]


def test_invalid_input_is_handled_gracefully(client):
    response = client.post("/predict", json={"glucoseLevel": "abc"})
    payload = response.get_json()

    assert response.status_code == 400
    assert payload["status"] == "error"
    assert "glucoseLevel must be numeric" in payload["error"]
