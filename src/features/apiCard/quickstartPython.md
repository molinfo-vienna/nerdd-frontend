import time, requests

# create job
response = requests.post(
    "__BASE_URL__/__MODULE_ID__/jobs",
    data={ 
        "inputs": ["__EXAMPLE_SMILES__"],__JOB_PARAMETERS__
    },
).json()
job_id = response["id"]

# wait for job to finish
while True:
    response = requests.get(
        f"__BASE_URL__/jobs/{job_id}"
    ).json()
    if response["status"] == "completed":
        break
    time.sleep(5)

# display results
response = requests.get(
    f"__BASE_URL__/jobs/{job_id}/results"
).json()
for result in response["data"]:
    print(result)