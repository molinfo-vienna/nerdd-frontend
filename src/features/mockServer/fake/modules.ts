import { d3PaletteGenerator } from "@/features/colorPalettes/generators/d3"
import { Module, PredictionTask } from "@/types"
import { faker } from "@faker-js/faker"
import { generateValue } from "./util"

const d3Palettes = d3PaletteGenerator()

const taskTypes: PredictionTask[] = [
    "molecular_property_prediction",
    "atom_property_prediction",
    "derivative_property_prediction",
]
const jobParameterDataTypes = ["string", "int", "float", "bool"]
const resultDataTypes = ["string", "int", "float", "bool", "mol"]

const fakePaletteNames = Array.from({ length: 5 }).map(() =>
    faker.music.genre(),
)

const logoUrls = Array.from({ length: 9 }).map(
    (_, i) => `/resources/fake/module-logos/${i + 1}.svg`,
)

function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function phrase() {
    return `${capitalize(faker.word.adjective())} ${faker.word.noun()}`
}

function longPhrase() {
    const words = faker.word.words({ count: { min: 1, max: 5 } })
    return `${capitalize(words)}`
}

export function choice(dataType: string) {
    return {
        value: generateValue(dataType),
        label: phrase(),
    }
}

export function generateJobParameter() {
    const type = faker.helpers.arrayElement(jobParameterDataTypes)
    const hasHelpText = faker.datatype.boolean(0.8)
    const required = type !== "bool" && faker.datatype.boolean()

    // choices
    const isChoices = type !== "bool" && faker.datatype.boolean()
    let choices = undefined
    if (isChoices) {
        choices = Array.from(
            { length: faker.number.int({ min: 2, max: 8 }) },
            () => choice(type),
        )

        // make sure that all choices have unique values
        const uniqueValues = new Set(choices.map((c) => c.value))
        choices = Array.from(uniqueValues).map((value) => {
            return choices.find((c) => c.value === value)
        })
    }

    // default value
    const hasDefaultValue = faker.datatype.boolean()
    let defaultValue = undefined
    if (hasDefaultValue) {
        if (isChoices) {
            defaultValue = faker.helpers.arrayElement(choices).value
        } else {
            defaultValue = generateValue(type)
        }
    }

    return {
        name: faker.lorem.slug(3),
        type,
        visible_name: phrase(),
        help_text: hasHelpText
            ? faker.lorem.sentence({ min: 8, max: 30 })
            : undefined,
        default: defaultValue,
        required,
        choices,
    }
}

function generateColorPalette(type, choices) {
    const hasChoices = choices !== undefined

    // color palette
    const canHaveColorPalette =
        ["float", "bool", "int"].includes(type) ||
        (type === "string" && hasChoices)
    const hasColorPalette = canHaveColorPalette && faker.datatype.boolean(0.9)
    let colorPalette = undefined
    if (hasColorPalette) {
        // type
        let colorPaletteType = undefined
        if (["bool", "string"].includes(type) || hasChoices) {
            colorPaletteType = "categorical"
        } else {
            colorPaletteType = faker.helpers.arrayElement([
                "diverging",
                "sequential",
            ])
        }

        // domain
        let domain = undefined
        if (hasChoices) {
            domain = choices.map((c) => c.value)
        } else if (type === "int") {
            domain = [-100, 100]
        } else if (type === "float") {
            domain = [-100, 100]
        } else if (type === "bool") {
            const definedExplicitly = faker.datatype.boolean()
            domain = definedExplicitly ? [false, true] : undefined
        }

        // range
        let range = undefined
        const rangeSpecified = faker.datatype.boolean()
        if (rangeSpecified) {
            const rangeAsArray = type === "bool" || faker.datatype.boolean()
            if (rangeAsArray) {
                const values = type === "bool" ? [false, true] : domain
                range = values.map(() => faker.internet.color())
            } else {
                const paletteNames = [
                    // valid palettes
                    ...Object.keys(d3Palettes[colorPaletteType]),
                    // the nerdd palette
                    "nerdd",
                    // add invalid palettes for testing robustness
                    ...fakePaletteNames,
                ]

                range = faker.helpers.arrayElement(paletteNames)
            }
        }

        // color for unknown values
        const hasUnknown = faker.datatype.boolean()
        const unknown = hasUnknown ? faker.internet.color() : undefined

        colorPalette = {
            type: colorPaletteType,
            domain,
            range,
            unknown,
        }
    }

    return colorPalette
}

