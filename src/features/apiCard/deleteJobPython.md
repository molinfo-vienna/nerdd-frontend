response = requests.delete(
    f"__BASE_URL__/jobs/{job_id}"
).json()