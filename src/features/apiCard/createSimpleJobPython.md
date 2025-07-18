response = requests.get(
    # this is a single URL string
    "__BASE_URL__/__MODULE_ID__/jobs"
    "?inputs=__EXAMPLE_SMILES__"
    "&inputs=CCO"__JOB_PARAMETERS__
).json()