export function generateResultProperty(group, level) {
    const visibleName = longPhrase()
    const name = visibleName.replace(/\s/g, "_").toLowerCase()
    const type = faker.helpers.arrayElement(resultDataTypes)
    const visible = faker.datatype.boolean(0.6)
    const sortable = faker.datatype.boolean()
    const hasChoices =
        ["float", "int", "string"].includes(type) && faker.datatype.boolean()
    const choices = hasChoices
        ? Array.from(
              {
                  length: faker.number.int({ min: 2, max: 5 }),
              },
              () => choice(type),
          )
        : undefined

    return {
        name,
        visible_name: visibleName,
        type,
        visible,
        sortable,
        group,
        level,
        choices,
        color_palette: generateColorPalette(type, choices),
    }
}

export function generatePropertyGroups(numProperties) {
    let current = 0
    let groups = []
    while (current < numProperties) {
        const remaining = numProperties - current
        const numPropertiesInGroup = Math.min(
            remaining,
            faker.number.int({ min: 1, max: 4 }),
        )
        const groupName = numPropertiesInGroup > 1 ? phrase() : undefined
        current += numPropertiesInGroup

        groups = [
            ...groups,
            ...Array.from({ length: numPropertiesInGroup }, () => groupName),
        ]
    }
    return groups
}

export function generatePartner() {
    return {
        name: faker.company.name(),
        logo: "https://via.placeholder.com/150?text=Partner",
    }
}

export function generateContact() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
    }
}

function generateAboutSection(i, level) {
    faker.seed(i * 100 + level)

    // create a heading of level i if i > 0
    let section = ""
    if (level > 0) {
        const heading = longPhrase()

        // generate some text
        const numParagraphs = faker.number.int({ min: 1, max: 5 })
        const paragraphs = faker.lorem.paragraphs(numParagraphs, "\n\n")

        // generate string with as many hash symbols as the level
        // e.g. level = 3 --> "### Heading"
        const hashes = Array.from({ length: level }, () => "#").join("")

        section = `${hashes} ${heading}\n\n${paragraphs}`
    }

    // with probability 1/level, generate subheadings
    const hasSubSections =
        level < 6 && faker.datatype.boolean(1 / (level + 1) ** 2)
    let subSections = ""
    if (hasSubSections) {
        const numSubparagraphs = faker.number.int({ min: 2, max: 5 })
        const subSectionsList = Array.from(
            { length: numSubparagraphs },
            (_, i) => generateAboutSection(i, level + 1),
        )
        subSections = subSectionsList.join("\n\n")
    }

    return `${section}\n\n${subSections}`
}

function generateAbout(i) {
    return generateAboutSection(i, 0)
}

function generateJournal() {
    const fields = [
        "Medicine",
        "Engineering",
        "Biology",
        "Economics",
        "Physics",
        "Computer Science",
        "Psychology",
    ]
    const types = ["Journal", "Review", "Bulletin", "Transactions", "Quarterly"]
    const scopes = [
        "International",
        "European",
        "Advanced",
        "Applied",
        "Theoretical",
        "Global",
    ]
    const adjectives = [
        "Modern",
        "Current",
        "Innovative",
        "Contemporary",
        "Emerging",
    ]

    const field = faker.helpers.arrayElement(fields)
    const type = faker.helpers.arrayElement(types)
    const scope = faker.helpers.arrayElement(scopes)
    const adjective = faker.helpers.arrayElement(adjectives)

    // Randomly choose a format
    const formats = [
        `${scope} ${type} of ${field}`,
        `${adjective} ${type} of ${field}`,
        `${type} of ${scope} ${field}`,
        `${adjective} ${scope} ${type}`,
    ]

    return faker.helpers.arrayElement(formats)
}

function generateDOI() {
    const registrant = faker.number.int({ min: 1000, max: 9999 })
    const suffixLength = faker.number.int({ min: 9, max: 16 })
    const suffix = faker.string.alphanumeric(suffixLength)

    return `10.${registrant}/${suffix}`
}

function generatePublication() {
    const numAuthors = faker.number.int({ min: 2, max: 7 })

    return {
        title: faker.lorem.sentence({ min: 12, max: 22 }),
        authors: Array.from({ length: numAuthors }, () => ({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        })),
        journal: generateJournal(),
        year: faker.date.past({ years: 10 }).getFullYear(),
        doi: generateDOI(),
    }
}

