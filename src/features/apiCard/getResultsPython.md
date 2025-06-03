response = requests.get(
    f"__BASE_URL__/jobs/{job_id}/results?page=1"
).json()