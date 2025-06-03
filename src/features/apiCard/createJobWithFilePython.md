with open("/path/to/my/input_file.smiles", "r") as f:
    response = requests.post(
        "__BASE_URL__/__MODULE_ID__/jobs", 
        files={"files": f}
    ).json()