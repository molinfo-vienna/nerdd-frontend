response = requests.post(
    "__BASE_URL__/__MODULE_ID__/jobs",
    data={
        "inputs": ["__EXAMPLE_SMILES__"],__JOB_PARAMETERS__
    }
).json()