export function generateModuleConfig(i: number): Module {
    faker.seed(i)

    const task = faker.helpers.arrayElement(taskTypes)
    const name = faker.lorem.slug(4)

    const numPartners = faker.number.int({ min: 1, max: 5 })
    const numContacts = faker.number.int({ min: 1, max: 3 })
    const numPublications = faker.number.int({ min: 1, max: 3 })
    const numJobParameters = faker.number.int({ min: 0, max: 7 })
    const numResultProperties = faker.number.int({ min: 1, max: 20 })
    const visibleName = capitalize(faker.word.words(1))

    const groups = generatePropertyGroups(numResultProperties)

    // typical result properties
    const molIdProperty = {
        name: "mol_id",
        type: "int",
        visible_name: "Mol ID",
        visible: false,
        sortable: true,
    }

    const nameProperty = {
        name: "name",
        type: "string",
        visible_name: "Name",
        visible: true,
        sortable: true,
    }

    // add input smiles column
    const inputSmilesProperty = {
        name: "input_smiles",
        type: "string",
        visible_name: "Input SMILES",
        visible: false,
        sortable: true,
    }

    // add filtered smiles column
    const filteredSmilesProperty = {
        name: "preprocessed_smiles",
        type: "string",
        visible_name: "Processed SMILES",
        visible: false,
        sortable: true,
    }

    // add preprocessed mol column
    const preprocessedMolProperty = {
        name: "preprocessed_mol",
        type: "mol",
        visible_name: "2D structure",
        visible: true,
        sortable: false,
    }

    // add image column
    const problemsProperty = {
        name: "problems",
        type: "problem_list",
        visible_name: "Problems",
        visible: false,
        sortable: false,
    }

    // we assign a random portion of the *last* columns to be atom- or
    // derivative-related columns
    let levels = []
    if (task === "molecular_property_prediction") {
        levels = Array.from({ length: numResultProperties }, () => undefined)
    } else {
        // decide how many columns should be atom- or derivative-related
        const ratio = faker.number.float({ min: 0.5, max: 1 })
        const numLevelColumns = Math.floor(numResultProperties * ratio)
        const start = numResultProperties - numLevelColumns

        // make sure that no group is split
        const cutGroup = start < groups.length ? groups[start] : undefined
        const cutIndex =
            cutGroup !== undefined ? groups.indexOf(cutGroup) : start

        const level =
            task === "atom_property_prediction" ? "atom" : "derivative"

        levels = Array.from({ length: numResultProperties }, (_, i) =>
            i >= cutIndex ? level : undefined,
        )
    }

    const resultProperties = [
        molIdProperty,
        nameProperty,
        inputSmilesProperty,
        filteredSmilesProperty,
        preprocessedMolProperty,
        ...groups.map((g, i) => generateResultProperty(g, levels[i])),
        problemsProperty,
    ]

    return {
        id: name,
        rank: faker.number.int({ min: 0, max: 100 }),
        name,
        task,
        visible_name: visibleName,
        description: faker.lorem.paragraphs(2, "\n\n"),
        example_smiles:
            "CCOC(=O)N1CCN(CC1)C2=C(C(=O)C2=O)N3CCN(CC3)C4=CC=C(C=C4)OC example smiles",
        title: faker.lorem.sentence({ min: 5, max: 8 }),
        logo_title: faker.music.songName(),
        logo_caption: faker.lorem.sentence({ min: 5, max: 8 }),
        logo: logoUrls[faker.number.int({ min: 0, max: logoUrls.length - 1 })],
        partners: Array.from({ length: numPartners }, () => generatePartner()),
        contact: Array.from({ length: numContacts }, () => generateContact()),
        job_parameters: Array.from({ length: numJobParameters }, () =>
            generateJobParameter(),
        ),
        publications: Array.from({ length: numPublications }, () =>
            generatePublication(),
        ),
        result_properties: resultProperties,
        about: generateAbout(i),
        output_formats: ["csv", "sdf"],
        batch_size: faker.number.int({ min: 10, max: 1000 }),
        seconds_per_molecule: faker.number.float({
            min: 0.01,
            max: 30,
            precision: 0.01,
        }),
        startupTimeSeconds: faker.number.float({
            min: 0.01,
            max: 30,
            precision: 0.01,
        }),
        max_num_molecules: faker.number.int({ min: 1000, max: 1000000 }),
    }
}

export function generateModuleConfigArray(num: number) {
    return Array.from({ length: num }, (_, i) => generateModuleConfig(i))
}

export function generateModuleConfigDict(num: number) {
    const moduleConfigs = generateModuleConfigArray(num)

    return Object.fromEntries(moduleConfigs.map((c) => [c.name, c]))
}

export function generateModuleQueueStats(moduleId: string) {
    return {
        module_id: moduleId,
        waiting_time_minutes: faker.number.int({ min: 0, max: 10000 }),
        num_active_jobs: faker.number.int({ min: 0, max: 100 }),
        estimate: faker.helpers.arrayElement(["upper_bound", "lower_bound"]),
    }
}
